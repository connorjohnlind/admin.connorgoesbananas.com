const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email invalid.',
        },
      },
    },
    password: DataTypes.STRING,
  });

  User.beforeSave(async (user) => {
    if (user.changed('password')) {
      let salt;
      let hash;
      try {
        salt = await bcrypt.genSalt(10);
        hash = await bcrypt.hash(user.password, salt);
      } catch (e) {
        throw new Error(e.message);
      }
      user.password = hash; // eslint-disable-line no-param-reassign
    }
  });

  User.findByToken = async function findByToken(token) {
    let user;
    try {
      const decoded = jwt.verify(token, process.env.JWT_ENCRYPTION);
      user = await this.findById(decoded.user_id);
    } catch (e) {
      throw new Error(e.message);
    }
    if (user) return user;
    return null;
  };

  User.prototype.comparePassword = async function comparePassword(pw) {
    if (!this.password) throw new Error('Password not set');
    let pass;
    try {
      pass = await bcrypt.compare(pw, this.password);
      if (!pass) throw new Error('Invalid passowrd');
    } catch (e) {
      throw new Error(e.message);
    }
    return this;
  };

  User.prototype.getJWT = async function getJWT() {
    const secret = process.env.JWT_ENCRYPTION;
    const expiration = parseInt(process.env.JWT_EXPIRATION, 10);
    return `Bearer ${jwt.sign({ user_id: this.id }, secret, { expiresIn: expiration })}`;
  };

  return User;
};
