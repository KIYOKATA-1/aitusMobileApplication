const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },    // Date of the lesson
    time: { type: String, required: true },  // Time of the lesson
    status: { type: String, required: true } // Attendance status
});

const GroupAttendanceSchema = new mongoose.Schema({
    group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    attendanceRecords: [AttendanceSchema]
});

const SubjectSchema = new mongoose.Schema({
    name: { type: String, required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    groups: [GroupAttendanceSchema],
    lessonDate: { type: Date },
    lessonTime: { type: String }
});

module.exports = mongoose.model('Subject', SubjectSchema);
