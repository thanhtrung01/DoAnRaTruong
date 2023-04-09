const bcrypt = require('bcryptjs');
const User = require('../services/user.service');
const auth = require('../middlewares/auth');

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

    /* thời gian sống của token là 2h*/
    const now = new Date().getTime();
    const expiration = now + 7200 * 1000;
    /* hiden password || id */
    result.password = undefined;
    result.__v = undefined;

    return res.status(200).send({
      oke: true,
      message: 'User login successful!',
      user: result,
      token,
      expiration,
      // expiration
    });
  });
};

const getUser = async (req, res) => {
  const userId = req.user.id;
  await User.getUser(userId, (err, result) => {
    if (err) return res.status(404).send(err);

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
      username: result.username,
      color: result.color,
      email: result.email,
    };
    return res.status(200).send(dataTransferObject);
  });
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  await User.updateUser(userId, req.body, (err, result) => {
    if (err) return res.status(500).send(err);
    return res.status(200).send(result);
  });
};

module.exports = {
  register,
  login,
  getUser,
  getUserWithMail,
  updateUser
};
