const Project = require('../models/Project');

exports.createProject = async (req, res) => {
    const { name, description, technologies, url } = req.body;

    if (!name || !description || !technologies || !url) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    try {
        const project = new Project({ name, description, technologies, url });
        await project.save();

        res.json({ message: 'Proyecto agregado!' });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el proyecto' });
    }
};

exports.getProjects = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const projects = await Project.find()
            .skip((page - 1) * limit)
            .limit(Number(limit));
        res.json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener proyectos' });
    }
};
