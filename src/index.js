// TODO
/**
 * x Show subtitles.
 *
 *
 */
// TODO

/**
 * o/ get JSON array.
 *
 *
 */

import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import VideoPlayer from './components';

ReactDOM.render(<VideoPlayer />, document.getElementById('app'));

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
get_json_object().then(res => {
	console.log(res);
});
