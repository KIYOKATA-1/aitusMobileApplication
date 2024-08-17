const mongoose = require('mongoose');

const StudentAttendanceSchema = new mongoose.Schema({
    subject: { type: mongoose.Schema.Types.ObjectId, ref: 'Subject', required: true },
    date: { type: Date, required: true },    // Date of the lesson
    time: { type: String, required: true },  // Time of the lesson
    status: { type: String, required: true } // Attendance status
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    barcode: { type: String, required: true },
    additionalData: {
        course: String,
        group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }, 
        major: { type: mongoose.Schema.Types.ObjectId, ref: 'Major' }, 
        attendance: [StudentAttendanceSchema] 
    },
});

module.exports = mongoose.model('User', UserSchema);
