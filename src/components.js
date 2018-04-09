import React from 'react';
import ReactDOM from 'react-dom';

export class Form extends React.Component {
	render() {
		return (
			<form id="uploadForm" encType="multipart/form-data">
				<input
					type="file"
					name={this.props.s.videoSrc ? 'subtl2upload' : 'video2upload'}
					onChange={
						this.props.s.videoSrc
							? this.props.s.uploadSubtl
							: this.props.s.uploadVideo
					}
				/>
				<p
					className={
						this.props.s.videoSrc ? 'center-align white-text' : 'center-align'
					}
				>
					Upload {this.props.s.videoSrc ? 'subtitles' : 'video'}
					<br />{' '}
					<i className="material-icons">
						{this.props.s.videoSrc ? 'subtitles' : 'play_circle_outline'}
					</i>
				</p>
			</form>
		);
	}
}

export class VideoPlayer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="col s8 offset-s2">
				<video src={this.props.src} className="col s12" controls />
			</div>
		);
	}
}
