const Usuario = require('../models/Usuario');

const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, contraseña } = req.body;

    
    if (!nombre || !email || !contraseña) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
    }

    const usuarioExistente = await Usuario.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El correo electrónico ya está en uso' });
    }

    
    const nuevoUsuario = await Usuario.create({
      nombre,
      email,
      contraseña,
    });

    res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  crearUsuario,
};
