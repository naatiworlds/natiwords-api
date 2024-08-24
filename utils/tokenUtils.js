const jwt = require('jsonwebtoken');

exports.generateToken = (userId) => {
    return jwt.sign({ userId }, 'secret_key', { expiresIn: '1h' });
};
