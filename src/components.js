import React from 'react';
import ReactDOM from 'react-dom';

export default class VideoPlayer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="col s8 offset-s2">
				<video id="videoPlayer" src="videos/sample.mp4" controls />
			</div>
		);
	}
}
