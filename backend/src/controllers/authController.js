const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

// Mensaje genérico para no revelar cuál campo falló
const GENERIC_ERROR = { message: 'Credenciales inválidas' };

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. ¿Existe el usuario?
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json(GENERIC_ERROR);

    // 2. ¿La contraseña es correcta?
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json(GENERIC_ERROR);

    // 3. Generar token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token });

  } catch (err) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};