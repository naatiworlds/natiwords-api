const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/tokenUtils');

exports.register = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'El nombre de usuario y la contraseña son requeridos' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.json({ message: 'Usuario registrado!' });
    } catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        const token = generateToken(user._id);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Error en la autenticación' });
    }
};
