const { User } = require('./../models/user');

const authenticate = async (req, res, next) => { // eslint-disable-line consistent-return
  const token = req.header('x-auth');
  try {
    const user = await User.findByToken(token);
    if (!user) return Promise.reject();
    req.user = user;
    req.token = token;
  } catch (e) {
    res.status(401).send();
  }
  next();
};

module.exports = { authenticate };
