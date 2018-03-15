require('./config/config');

const _ = require('lodash');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const he = require('he');

// MongoDB
require('./db/mongoose');
const { Post } = require('./models/post');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

// Express
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static('client/dist'));

app.post('/api/user', async (req, res) => {
  try {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    await user.save();
    const token = await user.generateAuthToken();
    res.header('x-auth', token).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.post('/api/post', async (req, res) => {
  const { title, html, urlTitle } = req.body;
  const post = new Post({
    title,
    urlTitle,
    html: he.encode(html),
    datePosted: Date.now(),
    lastModified: Date.now(),
  });

  try {
    await post.save();
    res.send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
