const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../services/user.service');
const session = require('express-session');
const UserSchema = require('../models/user.model');
const auth = require('../middlewares/auth');
// const oauth2Client = require('../middlewares/authGoogle');
const config = require('../config/config');
// const { OAuth2Client } = require('google-auth-library');
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const client = new OAuth2(config.GOOGLE_CLIENT_ID);
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

const googleLogin = async (req, res) => {
	try {
		const { tokenId, authType } = req.body;

		const verify = await client.verifyIdToken({
			idToken: tokenId,
			audience: config.GOOGLE_CLIENT_ID,
		});
		const { family_name, given_name, email, picture } = verify.payload;
		const salt = bcrypt.genSaltSync(10);
		const password = email + config.GOOGLE_CLIENT_SECRET;
		const passwordHash = bcrypt.hashSync(password, salt);

		const user = await UserSchema.findOne({
			email,
			authType: "google"
		});

		if (user) {
			const isMatch = bcrypt.compareSync(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ msg: "Password is incorrect" });
			}
			const token = auth.generateToken(user._id, user.email);
			const expires_in = auth.expiresToken({ token });
			/* hiden password || id */
			user.password = undefined;
			user.__v = undefined;
			res.status(200).json({
				oke: true,
				message: 'User login successful!',
				user: user,
				token: token,
				expires_in
			});
		} else {
			const newUser = new UserSchema({
				name: family_name + given_name,
				username: email,
				password: passwordHash,
				email: email,
				authType: 'google',
				avatar: picture,
			});
			await newUser.save();
			const token = auth.generateToken(newUser._id, newUser.email);
			const expires_in = auth.expiresToken({ token });
			/* hiden password || id */
			newUser.password = undefined;
			newUser.__v = undefined;
			res.status(200).json({
				oke: true,
				message: 'User login successful!',
				user: newUser,
				token: token,
				expires_in
			});
		}
	} catch (error) {
		console.log(error);
		return res.status(500).json({ msg: error.message });
	}
};
const createAccessToken = (payload) => {
	return jwt.sign(payload, config.ACCESS_TOKEN_SECRET, {
		expiresIn: "1d",
	});
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
const getAllUser = async (req, res) => {
	try {
		const users = await UserSchema.find(
		).sort('__v')

		//hiden password or role change
		const usersWithoutPassword = users.map(user => {
			const {
				password,
				isAdmin,
				authType,
				...userWithoutPassword
			} = user.toObject();
			return userWithoutPassword;
		});
		const countAllUsers = await UserSchema.countDocuments();

		return res.status(200).json({
			user: usersWithoutPassword,
			count: countAllUsers,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json({ msg: err.message });
	}
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
	try {
		const { userId } = req.params;
		const images_url = req.files[0].path;
		const user = await UserSchema.findByIdAndUpdate(
			userId,
			{
				name: req.body.name,
				avatar: images_url
			},
			{ new: true },
		)
		await user.save()
		user.password = undefined;
		return res.status(201).json({
			ok: true,
			message: 'Update finish!',
			user: user,
		});

	} catch (err) {
		console.log(err);
		return res.status(500).json({ msg: err.message });
	}
};

const createUser = async (req, res) => {
	// const images_url = req.files.map((image) => image.path);
	const images_url = req.files[0].path;
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
	getAllUser,
	getUserWithMail,
	updateUser,
	createUser,
};
