require('./config/config'); // environment variables for development

const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const passport = require('passport');

const app = express();
const port = process.env.PORT;
const routes = require('./routes');
const models = require('./models');

app.use(logger('dev'));
app.use(compression());
app.use(bodyParser.json());
app.use(passport.initialize());

models.sequelize.authenticate().then(() => {
  console.log('Connected to SQL database:', process.env.DB_NAME);
}).catch((err) => {
  console.error('Unable to connect to SQL database:', process.env.DB_NAME, err);
});

app.use('/', routes);

if (process.env.NODE_ENV === 'development') {
  // create tables
  models.sequelize.sync();
  // devServer (catch all)
  require('./config/devServer')(app); // eslint-disable-line global-require
}

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
