const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cookieParser = require('cookie-parser');
const path = require("path");

const { _helper } = require('./_helper/helper');

app.use(cors({ credentials: true, origin: 'https://starmordar.github.io' }));

mongoose.connect('mongodb://Starmordar:msims7529@167.71.13.201:27017/test-mongo?authSource=admin', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () { });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../frontend/build")))

app.use(cookieParser());

const sessionOptions = {
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  }),
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } //30 days
};

app.use(session(sessionOptions));

app.use((req, res, next) => {
  if (req.cookies[_helper.COOKIES_PROP] && !req.session.userId) {
    res.clearCookie(_helper.COOKIES_PROP);
  }
  next();
});

const routes = require('./routes/router');
app.use('/', routes);

app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  console.log(err.message);
  res.send(err.message);
});

app.listen(4000, function () {
  console.log('Express app listening on port 3000');
});