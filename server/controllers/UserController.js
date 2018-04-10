const { User } = require('../models');

const create = async (req, res) => {
  const {
    first, last, email, password,
  } = req.body;

  if (!email) {
    res.json({ success: false, error: 'Please enter an email to register.' });
  } else if (!password) {
    res.json({ success: false, error: 'Please enter a password to register.' });
  }

  try {
    const user = await User.create({
      first, last, email, password,
    });
    const token = await user.getJWT();
    res.json({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.create = create;
