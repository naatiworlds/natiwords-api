const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], required: true },
    url: { type: String, required: true },
});

module.exports = mongoose.model('Project', projectSchema);
