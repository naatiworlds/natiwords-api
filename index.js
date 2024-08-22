const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const auth = require('./middleware/auth');
const cors = require('cors'); // Importa cors

dotenv.config();

const app = express();
app.use(cors()); // Habilita CORS para todas las rutas
app.use(express.json());

const proyectosRoute = require('./routes/proyectos');
app.use('/routes/proyectos', proyectosRoute);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
.catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('API está funcionando');
});

app.use('/api/auth', authRoutes);

// Ruta protegida para añadir datos
app.post('/api/data', auth, (req, res) => {
    const data = req.body.data; // manejar los datos que quieres guardar
    res.json({ message: 'Datos recibidos', data });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
