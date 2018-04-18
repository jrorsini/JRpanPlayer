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
import { kuromojiLoaded, fetchJsonObject } from './promises.js'
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
	// console.log(e.target.innerHTML);
	getTranslation(e.target.innerHTML)
}

/**
 * @param {Object} KeyPress Event.
 * @function set inner html to subtitle.
 * @return {Boolean} prevent key event.
 */

const videoPlayPauseHandle = e => {
	if (e.keyCode === 91 || e.key === 'Meta') {
		videoPlayerElement.pause()
	} else if (e.code === 'Space' && e.keyCode === 32 && videoPlaying) {
		videoPlayerElement.pause()
		videoPlaying = false
	} else {
		videoPlayerElement.play()
		videoPlaying = true
	}
	e.preventDefault()
	return false
}

kuromojiLoaded().then(_tokenizer => {
	k = _tokenizer
	videoPlayerElement.play()
	videoPlaying = true

	document.addEventListener('keypress', videoPlayPauseHandle)

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
