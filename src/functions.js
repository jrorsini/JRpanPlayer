import {
	isSelectable,
	isKatakana,
	isProperNoun,
	isSymbol,
	isVerb,
	isVerbForm,
	hasjapaneseCharacter
} from './kuromoji-form-checker.js'

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
}
/**
 * @param {String} classString as the list of classes
 * @param {String} content as the word to put in
 * @return {String} Marked up element.
 */
const span = (classString, content) =>
	`<span class="${classString}">${content}</span>`

/**
 * @param {Object} word's object
 * @return {String} Marked up word
 */
const generateMarkup = (word, index, array) => {
	if (isKatakana(word)) {
		return span('jrpan-tag katakana-gloss', word.surface_form)
	}
	if (isProperNoun(word)) {
		return span('jrpan-tag jrpan-tag__proper-noun', word.surface_form)
	}
	if (isSymbol(word)) {
		return span('jrpan-tag jrpan-tag__symbol', word.surface_form)
	}
	if (hasjapaneseCharacter(word)) {
		return span(
			`jrpan-tag ${part_of_speech[word.pos]}-gloss`,
			isVerb(word) && isVerbForm(array[index + 1])
				? word.surface_form + array[index + 1].surface_form
				: isVerbForm(word) && isVerb(array[index - 1])
					? ''
					: word.surface_form
		)
	}
	return span('', word.surface_form)
}

/**
 * @param {Array} json subtitles list
 * @param {Number} currTime video's current time
 * @return {String} subtitles in time lapse
 */
const subtitle_in_timeLapse = (json, currTime) => {
	for (let i = 0; i < json.length; i++) {
		const e = json[i]
		if (e.startTime < currTime && e.endTime > currTime) return e.text
	}
	return false
}

/**
 * @param {Object} subtitleTag to dig into
 * @return {String} the subtitles into p tag
 */
const currentSubtitle = subtitleTag => subtitleTag.innerText

/**
 * @param {Object} element vidoe element.
 * @return {Number} current time.
 */
const videoCurrTime = element => Math.round(element.currentTime * 1000)

/**
 * @param {Object} root element to set text in.
 * @param {String} subtitle to put into tag element.
 * @param {Function} click event handler.
 * @function set inner html to subtitle.
 */
const showSubtitles = (root, subtitle, handler) => {
	if (subtitle) {
		root.innerHTML = subtitle
			.map(
				(e, i, arr) =>
					e.surface_form === '\n' ? `<br/>` : generateMarkup(e, i, arr)
			)
			.join('')
		Object.values(document.getElementsByClassName('jrpan-tag')).map(tagEl => {
			tagEl.addEventListener('click', handler)
		})
	}
}

module.exports = {
	subtitle_in_timeLapse,
	videoCurrTime,
	showSubtitles,
	currentSubtitle
}
