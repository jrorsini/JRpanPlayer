// TODO
/**
 * x pause and play video with space
 * x remove underline effect on spaces.
 */
// DONE
/**
 * o/ get JSON array.
 * o/ Show subtitles.
 * o/ Save video time when leaving off.
 * o/ Make a more readable font.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import p from './promises.js';
import f from './functions.js';

let _json = null;
let videoPlaying = false;
let k = null;

const videoPlayerElement = document.getElementById('videoPlayer');
const subtitleElement = document.getElementById('subtitle');

const videoPlayPauseHandle = e => {
	console.log(e);
	if (e.keyCode === 91 || e.key === 'Meta') {
		videoPlayerElement.pause();
	}
	if (e.code === 'Space' && e.keyCode === 32 && videoPlaying) {
		videoPlayerElement.pause();
		videoPlaying = false;
	} else {
		videoPlayerElement.play();
		videoPlaying = true;
	}
};

/**
 * @param {string} word
 * @promise Get translation information from word.
 * @resolve {object} data from word passed in param.
 * @reject {object} in case of failure reaching out to the API
 */
const getTranslation = word =>
	new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `https://jrpanapi.herokuapp.com/meaning/${word}/`);
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				console.log(JSON.parse(xhr.responseText));
				resolve(JSON.parse(xhr.responseText));
			} else if (xhr.status !== 200) {
				reject(JSON.parse(xhr.responseText));
			}
		};
	});

p.kuromojiLoaded().then(_tokenizer => {
	k = _tokenizer;
	videoPlayerElement.play();
	videoPlaying = true;

	document.addEventListener('keydown', videoPlayPauseHandle);

	videoPlayerElement.onplay = () => {
		if (localStorage.currentTime) {
			videoPlayerElement.currentTime = localStorage.currentTime;
		}
		setInterval(() => {
			localStorage.currentTime = videoPlayerElement.currentTime;
			if (
				f.currentSubtitle(subtitleElement) !==
				f.subtitle_in_timeLapse(_json, f.videoCurrTime(videoPlayerElement))
			)
				f.showSubtitles(
					subtitleElement,
					k.tokenizeForSentence(
						f.subtitle_in_timeLapse(_json, f.videoCurrTime(videoPlayerElement))
					)
				);
		}, 100);
	};
});

p
	.get_json_object()
	.then(json => {
		_json = json;
	})
	.catch(err => console.log(err));
