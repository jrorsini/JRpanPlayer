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
 * @param {Object} word's object
 * @return {String} Marked up word
 */
const generateMarkup = word =>
	hasjapaneseCharacter(word.surface_form)
		? isKatakana(word.surface_form)
			? `<div class="jrpan-gloss-tag katakana-gloss">${word.surface_form}</div>`
			: `<div class="jrpan-gloss-tag ${part_of_speech[word.pos]}-gloss">${
					word.surface_form
			  }</div>`
		: `<div class="jrpan-gloss-tag">${word.surface_form}</div>`;

/**
 * @param {Object} root element to set text in.
 * @param {String} subtitle to put into tag element.
 * @function set inner html to subtitle.
 */
const showSubtitles = (root, subtitle) => {
	console.log(subtitle);
	if (subtitle) {
		root.innerHTML = subtitle
			.map(e => (e.surface_form === '\n' ? `<br/>` : generateMarkup(e)))
			.join('');
		Object.values(document.getElementsByClassName('jrpan-gloss-tag')).map(
			tagEl => {
				tagEl.addEventListener('click', e => {
					getTranslation(e.target.innerHTML);
				});
			}
		);
	}
};

/**
 * @param {string} word
 * @promise Get translation information from word.
 * @resolve {object} data from word passed in param.
 * @reject {object} in case of failure reaching out to the API
 */
const getTranslation = word =>
	new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `https://jisho.org/api/v1/search/words?keyword=${word}/`);
		xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
		xhr.withCredentials = false;
		xhr.setRequestHeader('Accept', 'application/json');
		xhr.send();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4 && xhr.status == 200) {
				const dataTemp = JSON.parse(xhr.responseText)['data'].filter(
					e => e['is_common']
				);
				const res = JSON.parse(xhr.responseText)['data']
					? JSON.parse(xhr.responseText)['data'][0]
					: 'nothing found';
				console.log(res);
				resolve(res);
			} else if (xhr.status !== 200) {
				reject(xhr.responseText);
			}
		};
	});

/**
 * @param {Object} element vidoe element.
 * @return {Number} current time.
 */
const videoCurrTime = element => Math.round(element.currentTime * 1000);

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
	selection.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) !== null;

/**
 * @param {String} word
 * @return {Boolean} if the word is only made out of Katakana.
 */
const isKatakana = word =>
	word.match(/[\u30A0-\u30FF]/g)
		? word.match(/[\u30A0-\u30FF]/g).length === word.length
		: false;

/**
 * @param {String} word
 * @return {Boolean} if the word is only made out of Katakana.
 */
const hasjapaneseCharacter = word =>
	word.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g) ? true : false;

module.exports = {
	subtitle_in_timeLapse,
	showSubtitles,
	videoCurrTime,
	currentSubtitle
};
