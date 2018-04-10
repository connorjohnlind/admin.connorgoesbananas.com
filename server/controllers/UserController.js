const { User } = require('../models');

const create = async (req, res) => {
  console.log('at controller');
  res.setHeader('Content-Type', 'application/json');
  const {
    first,
    last,
    email,
    password,
  } = req.body;

  if (!email) {
    return res.json({ success: false, error: 'Please enter an email to register.' });
  } else if (!password) {
    return res.json({ success: false, error: 'Please enter a password to register.' });
  }

  try {
    const user = await User.create({ first, last, email, password });
    const token = await user.getJWT();
    return res.json({ user, token });
  } catch (e) {
    return res.status(400).send(e);
  }
};

module.exports.create = create;
