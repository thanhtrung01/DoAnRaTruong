const dotenv = require('dotenv');
require('dotenv').config();
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URL: process.env.MONGODB_URL,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  TOKEN_EXPIRE_TIME: process.env.TOKEN_EXPIRE_TIME,
  TOKEN_EXPIRATION_DATE: process.env.TOKEN_EXPIRATION_DATE
};
