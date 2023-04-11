const config = require('./config');
const mongoose = require('mongoose');
const {
  BoardSchema,
  CardSchema,
  ListSchema,
  UserSchema,
} = require('../models');

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => BoardSchema.createIndexes())
  .then(() => CardSchema.createIndexes())
  .then(() => ListSchema.createIndexes())
  .then(() => UserSchema.createIndexes())
  .then(() => console.log('✅ Connected to MongoDB!'))
  .catch((error) =>
    console.log(`❗can not connect to database, ${error}`, error.message),
  );
