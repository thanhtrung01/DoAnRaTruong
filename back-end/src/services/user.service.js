const userModel = require('../models/user.model');

const login = async (email, callback) => {
  try {
    let user = await userModel.findOne({ email });
    if (!user) return callback({ errMessage: 'Email không hợp lệ!🥹' });
    return callback(false, { ...user.toJSON() });
  } catch (err) {
    return callback({
      errMessage: 'Có gì đó đã sai 🙈',
      details: err.message,
    });
  }
};

const getUser = async (id, callback) => {
  try {
    let user = await userModel.findById(id);
    if (!user) return callback({ errMessage: 'Tài khoản người dùng không tìm thấy!' });
    return callback(false, { ...user.toJSON() });
  } catch (err) {
    return callback({
      errMessage: 'Có gì đó đã sai',
      details: err.message,
    });
  }
};

const getUserWithMail = async (email, callback) => {
  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return callback({
        errMessage: 'Không có người dùng đã đăng ký với e-mail này.',
      });
    return callback(false, { ...user.toJSON() });
  } catch (error) {
    return callback({
      errMessage: 'Có gì đó đã sai',
      details: error.message,
    });
  }
};

module.exports = {
  // register,
  login,
  getUser,
  getUserWithMail,
};
