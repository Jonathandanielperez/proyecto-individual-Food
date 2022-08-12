const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
    API_KEY0, API_KEY1, API_KEY2, API_KEY3, API_KEY4
} = process.env;

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
