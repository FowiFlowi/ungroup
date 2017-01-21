let mongoose = require('mongoose'),
	Schema = mongoose.Schema,

	User = new Schema({
		nickname: {
			type: String,
			unique: true,
		},
		groupNumber: {
			type: Number,
		},
		vkId: {
			type: Number,
			unique: true
		},
		photoUrl: {
			type: String
		},
		profileUrl: {
			type: String
		}
	}),
	userModel = mongoose.model('User', User);

User.methods.findOrCreate = function(userData, cb) {
	this.model('User').findOne(userData.vkId, (err, obj) => {
		if (err) {
			logger.error(err);
			cb(err);

		} else if (obj) {
			logger.info('User ' + obj.nickname + ' logged on')
			cb(null, obj);

		} else if (!obj) {
			let user = new userModel({
				nickname: 	  userData.query.nickname,
				groupNumber:  userData.query.groupNumber,
				vkId: 		  userData.vkId,
				username: 	  userData.username,
				photoUrl: 	  userData.photoUrl,
				profileUrl:   userData.profileUrl
			});
			user.save();
			logger.info('User ' + userData.username + ' has registered');
			cb(null, user);			
		}
	})
};

User.methods.findById = function(vkId, cb) {
	return this.model('User').findOne({ vkId }, cb);
}

module.exports = userModel;