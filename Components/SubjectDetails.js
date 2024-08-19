import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, Button, TouchableOpacity, Modal, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Header from '../Components/Header';
import { Picker } from '@react-native-picker/picker';
import { SbStyle } from '../styles/subject';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Используем react-native-vector-icons для иконки

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
  const [isMajorModalVisible, setIsMajorModalVisible] = useState(false);
  const [isGroupModalVisible, setIsGroupModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false); 
  const navigation = useNavigation();

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

        setIsSuccessModalVisible(true); 

        setTimeout(() => {
            setIsSuccessModalVisible(false);
            navigation.navigate('TeacherMain', { userData });
        }, 2000); // 2 секунды
    } catch (error) {
        console.error('Error saving schedule and attendance:', error);
    }
  };

  return (
    <SafeAreaView style={SbStyle.container}>
      <Header userData={userData} />
      <View style={SbStyle.detailsContainer}>
        <Text style={SbStyle.majorDetailsTitle}>{subject.name}</Text>
        
        <View style={SbStyle.dateBtns}>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={SbStyle.dateBtn}>
            <Text style={SbStyle.buttonText}>
              {lessonDate ? lessonDate.toDateString() : 'Date'}
            </Text>
          </TouchableOpacity>
          
          {showDatePicker && (
            <DateTimePicker
              value={lessonDate || new Date()}
              mode="date"
              display="default"
              onChange={(event, date) => {
                setShowDatePicker(Platform.OS === 'ios'); 
                setLessonDate(date || lessonDate);
              }}
            />
          )}

          <TouchableOpacity onPress={() => setShowTimePicker(true)} style={SbStyle.dateBtn}>
            <Text style={SbStyle.buttonText}>
              {lessonTime ? lessonTime.toLocaleTimeString() : 'Time'}
            </Text>
          </TouchableOpacity>
          
          {showTimePicker && (
            <DateTimePicker
              value={lessonTime || new Date()}
              mode="time"
              display="default"
              onChange={(event, time) => {
                setShowTimePicker(Platform.OS === 'ios'); 
                setLessonTime(time || lessonTime);
              }}
            />
          )}
        </View>

        <TouchableOpacity
          style={SbStyle.touchableButton}
          onPress={() => setIsMajorModalVisible(true)}
        >
          <Text style={SbStyle.buttonText}>
            {selectedMajor ? majors.find((m) => m._id === selectedMajor)?.name : 'Select Major'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={SbStyle.touchableButton}
          onPress={() => setIsGroupModalVisible(true)}
          disabled={!selectedMajor}
        >
          <Text style={SbStyle.buttonText}>
            {selectedGroup ? groups.find((g) => g._id === selectedGroup)?.name : 'Select Group'}
          </Text>
        </TouchableOpacity>


        <FlatList
          data={students}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
      <View style={SbStyle.studentList}>
         <Text style={SbStyle.studentName}>{item.name}</Text>
        <Picker
          selectedValue={attendanceRecords[item._id]}
          onValueChange={(value) => setAttendanceRecords({ ...attendanceRecords, [item._id]: value })}
          style={{ height: 50, width: 150 }}
        >
          <Picker.Item label="Present" value="present" />
          <Picker.Item label="Absent" value="absent" />
          <Picker.Item label="Late" value="late" />
        </Picker>
    </View>
  )}
/>

        
        <Button title="Apply" onPress={handleApply} />

        <Modal
          visible={isMajorModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsMajorModalVisible(false)}
        >
          <View style={SbStyle.modalOverlay}>
            <View style={SbStyle.modalContainer}>
              <FlatList
                data={majors}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={SbStyle.modalItem}
                    onPress={() => {
                      setSelectedMajor(item._id);
                      setIsMajorModalVisible(false);
                      fetchGroups(item._id);
                    }}
                  >
                    <Text style={SbStyle.modalText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Modal for Group Selection */}
        <Modal
          visible={isGroupModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setIsGroupModalVisible(false)}
        >
          <View style={SbStyle.modalOverlay}>
            <View style={SbStyle.modalContainer}>
              <FlatList
                data={groups}
                keyExtractor={(item) => item._id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={SbStyle.modalItem}
                    onPress={() => {
                      setSelectedGroup(item._id);
                      setIsGroupModalVisible(false);
                      fetchStudents(item._id);
                    }}
                  >
                    <Text style={SbStyle.modalText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </Modal>

        {/* Success Modal */}
        <Modal
          visible={isSuccessModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsSuccessModalVisible(false)}
        >
          <View style={SbStyle.successModalOverlay}>
            <View style={SbStyle.successModalContainer}>
              <Icon name="check-circle" size={50} color="green" />
              <Text style={SbStyle.successModalText}>Done</Text>
            </View>
          </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}
