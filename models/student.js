let mongoose = require('../utils/mongoose'),
	Schema = mongoose.Schema,

	Student = new Schema({
		num: Number,
		name: String,
		surname: String,
		vkref: String
	});

module.exports = mongoose.model('Student', Student);