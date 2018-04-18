// TODO
/**
 * x remove underline effect on spaces.
 * x -te / -ta / -tai / -tara form
 * x People's name to Replace
 * x left and right arrow
 */
// DONE
/**
 * o/ get JSON array.
 * o/ pause and play video with space
 * o/ Show subtitles.
 * o/ Save video time when leaving off.
 * o/ Make a more readable font.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { fetchJsonObject, kuromojiLoaded, getTranslation } from './promises.js';
import { videoKeypressHandler, wordsClickHandler } from './pure-functions.js';
import {
	subtitle_in_timeLapse,
	videoCurrTime,
	showSubtitles,
	currentSubtitle
} from './functions.js';

let k = null;
let _json = null;
let videoPlaying = false;

const videoPlayerElement = document.getElementById('videoPlayer');
const subtitleElement = document.getElementById('subtitle');

kuromojiLoaded().then(_tokenizer => {
	k = _tokenizer;
	videoPlayerElement.play();
	videoPlaying = true;

	document.addEventListener('keypress', e => {
		videoPlaying = videoKeypressHandler(e, videoPlayerElement, videoPlaying);
	});

	videoPlayerElement.onplay = () => {
		if (localStorage.currentTime) {
			videoPlayerElement.currentTime = localStorage.currentTime;
		}
		setInterval(() => {
			localStorage.currentTime = videoPlayerElement.currentTime;
			if (
				currentSubtitle(subtitleElement) !==
				subtitle_in_timeLapse(_json, videoCurrTime(videoPlayerElement))
			)
				showSubtitles(
					subtitleElement,
					k.tokenizeForSentence(
						subtitle_in_timeLapse(_json, videoCurrTime(videoPlayerElement))
					),
					e => wordsClickHandler(e, videoPlayerElement, k, getTranslation)
				);
		}, 100);
	};
});

fetchJsonObject()
	.then(json => {
		_json = json;
	})
	.catch(err => console.log(err));
