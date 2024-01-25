const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3001;

app.use(cors());
app.use(express.json());

const databasePath = path.resolve(__dirname, '../database');

const initializeDataFile = (fileName) => {
    const filePath = path.join(databasePath, `${fileName}.js`);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, `module.exports = [];`);
    }
};

initializeDataFile('evaluation');

let evaluationData = require('../database/evaluation');

app.get('/evaluation', (req, res) => {
    try {
        res.json(evaluationData);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: error.message });
    }
});

app.post('/evaluation', (req, res) => {
    try {
        const newEvaluation = {
            id: Date.now(),
            name: req.body.name,
            preguntas: req.body.preguntas
        };

        evaluationData.push(newEvaluation);
        fs.writeFileSync(path.join(databasePath, 'evaluation.js'), `module.exports = ${JSON.stringify(evaluationData, null, 2)};`);

        // Emitir evento al cliente WebSocket para notificar la adición de un nuevo Evaluationo
        io.emit('newEvaluation', newEvaluation);

        res.json(newEvaluation);
    } catch (error) {
        console.error('Error en POST /evaluation:', error.message);
        res.status(500).json({ error: error.message });
    }
});

io.on('connection', (socket) => {
    console.log('Cliente WebSocket conectado');

    socket.on('disconnect', () => {
        console.log('Cliente WebSocket desconectado');
    });
});

server.listen(PORT, () => {
    console.log(`Servidor backend en ejecución en http://localhost:${PORT}`);
});
