const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	color: {
		type: String,
	},
	boards: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'board',
		},
	],
});

module.exports = mongoose.model('user', UserSchema);
