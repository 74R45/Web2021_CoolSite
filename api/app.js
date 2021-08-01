const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const migrate = require('./db/migrate');

const applicationsRouter = require('./routes/applications');
const trainingsRouter = require('./routes/trainings');
const miscRouter = require('./routes/misc');
const migrateIfNeeded = require('./db/migrate');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/applications', applicationsRouter);
app.use('/trainings', trainingsRouter);
app.use('/', miscRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  const error = req.app.get('env') === 'development' ? err : {};

  // send error
  res.status(err.status || 500).send({message: err.message, error: error});
});

// execute db migration if schema is invalid
migrate();

module.exports = app;
