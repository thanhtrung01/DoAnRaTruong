const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DepartmentSchema = new Schema(
	{
		idUser: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		title: {
			type: String,
			required: true,
		},
		idBoard: {
			type: Schema.Types.ObjectId,
			ref: 'Board',
		},
		sale: {
			type: String,
			required: false,
		},
		status: {
			type: Boolean,
			default: true,
		},
		idCategory: {
			type: Schema.Types.ObjectId,
			ref: 'Category',
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
	},
	{
		timestamp: true,
	}
);

module.exports = mongoose.model('Department', DepartmentSchema);
