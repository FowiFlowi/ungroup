// let crypto = require('crypto'),
let mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	// async = require('async'),

	User = new Schema({
		nickname: {
			type: String,
			unique: true,
		},
		numberOfGroup: {
			type: Number,
		},
		id: {
			type: Number,
			unique: true
		}
		// hashedPassword: {
		// 	type: String,
		// 	required: true
		// },
		// salt: {
		// 	type: String.
		// 	required: true
		// }
	});

// User.virtual('password')
//     .set(function (password) {
//         this._plainPassword = password;
//         this.salt = Math.random() + '';
//         this.hashedPassword = this.encryptPassword(password);
//     })
//     .get(function () {
//         return this._plainPassword;
//     });

// User.methods.checkPassword = function (password) {
//     return this.encryptPassword(password) === this.hashedPassword;
// };

module.exports = mongoose.model('User', User);