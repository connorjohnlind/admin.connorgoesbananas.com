const _ = require('lodash');

const { Post } = require('../models/post');
const { User } = require('../models/user');

module.exports = (app) => {
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
      html, // encoded client side
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
};
