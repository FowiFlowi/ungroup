let mongoose = require('../utils/mongoose'),
	Schema = mongoose.Schema,

	Student = new Schema({
		num: Number,
		name: String,
		surname: String,
		vkref: String
	});


Student.methods.getAll = function (cb) {
	return this.model('Student').find(cb);
}

module.exports = mongoose.model('Student', Student);