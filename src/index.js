import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import { Form, VideoPlayer } from './components';
let txtStyle = `
	background: -webkit-linear-gradient(#f30065, #ff7e8a);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent; 
	position: relative;
	`;
let selected_text;
let whole_text;
const part_of_speech = {
	noun: 'n',
	verb: 'v',
	adjective: 'adj',
	adverb: 'adv'
};
/**
 * @return {String} text from cursor selection
 */
let getSelectionText = () => {
	var text = '';
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != 'Control') {
		text = document.selection.createRange().text;
	}
	return text;
};

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			fileUploading: false,
			videoSrc: null,
			subtlSrc: null,
			uploadVideo: this.uploadVideo.bind(this),
			uploadSubtl: this.uploadSubtl.bind(this),
			currSubtl: null
		};
		this.newFile = this.newFile.bind(this);
		this.getTime = this.getTime.bind(this);
	}

	newFile() {
		this.setState(prevState => {
			return {
				fileUploading: false,
				videoSrc: null,
				subtlSrc: null
			};
		});
	}

	getTime() {
		let t = null;
		setInterval(() => {
			t = Math.round(
				document.getElementsByTagName('video')[0].currentTime * 1000
			);

			this.state.subtlSrc.map((e, i, arr) => {
				if (t > e.startTime && t < arr[i + 1].startTime) {
					this.setState(prevState => {
						return {
							currSubtl: e.text
						};
					});
				}
			});
		}, 100);
	}

	uploadVideo() {
		const formData = new FormData(document.getElementById('uploadForm'));
		const self = this;
		self.setState(prevState => {
			return {
				fileUploading: true
			};
		});

		axios
			.post('http://localhost:3000/videoUpload', formData)
			.then(function(response) {
				self.setState(prevState => {
					return {
						videoSrc: '/' + response.data,
						fileUploading: false
					};
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	uploadSubtl() {
		const formData = new FormData(document.getElementById('uploadForm'));
		const self = this;

		axios
			.post('http://localhost:3000/subtlUpload', formData)
			.then(function(response) {
				self.getTime();
				self.setState(prevState => {
					return {
						subtlSrc: response.data
					};
				});
				document.querySelector('video').play();
			})
			.catch(function(error) {
				console.log(error);
			});
	}

	render() {
		return this.state.fileUploading ? (
			<div className="row">
				<p className="center-align">File Loading...</p>
			</div>
		) : (
			<div className="row">
				{this.state.videoSrc ? (
					<button className="btn col s4 offset-s4" onClick={this.newFile}>
						New
					</button>
				) : (
					''
				)}
				{this.state.videoSrc ? <VideoPlayer src={this.state.videoSrc} /> : ''}
				{this.state.currSubtl ? (
					<p className="col s6 offset-s3 center-align">
						{this.state.currSubtl}
					</p>
				) : (
					''
				)}
				{this.state.videoSrc && this.state.subtlSrc ? (
					''
				) : (
					<Form s={this.state} />
				)}
			</div>
		);
	}
}

const getEnglishTranslation = word2Translate => {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `https://wordsapiv1.p.mashape.com/words/${word2Translate}/`);
	xhr.setRequestHeader(
		'X-Mashape-Key',
		'EM2LjqPX7NmshWE6CHvwADy0hGEkp1R0TUGjsnD7oIZjmUisZt'
	);
	xhr.setRequestHeader('Accept', 'application/json');
	xhr.send();
	xhr.onreadystatechange = function() {
		if (xhr.readyState === 4) {
			const data = JSON.parse(xhr.responseText);
			if (!data.success) {
				console.log('------------------------');
				console.log(
					`pronunciation: ${
						data.pronunciation
							? data.pronunciation.all
								? data.pronunciation.all
								: data.pronunciation
							: ''
					}`
				);
				console.log(data);
				if (data.results) {
					data.results.map((e, i) => {
						console.log(
							`(${e.partOfSpeech}) ${e.definition} ${
								e.synonyms ? `\n ${e.synonyms}` : ''
							}`
						);
					});
				}
			}
		} else if (xhr.status !== 200) {
			console.log(xhr.responseText);
		}
	};
};

document.addEventListener('mouseup', e => {
	const english_selected_element = document.getElementsByClassName(
		'english-selection'
	);

	if (english_selected_element.length) {
		Object.values(english_selected_element).map((e, i) => {
			e.parentNode.innerHTML = e.parentNode.innerText;
		});
	}

	selected_text = getSelectionText();

	if (selected_text !== '') {
		whole_text = e.target.innerHTML;
		const re = new RegExp(selected_text, 'g');
		const selection_element_html = `<b class="english-selection" style="${txtStyle}">${selected_text}</b>`;
		e.target.innerHTML = whole_text.replace(re, selection_element_html);
		getEnglishTranslation(selected_text);
	} else {
		Object.values(english_selected_element).map((e, i) => {
			e.innerHTML = e.innerHTML;
		});
	}
});

ReactDOM.render(<App />, document.getElementById('app'));
