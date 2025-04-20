'use strict';

const { Model, Sequelize, } = require('sequelize');
const sequelize = require('../../config/db.config');

const options = {
  comment: 'Registro de Usuarios',
  sequelize,
  modelName: 'usuario',
  tableName: 'usuarios',
};

const structure = {
  id: {
    allowNull: false,
    comment: 'Clave primaria.',
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    type: Sequelize.UUID,
  },
  nombre: {
    allowNull: false,
    comment: 'Nombre del usuario.',
    type: Sequelize.STRING(25),
  },
  apellido: {
    allowNull: true,
    comment: 'Apellido del usuario.',
    type: Sequelize.STRING(20),
  },
  telefono: {
    allowNull: true,
    comment: 'Apellido del usuario.',
    type: Sequelize.INTEGER(10),
  },
  email: {
    allowNull: false,
    comment: 'Correo electronico',
    type: Sequelize.STRING(50),
    unique: true,
  },
  password: {
    allowNull: true,
    comment: 'Password.',
    type: Sequelize.STRING(255),
  },
  recovery: {
    allowNull: true,
    comment: 'Recuperacion de Password.',
    type: Sequelize.STRING(50),
  },
  reset: {
    allowNull: true,
    comment: 'Estado de Password.',
    type: Sequelize.BOOLEAN,
  },
  fecha_registro: {
    allowNull: false,
    comment: 'Fecha de registro.',
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  genero: {
    allowNull: true,
    comment: 'Genero del usuario.',
    type: Sequelize.CHAR(1),
  },
  ubicacion: {
    allowNull: true,
    comment: 'Ubicacion del usuario.',
    type: Sequelize.STRING(25),
  },
  ocupacion: {
    allowNull: true,
    comment: 'Ocupacion del usuario.',
    type: Sequelize.STRING(2),
  },
  role: {
    allowNull: true,
    comment: 'Rol del usuario.',
    type: Sequelize.STRING(2),
  },
  plan: {
    allowNull: true,
    comment: 'Plan del usuario.',
    type: Sequelize.INTEGER(2),
  },
  createdAt: {
    allowNull: false,
    comment: 'Fecha de creación.',
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    comment: 'Fecha de Actualización.',
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
};

class Usuario extends Model {}

Usuario.init(structure, options);

module.exports = { class: Usuario, structure, options, };
