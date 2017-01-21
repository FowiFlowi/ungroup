let mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	User = new Schema({
		nickname: {
			type: String,
			unique: true,
		},
		vkId: {
			type: Number
		},
		username: String,
		groupNumber: Number,
		photoUrl: String,
		profileUrl: String
	}),
	userModel = mongoose.model('User', User);

module.exports = userModel;