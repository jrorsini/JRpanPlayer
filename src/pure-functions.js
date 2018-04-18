/**
 * @param {Object} e KeyPress Event.
 * @param {Object} el Video Element.
 * @param {Object} s Video's STATE.
 * @function set inner html to subtitle.
 * @return {Boolean} if video is play.
 */
const videoKeypressHandler = (e, video, playing) => {
	if (e.keyCode === 91 || e.key === 'Meta') {
		video.pause()
	} else if (e.code === 'Space' && e.keyCode === 32 && playing) {
		video.pause()
		return false
	} else {
		video.play()
		return true
	}
	e.preventDefault()
	return false
}

/**
 * @param {Object} Click event object.
 * @param {Object} Video element.
 * @param {Object} Kuromoji.
 * @function logs hiragana writting and meaning.
 */
const wordsClickHandler = (e, video, k, translationHandler) => {
	video.pause()
	console.log(k.tokenizeForSentence(e.target.innerHTML)[0].basic_form)
	console.log(k.tokenizeForSentence(e.target.innerHTML)[0].reading)
	translationHandler(
		k.tokenizeForSentence(e.target.innerHTML)[0].basic_form
	).then(res => console.log(res))
}

module.exports = {
	videoKeypressHandler,
	wordsClickHandler
}
