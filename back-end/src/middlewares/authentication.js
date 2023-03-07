const config = require('../config/config');
const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  // let token = req.get("Authorization");

  // jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
  //   if (err) {
  //     return res.status(500).json({
  //       ok: false,
  //       msg: "Token invalid!",
  //     });
  //   }

  //   req.user = user.data;

  //   next();
  // });
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(500).json({ msg: 'Invalid authentication 1!' });
    }

    jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          ok: false,
          msg: 'Invalid authentication 2!',
        });
      }
      req.user = user.data;
      next();
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  isAuth,
};
