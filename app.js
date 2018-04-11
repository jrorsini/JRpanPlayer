const fs = require('fs');
const parser = require('subtitles-parser');

const createJSONedFile = () => {
	const srt = fs.readFileSync('./dist/subtls/sample.srt', 'utf8');
	const data = parser.fromSrt(srt, true);
	fs.writeFileSync('./dist/subtls/sample.json', JSON.stringify(data));
};
