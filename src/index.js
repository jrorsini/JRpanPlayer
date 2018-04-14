// TODO
/**
 * x Make a more readable font.
 * x Save video time when leaving off.
 * x remove underline effect on spaces.
 */
// DONE
/**
 * o/ get JSON array.
 * o/ Show subtitles.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import p from './promises.js';
import f from './functions.js';

let _json = null;
let k = null;

const videoPlayerElement = document.getElementById('videoPlayer');
const subtitleElement = document.getElementById('subtitle');

p.kuromojiLoaded().then(_tokenizer => {
	k = _tokenizer;
	videoPlayerElement.onplay = () => {
		setInterval(() => {
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
