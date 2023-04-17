const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../services/user.service');
const session = require('express-session');
const { UserSchema } = require('../models/index');
const auth = require('../middlewares/auth');
// const oauth2Client = require('../middlewares/authGoogle');
const config = require('../config/config');
const { OAuth2Client } = require('google-auth-library');
// const { google } = require("googleapis");
// const { OAuth2 } = google.auth;

const client = new OAuth2Client({
	clientId: config.GOOGLE_CLIENT_ID, // Thay YOUR_CLIENT_ID bằng client_id của bạn
	clientSecret: config.GOOGLE_CLIENT_SECRET, // Thay YOUR_CLIENT_SECRET bằng client_secret của bạn
	redirectUri: config.GOOGLE_REDIRECT_URI, // Thay YOUR_REDIRECT_URI bằng redirect_uri của bạn
});
const register = async (req, res) => {
	const { name, username, email, password } = req.body;
	if (!(name && username && email && password)) {
		return res.status('400').send({
			ok: false,
			errMessage: 'Please fill all required areas!',
		});
	}
	const salt = bcrypt.genSaltSync(10);
	const hashedPassword = bcrypt.hashSync(password, salt);
	req.body.password = hashedPassword;

	await User.register(req.body, (err, result) => {
		if (err) return res.status(400).send(err);
		return res.status(201).send(result);
	});
};

const login = async (req, res) => {
	const { email, password } = req.body;
	if (!(email && password)) {
		return res.status(400).send({
			ok: false,
			errMessage: 'Please fill all required areas!',
		});
	}
	await User.login(email, (err, result) => {
		if (err) return res.status(400).send(err);
		const hashedPassword = result.password;
		if (!bcrypt.compareSync(password, hashedPassword)) {
			return res.status(400).send({
				ok: false,
				errMessage: 'Your email/password is wrong!',
			});
		}
		const token = auth.generateToken(result._id, result.email);
		/* thời gian sống của token tính theo giây*/
		const expires_in = auth.expiresToken(result.token);
		/* hiden password || id */
		result.password = undefined;
		result.__v = undefined;

		return res.status(200).send({
			oke: true,
			message: 'User login successful!',
			user: result,
			token,
			expires_in,
			// expiration
		});
	});
};
const google = (req, res) => {
	const authUrl = client.generateAuthUrl({
		scope: ['profile', 'email'], // Phạm vi truy cập thông tin người dùng
	});
	console.log('auth_url', authUrl);
	res.redirect(authUrl);
};
const googleLogin = async (req, res) => {
	const { tokenId } = req.body;
	try {
		const token = await client.getToken(tokenId);
		const { id_token } = await token.tokens;
		const ticket = await client.verifyIdToken({
			idToken: id_token,
			audience: config.GOOGLE_CLIENT_ID,
		});
		const payload = await ticket.getPayload();
		const { sub, name, email } = payload;
		console.log('sub:', sub); // id người dùng
		console.log('name:', name); // tên người dùng
		console.log('email:', email); // email người dùng
		// Kiểm tra xem người dùng đã tồn tại trong cơ sở dữ liệu chưa
		let user = await UserSchema.findOne({ googleId: sub });
		if (!user) {
			// Nếu chưa tồn tại, thêm người dùng mới vào cơ sở dữ liệu
			user = new UserSchema({
				googleId: sub,
				name,
				email,
			});
			await user.save();
		}

		// Đăng nhập thành công, lưu thông tin người dùng vào session hoặc jwt token
		// (tùy thuộc vào cách xác thực người dùng của bạn)
		req.session.user = user;
		res.redirect('/');
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: error.message });
	}
};

const getUser = async (req, res) => {
	const userId = req.user.id;
	await User.getUser(userId, (err, result) => {
		if (err) return res.status(404).send(err);

		result.isAdmin = undefined;
		result.email = undefined;
		result.password = undefined;
		result.__v = undefined;

		return res.status(200).send(result);
	});
};

const getUserWithMail = async (req, res) => {
	const { email } = req.body;
	await User.getUserWithMail(email, (err, result) => {
		if (err) return res.status(404).send(err);

		const dataTransferObject = {
			name: result.name,
			avatar: result.avatar,
			username: result.username,
			color: result.color,
			email: result.email,
		};
		return res.status(200).send(dataTransferObject);
	});
};

const updateUser = async (req, res) => {
	const { userId } = req.params;
	console.log('req.file', req.files);
	const images_url = req.files[0].path;
	// const images_url = req.file;
	await UserSchema.findByIdAndUpdate(
		userId,
		{
			name: req.body.name,
			avatar: images_url,
		},
		{ new: true },
		(err, user) => {
			if (err) {
				return res.status(500).json({
					ok: false,
					err,
				});
			}
			user.password = undefined;
			return res.status(201).json({
				ok: true,
				message: 'Update finish!',
				user,
			});
		}
	);
};

const createUser = async (req, res) => {
	const images_url = req.files.map((image) => image.path);
	const salt = bcrypt.genSaltSync(10);
	const newUser = new UserSchema({
		name: req.body.name,
		email: req.body.email,
		address: req.body.address,
		phone: req.body.phone,
		username: req.body.username,
		password: bcrypt.hashSync(req.body.password, salt),
		avatar: images_url,
		isAdmin: req.body.isAdmin,
	});
	await newUser.save((err, user) => {
		if (err) {
			return res.status(500).json({
				ok: false,
				err,
			});
		}
		user.password = undefined;
		return res.status(200).json({
			ok: true,
			msg: 'Xác thực quyền admin thành công',
			user,
		});
	});
};

module.exports = {
	register,
	login,
	google,
	googleLogin,
	getUser,
	getUserWithMail,
	updateUser,
	createUser,
};
