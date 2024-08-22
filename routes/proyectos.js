const express = require('express');
const router = express.Router();

// Simulamos una base de datos en memoria
let proyectos = [];

// Endpoint para añadir un nuevo proyecto
router.post('/', (req, res) => {
    const { name, description, url } = req.body;

    // Validaciones básicas
    if (!name || !description || !url) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }

    const nuevoProyecto = {
        id: proyectos.length + 1,
        name,
        description,
        url
    };

    proyectos.push(nuevoProyecto);

    res.status(201).json(nuevoProyecto);
});

// Endpoint para obtener todos los proyectos
router.get('/', (req, res) => {
    res.json(proyectos);
});

module.exports = router;
