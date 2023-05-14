const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../services/user.service");
const UserSchema = require("../models/user.model");
const auth = require("../middlewares/auth");
const config = require("../config/config");
const { createRandomHexColor } = require("../helper/validate");
const { validateEmail } = require("../validates/auth.validate");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const client = new OAuth2(config.GOOGLE_CLIENT_ID);
const register = async (req, res) => {
  try {
    const { name, username, password, email } = req.body;
    if (!(name && username && email && password)) {
      return res.status(400).json({
        oke: false,
        errMessage: "Thiếu tên người dùng, mật khẩu, email!",
      });
    }
    const users = await UserSchema.findOne({ username });
    if (users) {
      return res.status(400).json({
        oke: false,
        errMessage: " username đã được sử dụng!",
      });
    }
    if (!validateEmail(email)) {
      return res.status(400).json({
        oke: false,
        errMessage: " Email không hợp lệ!",
      });
    }
    const user = await UserSchema.findOne({ email });
    if (user) {
      return res.status(400).json({
        oke: false,
        errMessage: " Email đã được sử dụng!",
      });
    }
    if (!password.match(/\d/) || !password.match(/[a-zA-Z]/)) {
      return res.status(400).json({
        oke: false,
        errMessage: "Mật khẩu phải chứa ít nhất 1 chữ cái và 1 số!",
      });
    }
    if (password.length < 6) {
      return res.status(400).json({
        oke: false,
        errMessage: "Mật khẩu phải lớn hơn 6 kí tự!",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    const newUser = new UserSchema({
      name: name,
      username: username,
      email: email,
      password: passwordHash,
      color: createRandomHexColor(),
    });
    await newUser.save();
    res.status(200).json({
      oke: true,
      message: "Bạn đã tạo tài khoản thành công! 🎉'",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errMessage: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).send({
      ok: false,
      errMessage: "Vui lòng điền vào tất cả các trường cần thiết!",
    });
  }
  await User.login(email, (err, result) => {
    if (err) return res.status(400).send(err);
    const hashedPassword = result.password;
    if (!bcrypt.compareSync(password, hashedPassword)) {
      return res.status(400).send({
        ok: false,
        errMessage: "Bạn đã nhập mật khẩu sai😞",
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
      message: "Đăng nhập thành công! 🎉",
      user: result,
      token,
      expires_in,
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
      authType: "google",
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
        message: "Đăng nhập thành công 🎉!",
        user: user,
        token: token,
        expires_in,
      });
    } else {
      const newUser = new UserSchema({
        name: family_name + given_name,
        username: email,
        password: passwordHash,
        email: email,
        authType: "google",
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
        message: "Đăng nhập thành công 🎉!",
        user: newUser,
        token: token,
        expires_in,
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

    // result.isAdmin = undefined;
    result.email = undefined;
    result.password = undefined;
    result.__v = undefined;

    return res.status(200).send(result);
  });
};
const getAllUser = async (req, res) => {
  try {
    const users = await UserSchema.find().sort("__v");

    //hiden password or role change
    const usersWithoutPassword = users.map((user) => {
      const { password, isAdmin, authType, ...userWithoutPassword } =
        user.toObject();
      return userWithoutPassword;
    });
    const countAllUsers = await UserSchema.countDocuments();

    return res.status(200).json({
      count: countAllUsers,
      user: usersWithoutPassword,
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
    // const images_url = req.files[0].path;
    const user = await UserSchema.findByIdAndUpdate(
      userId,
      {
        name: req.body.name,
        avatar: req.body.avatar || req.files[0].path,
      },
      { new: true }
    );
    await user.save();
    user.password = undefined;
    return res.status(201).json({
      ok: true,
      message: "Cập nhật thành công!",
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
  if (req.user.isAdmin !== true) {
    return res.status(403).json({ message: "Bạn không phải admin" });
  }
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
      message: "Admin tạo người dùng mới thành công!🎉",
      user,
    });
  });
};
const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    await UserSchema.findByIdAndDelete(
      userId,
      req.params.user
    ); 
    return res.status(201).json({
      ok: true,
      message: "Admin xoá người dùng thành công! 🎉"
    });//
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = {
  register,
  login,
  googleLogin,
  getUser,
  getAllUser,
  deleteUser,
  getUserWithMail,
  updateUser,
  createUser,
};
