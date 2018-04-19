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
	word.surface_form.match(/[\u30A0-\u30FF]/g)
		? word.surface_form.match(/[\u30A0-\u30FF]/g).length ===
		  word.surface_form.length
		: false

/**
 * @param {Object} word's object
 * @return {Boolean} returns class Name to add for proper nouns.
 */
const isProperNoun = word => (word.pos_detail_1 === '固有名詞' ? true : false)

/**
 * @param {Object} word's object
 * @return {Boolean} returns class Name to add for symbols.
 */
const isSymbol = word => (word.pos_detail_1 === '記号' ? true : false)

/**
 * @param {Object} word's object
 * @return {Boolean} returns class Name to add for symbols.
 */
const isVerb = word => (word.pos === '動詞' ? true : false)

/**
 * @param {Object} word's object
 * @return {Boolean} returns class Name to add for symbols.
 */
const isVerbForm = word =>
	word.surface_form === 'て' ||
	word.surface_form === 'た' ||
	word.surface_form === 'う' ||
	word.surface_form === 'たい' ||
	word.surface_form === 'たら'
		? true
		: false

/**
 * @param {String} word
 * @return {Boolean} if the word is only made out of Katakana.
 */
const hasjapaneseCharacter = word =>
	word.surface_form.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g)
		? true
		: false

module.exports = {
	isSelectable,
	isKatakana,
	isProperNoun,
	isSymbol,
	isVerb,
	isVerbForm,
	hasjapaneseCharacter
}
