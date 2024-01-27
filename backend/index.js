import express from 'express';
import fs from 'fs';
const app = express();
const port = 4001;

app.get('/', (req, res) => {
    fs.readFile('../database/Evaluations.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Ocurrió un error al abrir el archivo:', err);
            return;
        }
        const evaluations = JSON.parse(data);
        //enviar data en json
        res.json(evaluations);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
