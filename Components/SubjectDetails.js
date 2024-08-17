import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, Button, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker'; // Обновленный импорт
import Header from '../Components/Header';

import { TMstyle } from '../TeacherStyles/teacherMain';

export default function SubjectDetails({ route }) {
  const { subject, userData } = route.params;
  const [lessonDate, setLessonDate] = useState(null);
  const [lessonTime, setLessonTime] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [majors, setMajors] = useState([]);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [students, setStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});

  useEffect(() => {
    // Fetch majors
    const fetchMajors = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3003/api/majors`);
        const data = await response.json();
        setMajors(data);
      } catch (error) {
        console.error('Error fetching majors:', error);
      }
    };

    fetchMajors();
  }, []);

  const fetchGroups = async (majorId) => {
    try {
      const response = await fetch(`http://10.0.2.2:3003/api/major/${majorId}/groups`);
      const data = await response.json();
      setGroups(data.groups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const fetchStudents = async (groupId) => {
    try {
      const response = await fetch(`http://10.0.2.2:3003/api/group/${groupId}/students`);
      const data = await response.json();
      setStudents(data.students);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const handleApply = async () => {
    try {
        const attendance = students.map(student => ({
            studentId: student._id,
            status: attendanceRecords[student._id] || 'absent'
        }));

        await fetch(`http://10.0.2.2:3003/api/subject/${subject._id}/attendance`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                groupId: selectedGroup, 
                attendance, 
                date: lessonDate, 
                time: lessonTime   
            })
        });

        alert('Schedule and Attendance recorded successfully');
    } catch (error) {
        console.error('Error saving schedule and attendance:', error);
    }
};



  return (
    <SafeAreaView style={TMstyle.container}>
      <Header userData={userData} />
      <View style={TMstyle.detailsContainer}>
        <Text style={TMstyle.majorDetailsTitle}>{subject.name} | Schedule & Attendance</Text>
        
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={TMstyle.buttonText}>
            {lessonDate ? lessonDate.toDateString() : 'Date'}
          </Text>
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={lessonDate || new Date()}
            mode="date"
            display="default"
            onChange={(event, date) => {
              setShowDatePicker(Platform.OS === 'ios'); // For iOS, keep the picker open
              setLessonDate(date || lessonDate);
            }}
          />
        )}

        <TouchableOpacity onPress={() => setShowTimePicker(true)}>
          <Text style={TMstyle.buttonText}>
            {lessonTime ? lessonTime.toLocaleTimeString() : 'Time'}
          </Text>
        </TouchableOpacity>
        
        {showTimePicker && (
          <DateTimePicker
            value={lessonTime || new Date()}
            mode="time"
            display="default"
            onChange={(event, time) => {
              setShowTimePicker(Platform.OS === 'ios'); // For iOS, keep the picker open
              setLessonTime(time || lessonTime);
            }}
          />
        )}

        <Picker
          selectedValue={selectedMajor}
          onValueChange={(itemValue) => { setSelectedMajor(itemValue); fetchGroups(itemValue); }}>
          <Picker.Item label="Select Major" value={null} />
          {majors.map((major) => (
            <Picker.Item key={major._id} label={major.name} value={major._id} />
          ))}
        </Picker>

        <Picker
          selectedValue={selectedGroup}
          onValueChange={(itemValue) => { setSelectedGroup(itemValue); fetchStudents(itemValue); }}>
          <Picker.Item label="Select Group" value={null} />
          {groups.map((group) => (
            <Picker.Item key={group._id} label={group.name} value={group._id} />
          ))}
        </Picker>

        <FlatList
          data={students}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View style={TMstyle.dateItem}>
              <Text style={TMstyle.itemText}>{item.name}</Text>
              <Picker
                selectedValue={attendanceRecords[item._id]}
                onValueChange={(value) => setAttendanceRecords({ ...attendanceRecords, [item._id]: value })}
              >
                <Picker.Item label="Present" value="present" />
                <Picker.Item label="Absent" value="absent" />
                <Picker.Item label="Late" value="late" />
              </Picker>
            </View>
          )}
        />
        
        <Button title="Apply" onPress={handleApply} />
      </View>
    </SafeAreaView>
  );
}
