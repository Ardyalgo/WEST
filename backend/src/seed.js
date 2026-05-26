require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');
const User     = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const hash = await bcrypt.hash('password123', 10);
  await User.create({
    username: 'testuser',
    email:    'test@test.com',
    password: hash
  });
  console.log('✅ Usuario de prueba creado');
  process.exit();
}).catch(err => {
  console.error('❌ Error:', err.message);
  process.exit(1);
});