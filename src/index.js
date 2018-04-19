// TODO
/**
 * Handling cases where subtitles are generated.
 * x left and right arrow
 */
// DONE
/**
 * o/ get JSON array.
 * o/ -te / -ta / -tai / -tara / -u  form
 * o/ pause and play video with space
 * o/ Show subtitles.
 * o/ remove underline effect on spaces.
 * o/ Save video time when leaving off.
 * o/ Make a more readable font.
 * o/ People's name handler
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { fetchJsonObject, kuromojiLoaded, getTranslation } from './promises.js'
import { videoKeypressHandler, wordsClickHandler } from './pure-functions.js'
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

kuromojiLoaded().then(_tokenizer => {
	k = _tokenizer
	videoPlayerElement.play()
	videoPlaying = true

	document.addEventListener('keypress', e => {
		videoPlaying = videoKeypressHandler(e, videoPlayerElement, videoPlaying)
	})

	videoPlayerElement.onplay = () => {
		if (localStorage.currentTime) {
			videoPlayerElement.currentTime = localStorage.currentTime
		}
		setInterval(() => {
			const subtls = subtitle_in_timeLapse(
				_json,
				videoCurrTime(videoPlayerElement)
			)
			localStorage.currentTime = videoPlayerElement.currentTime
			if (currentSubtitle(subtitleElement) !== subtls)
				showSubtitles(subtitleElement, k.tokenizeForSentence(subtls), e =>
					wordsClickHandler(e, videoPlayerElement, k, getTranslation)
				)
		}, 100)
	}
})

fetchJsonObject()
	.then(json => {
		_json = json
	})
	.catch(err => console.log(err))
