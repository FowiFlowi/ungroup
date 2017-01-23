let mongoose = require('../utils/mongoose'),
	Schema = mongoose.Schema,

	Group = new Schema({
		name: String,
		amount: Number,
		elder: String,
		list: []
	}),

	GroupModel = mongoose.model('Group', Group);

module.exports = GroupModel;