import kuromoji from 'kuromoji';

/**
 * @promise loads subtitles.
 * @resolve {Array} subtitles JSON.
 */
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

/**
 * @promise loads Japanese dictionary.
 * @resolve {String} message confirming the dictionary has loaded.
 */
const kuromojiLoaded = (path = 'dict') =>
	new Promise((resolve, reject) => {
		kuromoji.builder({ dicPath: path }).build((err, _tokenizer) => {
			resolve(_tokenizer);
		});
	});

module.exports = {
	get_json_object,
	kuromojiLoaded
};
