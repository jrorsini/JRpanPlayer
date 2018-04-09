const formidable = require('formidable');
const express = require('express');
const parser = require('subtitles-parser');
const ffmpeg = require('fluent-ffmpeg');
const cors = require('cors');
const path = require('path');
const app = express();
const fs = require('fs');

app.use(cors());

/**
 * @param {string} path to folder
 * @promise checks if file is ther
 * @resolve {object} lists all files in folde.
 */
const hasVideoSubtl = folder =>
	new Promise((resolve, reject) => {
		fs.readdir(`dist/${folder}`, (err, files) => {
			if (err) reject(err);
			files.length ? resolve(files) : resolve();
		});
	});

const removeVideoSubtl = (files, folder) => {
	files.map(file => {
		fs.unlinkSync(`dist/${folder}/${file}`);
	});
};

const parseSubtitles = filePath =>
	new Promise((resolve, reject) => {
		fs.readFile(filePath, 'utf-8', (err, res) => {
			resolve(parser.fromSrt(String(res), true));
		});
	});

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/videoUpload', (req, res) => {
	const form = new formidable.IncomingForm();

	form.maxFileSize = 10000 * 1024 * 1024;

	form.parse(req, (err, fields, files) => {
		if (err) throw err;

		const oldpath = files.video2upload.path;
		const newpath = `dist/videos/${files.video2upload.name}`;

		hasVideoSubtl('videos').then(f => {
			if (f) removeVideoSubtl(f, 'videos');
			fs.rename(oldpath, newpath, err => {
				if (err) throw err;
				res.send(newpath.replace('dist/', ''));
			});
		});
	});
});

app.post('/subtlUpload', (req, res) => {
	const form = new formidable.IncomingForm();

	form.parse(req, (err, fields, files) => {
		if (err) throw err;

		const oldpath = files.subtl2upload.path;
		const newpath = `dist/subtls/${files.subtl2upload.name}`;

		hasVideoSubtl('subtls').then(f => {
			if (f) removeVideoSubtl(f, 'subtls');
			fs.rename(oldpath, newpath, err => {
				if (err) throw err;
				parseSubtitles(newpath).then(subtitles => {
					res.send(subtitles);
				});
			});
		});
	});
});

app.listen(3000, () => console.log('Up & Running...'));
