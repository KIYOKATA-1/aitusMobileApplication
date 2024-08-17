const mongoose = require('mongoose');

const MajorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    groups: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true }], // List of groups
    subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
});

module.exports = mongoose.model('Major', MajorSchema);
