const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const model = {};

model.mongoose = mongoose;

model.user = require("./User.models");
// model.order = require("./Order.models");
model.role = require("./Role.models");

model.ROLES = ["user", "admin", "moderator"];

module.exports = model;