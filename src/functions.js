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
	root.innerHTML =
		subtitle
			.map(
				e =>
					e.surface_form === '\n' ? `<br/>` : `<span>${e.surface_form}</span>`
			)
			.join('') || '';
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
const videoCurrTime = element => Math.round(element.currentTime * 1000);

module.exports = {
	subtitle_in_timeLapse,
	showSubtitles,
	kuromojiMarkup,
	videoCurrTime
};
