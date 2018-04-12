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
import f from './functions.js';

let _json = null;
let k = null;
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

p.kuromojiLoaded().then(_tokenizer => {
	k = _tokenizer;
	console.log(k);

	videoPlayerElement.onplay = () => {
		setInterval(() => {
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
