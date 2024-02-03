const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
	type: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		required: true
	},
	inputType: {
		type: String
	},
	input: {
		type: String
	},
	outputType: {
		type: String
	},
	output: {
		type: String
	},
	trashStatus: {
		type: Boolean,
		default: false
	},
	lastUpdatedTimestamp: {
		type: Date,
		default: Date.now
	}
})

const projectModel = mongoose.model('datathon-3-project', projectSchema)

module.exports = projectModel