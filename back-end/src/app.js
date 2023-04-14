const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const session = require('express-session');
const cookieParser = require("cookie-parser");
const unless = require('express-unless');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config/config');
const cookieSession = require("cookie-session");
const auth = require('./middlewares/auth');
// const swaggerUi = require('swagger-ui-express');
// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// const { Cors } = require('./middlewares/cors');

const corsOptions = {
  origin: config.CLIENT_URL,
  credentials: true,
};
// const swaggerDocument = require('./api/swagger.json')
// app.use("/test-api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// AUTH VERIFICATION AND UNLESS
auth.verifyToken.unless = unless;

app.use(
  auth.verifyToken.unless({
    path: [
      { url: '/api/v1/auth/google', method: ['GET'] },
      { url: '/api/v1/auth/login', method: ['POST'] },
      { url: '/api/v1/auth/google_login', method: ['POST'] },
      { url: '/api/v1/auth/register', method: ['POST'] },
    ],
  }),
);
app.use(session({
  secret: config.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use('/api/v1/auth', require('./routes/auth.route'));
app.use('/api/v1/user', require('./routes/user.route'));
app.use('/api/v1/board', require('./routes/board.route'));
app.use('/api/v1/list', require('./routes/list.route'));
app.use('/api/v1/card', require('./routes/card.route'));
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to my API shopping' });
});

module.exports = app;
