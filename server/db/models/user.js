const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define('User', {
    first: DataTypes.STRING,
    last: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: true,
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
      let err;
      let salt;
      let hash;

      [err, salt] = await bcrypt.genSalt(10);
      if (err) throw new Error(err.message);

      [err, hash] = await bcrypt.hash(user.password, salt);
      if (err) throw new Error(err.message);

      user.password = hash;
    }
  });

  return Model;
};
