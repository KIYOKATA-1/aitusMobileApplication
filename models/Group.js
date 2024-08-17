const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    major: { type: mongoose.Schema.Types.ObjectId, ref: 'Major', required: true }, // Ссылка на специальность
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Ссылка на студентов
});

module.exports = mongoose.model('Group', GroupSchema);
