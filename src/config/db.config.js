const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT || 'mysql2',
  logging: process.env.SEQUELIZE_LOGGING === 'true' ? console.log : false
});

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos MySQL');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos MySQL:', err);
  });


module.exports = sequelize;