const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

const GENERIC_ERROR = { message: 'Credenciales inválidas' };

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Verificar que no exista el usuario o email
    const existing = await User.findOne({ $or: [{ username }, { email }] });
    if (existing) {
      return res.status(400).json({ message: 'Usuario o email ya registrado' });
    }

    // 2. Hashear la contraseña
    const hash = await bcrypt.hash(password, 10);

    // 3. Crear el usuario
    const user = await User.create({ username, email, password: hash });

    // 4. Generar token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token });

  } catch (err) {
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json(GENERIC_ERROR);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json(GENERIC_ERROR);

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