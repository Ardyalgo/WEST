require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middleware para leer JSON en los requests
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Conexión a MongoDB y arranque del servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado');
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor corriendo en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:', err.message);
    process.exit(1);
  });