const mongoose = require('mongoose');

const {Schema} = mongoose;
const userSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	social: {
		type: {
			instagram: String,
			facebook: String,
			twitter: String,
			youtube: String
		}
	}
});
const User = mongoose.model('datathon-3-users', userSchema);
module.exports = User;