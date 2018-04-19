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

/*
|--------------------------------------------------------------------------
| Functions that check input type.
|--------------------------------------------------------------------------
|
*/

/**
 * @param {String} Selection.
 * @return {Boolean} contains any Japanese character.
 */
const isSelectable = selection =>
	selection.trim() !== '' &&
	selection.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) !== null

/**
 * @param {String} word
 * @return {Boolean} if the word is only made out of Katakana.
 */
const isKatakana = word =>
	word.match(/[\u30A0-\u30FF]/g)
		? word.match(/[\u30A0-\u30FF]/g).length === word.length
		: false

/**
 * @param {Object} word's object
 * @return {String} returns class Name to add for proper nouns.
 */
const isProperNoun = word => (word.pos_detail_1 === '固有名詞' ? true : false)

/**
 * @param {Object} word's object
 * @return {String} returns class Name to add for symbols.
 */
const isSymbol = word => (word.pos_detail_1 === '記号' ? true : false)

/**
 * @param {String} word
 * @return {Boolean} if the word is only made out of Katakana.
 */
const hasjapaneseCharacter = word =>
	word.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) ? true : false

/**
 * @param {Object} word's object
 * @return {String} Marked up word
 */
const generateMarkup = (word, index, array) => {
	switch (true) {
		case hasjapaneseCharacter(word.surface_form):
			return `<div class="jrpan-gloss-tag jrpan-gloss-tag--enable ${
				part_of_speech[word.pos]
			}-gloss>${word.surface_form}</div>`
			break
		case isKatakana(word.surface_form):
			return `<div class="jrpan-gloss-tag jrpan-gloss-tag--enable katakana-gloss">${
				word.surface_form
			}</div>`
			break
		case isProperNoun(word):
			return `<div class="jrpan-gloss-tag jrpan-gloss-tag--enable jrpan-gloss-tag__proper-noun">${
				word.surface_form
			}</div>`
			break
		case isSymbol(word):
			return `<div class="jrpan-gloss-tag jrpan-gloss-tag--enable jrpan-gloss-tag__symbol">${
				word.surface_form
			}</div>`
			break
		default:
			return `<div class="jrpan-gloss-tag">${word.surface_form}</div>`
			break
	}
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
		Object.values(document.getElementsByClassName('jrpan-gloss-tag')).map(
			tagEl => {
				tagEl.addEventListener('click', handler)
			}
		)
	}
}

module.exports = {
	subtitle_in_timeLapse,
	videoCurrTime,
	showSubtitles,
	currentSubtitle
}
