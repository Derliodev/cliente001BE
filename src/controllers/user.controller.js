const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user.model').class;
//const Mail = require('../models/emailModel');
//const logger = require('../utils/loggerUtil')
require('dotenv').config(); 

const generateToken = (user) => {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.register = async (req, res) => {
    const { nombre, apellido, email, password, telefono } = req.body;

    try {
        const existingEmail = await Usuario.findOne({ where: { email } });
        const existingPhone = await Usuario.findOne({ where: { telefono } });
        if (existingEmail) {
            return res.status(400).json({ message: `El correo ${email} ya se encuentra registrado!` });
        }
        if (existingPhone) {
            return res.status(400).json({ message: `El telefono ${telefono} ya se encuentra registrado!` });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await Usuario.create({ nombre, apellido, email, password: hashedPassword, telefono });

        res.status(201).json({ message: `${nombre} te has registrado exitosamente` });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
    }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      //logger.error(`Usuario ${email} no existe`);
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      //logger.error(`Contraseña de usuario ${email} incorrecta`);
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: user.id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        role: user.role,
        fechaRegistro: user.fecha_registro,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    //logger.info(`Login correcto: ${email}`);
    res.json({
      token,
      user: {
        nombre: user.nombre,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error al iniciar sesión', error });
  }
};

exports.getUsers = async (req, res) => {
    //const { email } = req.body;
    console.log('Peticion getUserts');
    try {
        const users = await Usuario.findAll();
        if (!users) {
            return res.status(400).json({ message: 'Sin Usuarios' });
        }
        res.json({ users });
    } catch (error) {
        res.status(500).json({ message: 'Error al listar usuarios', error });
    }
};