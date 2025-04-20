const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());
/* const whiteList = [ 'http://www.titeams.cl' ];
app.use(cors({origin: whiteList})); */
app.use(cors())


app.get('/', (req, res) => {
    res.json('Bienvenido a la Api')
});

const PORT = process.env.PORT || 3200;

const server = app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});

// Capturar errores globales no manejados
process.on('uncaughtException', (error) => {
    logMessage('error', `Error no capturado: ${error.message}`);
    console.error(error);
    process.exit(1); // Opcional: reiniciar la aplicación
});

// Capturar promesas rechazadas no manejadas
process.on('unhandledRejection', (reason, promise) => {
    logMessage('error', `Promesa rechazada no manejada: ${reason}`);
    console.error(reason);
});

// Capturar errores del servidor
server.on('error', (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof PORT === 'string' ? `Pipe ${PORT}` : `Port ${PORT}`;
    switch (error.code) {
        case 'EACCES':
            //logMessage('error', `${bind} requiere privilegios elevados`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            //logMessage('error', `${bind} ya está en uso`);
            process.exit(1);
            break;
        default:
            //logMessage('error', `Error del servidor: ${error.message}`);
            throw error;
    }
});

module.exports = app