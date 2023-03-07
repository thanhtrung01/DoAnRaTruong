const Product = require('../models/Product');

const CTRL = {};

//Lấy dữ liệu sản phẩm từ trường danh mục sản phẩm
CTRL.getProducts = (req, res) => {
	Product.find({})
		.populate('idCategory')
		.exec((err, products) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err,
				});
			}
			res.json({
				ok: true,
				products,
			});
		});
};

// Tìm kiếm sản phẩm theo Tên
CTRL.searchProduct = (req, res) => {
	Product.find({ title: { $regex: req.body.title, $options: '$i' } })
		.sort('-created_at')
		.exec((err, products) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err,
				});
			}
			res.json({
				ok: true,
				products,
			});
		});
};

// Lấy dữ liệu sản phẩm từ id danh mục sản phẩm
CTRL.getProduct = (req, res) => {
	const { productId } = req.params;
	Product.findById(productId)
		.populate('idCategory')
		.exec((err, product) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err,
				});
			}
			res.json({
				ok: true,
				product,
			});
		});
};

//Tạo mới sản phẩm
CTRL.createProduct = (req, res, next) => {
	// console.log('request', req.body);
	const newProduct = new Product({
		code: req.body.code,
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		sale: req.body.sale,
		slug: req.body.slug,
		status: req.body.status,
		idCategory: req.body.idCategory,
		quantity: req.body.quantity,
	});
	if (req.file) {
		newProduct.imageProduct = req.file.path;
	}
	newProduct.save((err, product) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err,
			});
		}

		return res.status(201).json({
			ok: true,
			product,
		});
	});
};

// Cập nhật sản phẩm
CTRL.updateProduct = (req, res) => {
	const { productId } = req.params;

	Product.findByIdAndUpdate(
		productId,
		req.body,
		{ new: true },
		(err, product) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err,
				});
			}

			return res.status(201).json({
				ok: true,
				product,
			});
		}
	);
};

//Xóa sản phẩm
CTRL.deleteProduct = (req, res) => {
	const { productId } = req.params;
	Product.findByIdAndRemove(productId, (err, product) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err,
			});
		}

		return res.status(201).json({
			ok: true,
			product,
		});
	});
};

module.exports = CTRL;
