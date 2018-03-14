require('./config/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const he = require('he');

// MongoDB
require('./db/mongoose');
const { Post } = require('./models/post');

// Express
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(express.static('client/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
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


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
