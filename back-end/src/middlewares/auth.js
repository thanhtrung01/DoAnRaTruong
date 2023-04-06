const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const config = require("../config/config");
// const { config } = require("dotenv");
const generateToken = (id, email) => {
  const token = jwt.sign({ id, email }, config.ACCESS_TOKEN_SECRET, {
    expiresIn: config.TOKEN_EXPIRE_TIME,
  });
  return token.toString();
};

const verifyToken = async(req, res, next) => {
  try {
    if (!req.headers["authorization"])
      return res
        .status(401)
        .send({ errMessage: "Authorization token not found!" });

    const header = req.headers["authorization"];
    const token = header.split(" ")[1];

    await jwt.verify(token, config.ACCESS_TOKEN_SECRET, async(err, verifiedToken) => {
      if (err)
        return res
          .status(401)
          .send({ errMessage: "Authorization token invalid", details: err });
      const user = await User.findById(verifiedToken.id);
      req.user = user;
      next();
    });
  } catch (error) {
    return res
      .status(500)
      .send({
        errMesage: "Internal server error occured!",
        details: error.message,
      });
  }
};

module.exports = {
  generateToken,
  verifyToken
};
