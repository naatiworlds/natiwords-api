require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Middleware
const corsOptions = {
    origin: 'https://ciendias-web.onrender.com', // Origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Encabezados permitidos
    credentials: true // Permitir el uso de cookies y autenticación
  };

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});



// require('dotenv').config(); // Cargar las variables del archivo .env
// const express = require('express');
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const bodyParser = require('body-parser');
// const cors = require('cors');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.json());

// // Configura la conexión a MongoDB
// mongoose.connect(process.env.MONGODB_URI)
// .then(() => {
//     console.log('Conectado a MongoDB');
// })
// .catch(err => {
//     console.error('Error al conectar a MongoDB:', err);
// });

// // Define el esquema y modelo para los proyectos
// const projectSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     technologies: { type: [String], required: true },
//     url: { type: String, required: true },
// });

// const Project = mongoose.model('Project', projectSchema);

// // Esquema y modelo para el usuario (administrador)
// const userSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// // Ruta para registrar un nuevo usuario (solo para desarrollo)
// app.post('/register', async (req, res) => {
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

// // Ruta de inicio de sesión para obtener un token
// app.post('/login', async (req, res) => {
//     const { username, password } = req.body;

//     const user = await User.findOne({ username });
//     if (!user) {
//         return res.status(400).json({ error: 'Usuario no encontrado' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//         return res.status(400).json({ error: 'Contraseña incorrecta' });
//     }

//     const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });
//     res.json({ token });
// });

// // Middleware de autenticación
// const authenticate = (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//         return res.status(401).json({ error: 'Acceso denegado' });
//     }

//     try {
//         const decoded = jwt.verify(token, 'secret_key');
//         req.user = decoded;
//         next();
//     } catch (err) {
//         res.status(401).json({ error: 'Token inválido' });
//     }
// };

// // Ruta para agregar un proyecto (autenticado)
// app.post('/projects', authenticate, async (req, res) => {
//     const { name, description, technologies, url } = req.body;

//     if (!name || !description || !technologies || !url) {
//         return res.status(400).json({ error: 'Todos los campos son requeridos' });
//     }

//     try {
//         const project = new Project({ name, description, technologies, url });
//         await project.save();

//         res.json({ message: 'Proyecto agregado!' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error al agregar el proyecto' });
//     }
// });

// // Ruta para obtener todos los proyectos
// app.get('/projects', async (req, res) => {
//     try {
//         const { page = 1, limit = 10 } = req.query; // Parámetros de consulta para paginación
//         const projects = await Project.find()
//             .skip((page - 1) * limit)
//             .limit(Number(limit));
//         res.json(projects);
//     } catch (error) {
//         console.error('Error al obtener proyectos:', error);
//         res.status(500).json({ error: 'Error al obtener proyectos' });
//     }
// });

// // Iniciar el servidor
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Servidor corriendo en http://localhost:${PORT}`);
// });
