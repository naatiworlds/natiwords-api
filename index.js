require('dotenv').config(); // Cargar las variables del archivo .env
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(express.json());

app.use(cors());

// Configura la conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI);


// Define el esquema y modelo para los proyectos
const projectSchema = new mongoose.Schema({
    name: String,
    description: String,
    technologies: [String],
    url: String,
});

const Project = mongoose.model('Project', projectSchema);

// Esquema y modelo para el usuario (administrador)
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const User = mongoose.model('User', userSchema);

// Ruta para registrar un nuevo usuario (solo para desarrollo)
// app.post('/register', async (req, res) => {
//     console.log(req.body); // Verifica qué datos están llegando

//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ error: 'El nombre de usuario y la contraseña son requeridos' });
//     }

//     try {
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const user = new User({ username, password: hashedPassword });
//         await user.save();

//         res.json({ message: 'Usuario registrado!' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error al registrar el usuario' });
//     }
// });



// Ruta de inicio de sesión para obtener un token
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
});

// Middleware de autenticación
const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token inválido' });
    }
};

// Ruta para agregar un proyecto (autenticado)
app.post('/projects', authenticate, async (req, res) => {
    const { name, description, technologies, url } = req.body;

    const project = new Project({ name, description, technologies, url });
    await project.save();

    res.json({ message: 'Proyecto agregado!' });
});

// Ruta para obtener todos los proyectos
app.get('/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});


// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});
