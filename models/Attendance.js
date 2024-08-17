const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: { type: String, required: true }
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
