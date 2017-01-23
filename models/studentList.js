let mongoose = require('../utils/mongoose'),
	Schema = mongoose.Schema,

	Group = new Schema({
		name: String,
		amount: Number,
		list: []
	}),

	GroupModel = mongoose.model('Group', Group);

	// Student = new Schema({
	// 	num: Number,
	// 	name: String,
	// 	surname: String,
	// 	vkref: String
	// })

	// studentGroup = new Schema({
	// 	name: String,
	// 	length: Number,
	// 	students: [Student]
	// })


// Student.methods.getAll = function (cb) {
// 	return this.model('Student').find(cb);
// }

module.exports = GroupModel;