const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const db = {};

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    operatorsAliases: false,
  },
);

fs.readdirSync(__dirname)
  .filter(file => (file !== path.basename(__filename)) && (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = connection.import(path.join(__dirname, file));
    db[model.name] = model;
  });

db.connection = connection;
db.Sequelize = Sequelize;

module.exports = db;
