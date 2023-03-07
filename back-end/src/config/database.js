const config = require('./config');
const mongoose = require('mongoose');

mongoose
  .connect(config.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log('Connected to MongoDB!'))
  .catch((error) =>
    console.log(`can not connect to database, ${error}`, error.message),
  );
