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
	prompt: {
		type: String,
		required: true
	},
	script: {
		type: String,
	},
	thumbnailLink: {
		type: String
	},
	voiceoverLink: {
		type: String
	},
	videoLink: {
		type: String
	},
	trashStatus: {
		type: Boolean,
		default: false
	}
})

const projectModel = mongoose.model('datathon-3-project', projectSchema)

module.exports = projectModel