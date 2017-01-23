let mongoose = require('../utils/mongoose'),
	Schema = mongoose.Schema,
	
	User = new Schema({
		nickname: {
			type: String,
			unique: true
		},
		vkId: Number,
		username: String,
		group: String,
		photoUrl: String,
		profileUrl: String
	}),
	UserModel = mongoose.model('User', User);

module.exports = UserModel;