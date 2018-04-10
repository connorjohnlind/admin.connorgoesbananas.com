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
    res.json({ token });
  } catch (e) {
    res.status(400).send(e);
  }
};

const get = async (req, res) => {
  const { user } = req; // req.user returned from passport middleware
  res.json(user);
};

const remove = async (req, res) => {
  const { user } = req; // req.user returned from passport middleware

  try {
    await (user.destroy());
    res.json({ message: 'Deleted user.' });
  } catch (e) {
    res.status(400).send(e);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });
    user = await user.comparePassword(password);
    const token = await user.getJWT();
    res.json({ token });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.create = create;
module.exports.get = get;
module.exports.remove = remove;
module.exports.login = login;
