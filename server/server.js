const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('../db/database');
const User = require('../models/User');
const Subject = require('../models/Subject');
const Major = require('../models/Major');
const Group = require('../models/Group');

const app = express();
const PORT = process.env.PORT || 3003;

connectDB();

app.use(bodyParser.json());

const generateBarcode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

const initializeDatabase = async () => {
    try {
        // Создаем преподавателя
        let teacher = await User.findOne({ role: 'teacher', email: 'teacher@university.edu' });
        if (!teacher) {
            teacher = new User({
                name: 'Teacher One',
                email: 'teacher@university.edu',
                role: 'teacher',
                password: 'teacherpassword',
                barcode: generateBarcode(),
            });
            await teacher.save();
        }

        // Создаем специальности (majors)
        const majorsData = ['Mathematics', 'Physics', 'Engineering'];
        const majors = [];
        for (const majorName of majorsData) {
            let major = await Major.findOne({ name: majorName });
            if (!major) {
                major = new Major({ name: majorName, groups: [] });
                await major.save();
            }
            majors.push(major);
        }

        // Создаем группы и студентов для каждой специальности
        const groupNames = [['Group A1', 'Group A2'], ['Group B1', 'Group B2'], ['Group C1', 'Group C2']];
        const studentNames = [['Alice', 'Bob'], ['Charlie', 'David'], ['Eve', 'Frank'], ['Grace', 'Heidi'], ['Ivan', 'Judy'], ['Karl', 'Laura']];

        const allGroups = [];

        for (let i = 0; i < majors.length; i++) {
            const major = majors[i];
            for (let j = 0; j < groupNames[i].length; j++) {
                let group = await Group.findOne({ name: groupNames[i][j], major: major._id });
                if (!group) {
                    group = new Group({ name: groupNames[i][j], major: major._id, students: [] });
                    await group.save();
                    major.groups.push(group._id);
                    await major.save();
                }

                const studentBatch = studentNames[i * 2 + j];
                for (const studentName of studentBatch) {
                    const email = `${studentName.toLowerCase()}@${major.name.toLowerCase()}.edu`;
                    let student = await User.findOne({ email });
                    if (!student) {
                        student = new User({
                            name: studentName,
                            email: email,
                            role: 'student',
                            password: 'studentpassword',
                            barcode: generateBarcode(),
                            additionalData: {
                                course: '1st Year',
                                group: group._id,
                                major: major._id,
                            }
                        });
                        await student.save();
                        group.students.push(student._id);
                        await group.save();
                    }
                }

                // Добавляем текущую дату и время
                const currentDate = new Date();
                const formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                allGroups.push({
                    group: group._id,
                    date: currentDate,
                    time: formattedTime,
                    attendanceRecords: []
                });
            }
        }

        // Создаем предмет "Calculus 1" и привязываем его к преподавателю и группам
        let subject = await Subject.findOne({ name: 'Calculus 1' });
        if (!subject) {
            subject = new Subject({
                name: 'Calculus 1',
                teacher: teacher._id,
                groups: allGroups,
            });
            await subject.save();
        }

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

initializeDatabase();

// Маршрут для логина
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }).populate('additionalData.major');

        if (user && user.password === password) {
            res.json({ role: user.role });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Получение данных пользователя по email
app.get('/api/user/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).populate('additionalData.major');
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/user/:email/subjects', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).populate('additionalData.group').populate('additionalData.major');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const subjects = await Subject.find({
            'groups.group': user.additionalData.group._id
        }).populate('teacher', 'name');

        res.json(subjects);
    } catch (error) {
        console.error('Error fetching subjects:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Получение списка специальностей
app.get('/api/majors', async (req, res) => {
    try {
        const majors = await Major.find({});
        res.json(majors);
    } catch (error) {
        console.error('Error fetching majors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Получение групп по специальности
app.get('/api/major/:majorId/groups', async (req, res) => {
    try {
        const major = await Major.findById(req.params.majorId).populate('groups');
        if (!major) {
            return res.status(404).json({ error: 'Major not found' });
        }
        res.json({ groups: major.groups });
    } catch (error) {
        console.error('Error fetching groups for major:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Получение студентов по группе
app.get('/api/group/:groupId/students', async (req, res) => {
    try {
        const group = await Group.findById(req.params.groupId).populate('students');
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }
        res.json({ students: group.students });
    } catch (error) {
        console.error('Error fetching students for group:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Получение предметов, которые ведет преподаватель
app.get('/api/teacher/:teacherId/subjects', async (req, res) => {
    try {
        const subjects = await Subject.find({ teacher: req.params.teacherId })
            .populate('groups', 'name');

        if (!subjects || subjects.length === 0) {
            return res.status(404).json({ error: 'No subjects found for this teacher' });
        }

        res.json({ subjects });
    } catch (error) {
        console.error('Error fetching subjects for teacher:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Получение данных о предмете по ID
app.get('/api/subject/:subjectId', async (req, res) => {
    try {
        const subject = await Subject.findById(req.params.subjectId)
            .populate('groups', 'name')
            .populate('teacher', 'name');

        if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        res.json(subject);
    } catch (error) {
        console.error('Error fetching subject data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/subject/:subjectId/schedule', async (req, res) => {
    const { subjectId } = req.params;
    const { date, time, groupId, attendance } = req.body;

    console.log("Received date:", date);
    console.log("Received time:", time);

    try {
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        subject.lessonDate = date;
        subject.lessonTime = time;

        const groupAttendance = subject.groups.find(group => group.group.toString() === groupId);
        if (!groupAttendance) {
            return res.status(404).json({ error: 'Group not found in this subject' });
        }

        groupAttendance.attendanceRecords = attendance.map(record => ({
            student: record.studentId,
            date: date,
            time: time,
            status: record.status
        }));

        await subject.save();
        console.log("Saved subject with updated date and time:", subject);

        res.json({ message: 'Schedule and Attendance saved successfully' });
    } catch (error) {
        console.error('Error saving schedule and attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.post('/api/subject/:subjectId/attendance', async (req, res) => {
    const { subjectId } = req.params;
    const { groupId, attendance, date, time } = req.body;

    try {
        const subject = await Subject.findById(subjectId);
        if (!subject) {
            return res.status(404).json({ error: 'Subject not found' });
        }

        // Update the lesson date and time in the Subject schema
        subject.lessonDate = date;
        subject.lessonTime = time;

        const groupAttendance = subject.groups.find(group => group.group.toString() === groupId);
        if (!groupAttendance) {
            return res.status(404).json({ error: 'Group not found in this subject' });
        }

        // Clear previous attendance records for this group
        groupAttendance.attendanceRecords = [];

        // Add new attendance records
        for (const record of attendance) {
            const { studentId, status } = record;

            // Save the attendance record in the groupAttendance array
            groupAttendance.attendanceRecords.push({
                student: studentId,
                date: date,
                time: time,
                status: status,
            });

            // Save the attendance record in the student's User document
            await User.findByIdAndUpdate(studentId, {
                $push: {
                    'additionalData.attendance': { 
                        subject: subjectId, 
                        date: date,  // Save the date set by the teacher
                        time: time,  // Save the time set by the teacher
                        status: status 
                    }
                }
            });
        }

        // Save the updated subject document
        await subject.save();

        res.json({ message: 'Attendance recorded successfully' });
    } catch (error) {
        console.error('Error recording attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


app.get('/api/user/:userId/subject/:subjectId/attendance', async (req, res) => {
    const { userId, subjectId } = req.params;

    try {
        const user = await User.findById(userId, { 'additionalData.attendance': 1 }).populate('additionalData.attendance.subject', 'name');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const attendanceRecords = user.additionalData.attendance
            .filter(record => record.subject._id.toString() === subjectId)
            .map(record => ({
                _id: record._id,
                date: record.date, // Include date
                time: record.time, // Include time
                status: record.status,
                subject: record.subject
            }));

        res.json(attendanceRecords);
    } catch (error) {
        console.error('Error fetching attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});