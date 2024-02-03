const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	initPrompt: {
		type: String,
		required: true
	},
	script: {
		type: String,
		required: true
	},
	thumbnailLink: {
		type: String
	},
	voiceoverLink: {
		type: String
	},
	videoLink: {
		type: String
	}
})

const projectModel = mongoose.Model('datathon-3-project', projectSchema)

module.exports = projectModel