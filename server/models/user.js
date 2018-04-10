const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('User', {
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

  Model.beforeSave(async (user) => {
    if (user.changed('password')) {
      let salt;
      let hash;
      try {
        salt = await bcrypt.genSalt(10);
        hash = await bcrypt.hash(user.password, salt);
      } catch (e) {
        throw new Error(e.message);
      }
      user.password = hash;
    }
  });

  Model.prototype.comparePassword = async (pw) => {
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

  Model.prototype.getJWT = () => {
    const secret = process.env.JWT_ENCRYPTION;
    const expiration = parseInt(process.env.JWT_EXPIRATION, 10);
    return `Bearer ${jwt.sign({ user_id: this.id }, secret, { expiresIn: expiration })}`;
  };

  return Model;
};
