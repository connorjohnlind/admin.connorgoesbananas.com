require('./config/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

// MongoDB
require('./db/mongoose');

// Express
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static('client/dist'));

require('./routes/authRoutes')(app);
require('./routes/apiRoutes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
