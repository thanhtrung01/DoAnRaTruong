const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const session = require('express-session');
const cookieParser = require("cookie-parser");
const unless = require('express-unless');
const bodyParser = require('body-parser');
const config = require('./config/config');
const cookieSession = require("cookie-session");
const auth = require('./middlewares/auth');
const accessCors = require('./middlewares/constant');
const swaggerUi = require('swagger-ui-express');
// const {options} = require('./api/swagger');
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDocument = require('./api/swagger.json');
// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

const whitelist = [
  'https://do-an-ra-truong.vercel.app', 
  'http://localhost:3000'
];
// const { Cors } = require('./middlewares/cors');
// const corsOptions = {
//   origin: config.CLIENT_URL,
//   credentials: true,
// };
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
// const swaggerDocument = options
app.use("/test-api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
// AUTH VERIFICATION AND UNLESS
auth.verifyToken.unless = unless;

app.use(
  auth.verifyToken.unless({
    path: accessCors
  }),
);
app.use(session({
  secret: config.GOOGLE_CLIENT_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/user', require('./routes/user.routes'));
app.use('/api/v1/board', require('./routes/board.routes'));
app.use('/api/v1/list', require('./routes/list.routes'));
app.use('/api/v1/card', require('./routes/card.routes'));
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to my API shopping' });
});

module.exports = app;
