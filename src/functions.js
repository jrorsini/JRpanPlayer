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
	return false;
};

/**
 * @param {Object} subtitleTag to dig into
 * @return {String} the subtitles into p tag
 */
const currentSubtitle = subtitleTag => subtitleTag.innerText;

/**
 * @param {Object} root element to set text in.
 * @param {String} subtitle to put into tag element.
 * @function set inner html to subtitle.
 */
const showSubtitles = (root, subtitle) => {
	console.log(subtitle);
	if (subtitle)
		root.innerHTML = subtitle
			.map(
				e =>
					e.surface_form === '\n'
						? `<br/>`
						: `<span class="">${e.surface_form}</span>`
			)
			.join('');
};

/**
 * @param {Object} element vidoe element.
 * @return {Number} current time.
 */
const videoCurrTime = element => Math.round(element.currentTime * 1000);

module.exports = {
	subtitle_in_timeLapse,
	showSubtitles,
	videoCurrTime,
	currentSubtitle
};
