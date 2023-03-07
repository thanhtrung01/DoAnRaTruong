const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema(
	{
		code: {
			type: String,
			unique: true,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		sale: {
			type: String,
			required: false,
		},
		slug: {
			type: String,
			required: false,
		},
		quantity: {
			type: String,
			required: false,
		},
		price: {
			type: Number,
			required: true,
		},
		imageProduct: {
			type: String,
			maxlength: 512,
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

module.exports = mongoose.model('Product', ProductSchema);
