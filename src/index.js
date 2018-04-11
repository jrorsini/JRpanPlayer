// TODO
/**
 * x Show subtitles.
 */
// TODO

/**
 * o/ get JSON array.
 */

import React from 'react';
import ReactDOM from 'react-dom';

let _json = null;

const get_json_object = () =>
	new Promise((resolve, reject) => {
		const xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				resolve(JSON.parse(this.responseText));
			}
		};
		xmlhttp.open('GET', 'subtls/sample.json', true);
		xmlhttp.send();
	});

get_json_object()
	.then(json => {
		_json = json;
	})
	.catch(err => console.log(err));

const videoPlayerElement = document.getElementById('videoPlayer');
const subtitlesElement = document.getElementById('subtitles');

const subInRange = (json, currTime) => {
	for (let index = 0; index < json.length; index++) {
		const e = json[index];
		if (e.startTime < currTime && e.endTime > currTime) {
			return e;
		}
	}
};

/**
 * @param {Object} root element to set text in.
 * @param {String} subtitle to put into tag element.
 * @function set inner html to subtitle.
 */
const showSubtitles = (root, subtitle) => {
	root.innerHTML = subtitle;
};

/**
 * @param {Object} element vidoe element.
 * @return {Number} current time.
 */
const videoCurrTime = (element = videoPlayerElement) =>
	Math.round(element.currentTime * 1000);

videoPlayerElement.onplay = () => {
	console.log(subInRange(_json, videoCurrTime()));
};
