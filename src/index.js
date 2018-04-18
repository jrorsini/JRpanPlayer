// TODO
/**
 * x remove underline effect on spaces.
 * x -te form and -ta form
 */
// DONE
/**
 * o/ get JSON array.
 * o/ pause and play video with space
 * o/ Show subtitles.
 * o/ Save video time when leaving off.
 * o/ Make a more readable font.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { fetchJsonObject, kuromojiLoaded, getTranslation } from './promises.js'
import {
	subtitle_in_timeLapse,
	videoCurrTime,
	showSubtitles,
	currentSubtitle
} from './functions.js'

let k = null
let _json = null
let videoPlaying = false

const videoPlayerElement = document.getElementById('videoPlayer')
const subtitleElement = document.getElementById('subtitle')

/**
 * @param {Object} Click event object.
 * @function logs hiragana writting and meaning.
 */
const HandlerWhenClickingWord = e => {
	document.getElementById('videoPlayer').pause()
	console.log(k.tokenizeForSentence(e.target.innerHTML)[0].basic_form)
	console.log(k.tokenizeForSentence(e.target.innerHTML)[0].reading)
	getTranslation(k.tokenizeForSentence(e.target.innerHTML)[0].basic_form).then(
		res => console.log(res)
	)
}

/**
 * @param {Object} e KeyPress Event.
 * @param {Object} el Video Element.
 * @param {Object} s Video's STATE.
 * @function set inner html to subtitle.
 * @return {Boolean} prevent key event.
 */
const videoPlayPauseHandle = (e, el, playing) => {
	if (e.keyCode === 91 || e.key === 'Meta') {
		el.pause()
	} else if (e.code === 'Space' && e.keyCode === 32 && playing) {
		el.pause()
		return false
	} else {
		el.play()
		return true
	}
	e.preventDefault()
	return false
}

kuromojiLoaded().then(_tokenizer => {
	k = _tokenizer
	videoPlayerElement.play()
	videoPlaying = true

	document.addEventListener('keypress', e => {
		videoPlaying = videoPlayPauseHandle(e, videoPlayerElement, videoPlaying)
	})

	videoPlayerElement.onplay = () => {
		if (localStorage.currentTime) {
			videoPlayerElement.currentTime = localStorage.currentTime
		}
		setInterval(() => {
			localStorage.currentTime = videoPlayerElement.currentTime
			if (
				currentSubtitle(subtitleElement) !==
				subtitle_in_timeLapse(_json, videoCurrTime(videoPlayerElement))
			)
				showSubtitles(
					subtitleElement,
					k.tokenizeForSentence(
						subtitle_in_timeLapse(_json, videoCurrTime(videoPlayerElement))
					),
					HandlerWhenClickingWord
				)
		}, 100)
	}
})

fetchJsonObject()
	.then(json => {
		_json = json
	})
	.catch(err => console.log(err))
