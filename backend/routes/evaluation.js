const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const databasePath = path.resolve(__dirname, '../../database');
const evaluationFilePath = path.join(databasePath, 'evaluation.js');

const getevaluation = () => {
    try {
        const evaluation = require(evaluationFilePath);
        return evaluation;
    } catch (error) {
        console.error('Error al obtener la evaluacion:', error.message);
        return [];
    }
};

const writeevaluation = (evaluation) => {
    try {
        fs.writeFileSync(evaluationFilePath, `module.exports = ${JSON.stringify(evaluation, null, 2)};`);
    } catch (error) {
        console.error('Error al escribir la evaluacion:', error.message);
    }
};

router.get('/', (req, res) => {
    const evaluation = getevaluation();
    res.json(evaluation);
});

router.post('/', (req, res) => {
    try {
        const newEvaluation = {
            id: Date.now(), // Generamos un ID único basado en la marca de tiempo
            name: req.body.name,
            preguntas: req.body.preguntas
        };

        const evaluation = getevaluation();
        evaluation.push(newEvaluation);

        writeevaluation(evaluation);

        res.json(newEvaluation);
    } catch (error) {
        console.error('Error en POST /evaluation:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
