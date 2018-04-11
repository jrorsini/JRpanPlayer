// TODO
/**
 * x Show subtitles.
 */
// DONE
/**
 * o/ get JSON array.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import p from './promises.js';

let _json = null;
let tokenizer = null;
const part_of_speech = {
	名詞: 'noun',
	動詞: 'verb',
	記号: 'symbol',
	副詞: 'adverb',
	助詞: 'particle',
	接尾: 'suffix',
	助動詞: 'auxiliaryVerb',
	接頭詞: 'prefix',
	接続詞: 'conjuction',
	形容詞: 'i-adjective',
	連体詞: 'abdominalAdj',
	感動詞: 'interjection',
	フィラー: 'filler'
};

const videoPlayerElement = document.getElementById('videoPlayer');
const subtitleElement = document.getElementById('subtitle');

/**
 * @param {Array} json subtitles list
 * @param {Number} currTime video's current time
 * @return {String} subtitles in time lapse
 */
const subtitle_in_timeLapse = (json, currTime) => {
	for (let i = 0; i < json.length; i++) {
		const e = json[i];
		if (e.startTime < currTime && e.endTime > currTime) return e.text;
	}
};

/**
 * @param {Object} root element to set text in.
 * @param {String} subtitle to put into tag element.
 * @function set inner html to subtitle.
 */
const showSubtitles = (root, subtitle) => {
	console.log(subtitle);
	root.innerHTML = subtitle;
};

/**
 * @param {String} selected text
 * @return {String} marked up selected text from kuromoji's tokenizer.
 */
const kuromojiMarkup = selection => {
	let path = tokenizer.tokenizeForSentence(selection);
	console.log(path);
	path.map(e => {
		if (part_of_speech[e.pos] === undefined) {
			console.log(e.pos);
		}
	});
	return path.map(generateMarkup).join('');
};

/**
 * @param {Object} element vidoe element.
 * @return {Number} current time.
 */
const videoCurrTime = (element = videoPlayerElement) =>
	Math.round(element.currentTime * 1000);

videoPlayerElement.onplay = () => {
	showSubtitles(subtitleElement, subtitle_in_timeLapse(_json, videoCurrTime()));
};

p.get_json_object()
	.then(json => {
		_json = json;
	})
	.catch(err => console.log(err));
