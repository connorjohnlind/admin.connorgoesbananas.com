require('./config/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const he = require('he');

// MongoDB
require('./db/mongoose');

// Express
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// SPA in production, but two dev servers in development
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

app.listen(port, () => console.log(`Server is up on port ${port}`));
