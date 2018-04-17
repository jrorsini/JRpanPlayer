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
	} else if (e.code === 'Space' && e.keyCode === 32 && videoPlaying) {
		videoPlayerElement.pause();
		videoPlaying = false;
	} else {
		videoPlayerElement.play();
		videoPlaying = true;
	}
	e.preventDefault();
	return false;
};

p.kuromojiLoaded().then(_tokenizer => {
	k = _tokenizer;
	videoPlayerElement.play();
	videoPlaying = true;

	document.addEventListener('keypress', videoPlayPauseHandle);

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
