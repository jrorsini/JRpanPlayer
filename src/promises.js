import kuromoji from 'kuromoji'

/**
 * @param {string} word
 * @promise Get translation information from word.
 * @resolve {object} data from word passed in param.
 * @reject {object} in case of failure reaching out to the API
 */
const getTranslation = word =>
	new Promise((resolve, reject) => {
		console.log(word)
		const xhr = new XMLHttpRequest()
		xhr.open('GET', `https://jrpanapi.herokuapp.com/meaning/${word}/`)
		xhr.setRequestHeader('Accept', 'application/json')
		xhr.send()
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				resolve(JSON.parse(xhr.responseText))
			} else if (xhr.status !== 200) {
				reject(JSON.parse(xhr.responseText))
			}
		}
	})

/**
 * @promise loads subtitles.
 * @resolve {Array} subtitles JSON.
 */
const fetchJsonObject = () =>
	new Promise((resolve, reject) => {
		const xmlhttp = new XMLHttpRequest()
		xmlhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				resolve(JSON.parse(this.responseText))
			}
		}
		xmlhttp.open('GET', 'subtls/sample.json', true)
		xmlhttp.send()
	})

/**
 * @promise loads Japanese dictionary.
 * @resolve {String} message confirming the dictionary has loaded.
 */
const kuromojiLoaded = (path = 'dict') =>
	new Promise((resolve, reject) => {
		kuromoji.builder({ dicPath: path }).build((err, _tokenizer) => {
			resolve(_tokenizer)
		})
	})

module.exports = {
	fetchJsonObject,
	kuromojiLoaded,
	getTranslation
}
