require('./config/config'); // environment variables for development

const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const passport = require('passport');

const app = express();
const port = process.env.PORT;
const db = require('./db');

// Middleware
app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(passport.initialize());

// MySQL
db.connection.authenticate().then(() => {
  console.log('Connected to SQL database:', process.env.DB_NAME);
}).catch((err) => {
  console.error('Unable to connect to SQL database:', process.env.DB_NAME, err);
});

// Routes
require('./routes/authRoutes')(app);

// Development
if (process.env.NODE_ENV === 'development') {
  // create tables from models
  db.connection.sync();
  // db.connection.sync({ force: true });

  // devServer (catch all)
  require('./config/devServer')(app); // eslint-disable-line global-require
}

// Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '..', 'dist'), {
    enableBrotli: true,
  }));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
  });
}

// Start
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port} in ${process.env.NODE_ENV}`);
});
