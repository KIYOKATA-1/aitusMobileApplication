import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList,TouchableOpacity,} from 'react-native';
import Header from '../Components/Header';
import { ATStyle } from '../styles/attendanceDetails';

export default function SubjectAttendanceDetails({ route, navigation }) {
  const { subject, userData } = route.params;
  const [attendance, setAttendance] = useState([]);

  const pointsCalculation = (status) => {
    if (status === 'present') return '2/2';
    if (status === 'late') return '1/2';
    return '0/2';
  };

  // Функция для форматирования даты и времени
  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A'; 
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date';

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${hours}:${minutes}`;
  };

  const calculateMaximumPossibleAttendance = () => {
    const totalLessons = 10;
    let possibleAttendance = 0;

    attendance.forEach(record => {
      if (record.status === 'present') possibleAttendance += 10;
      if (record.status === 'late') possibleAttendance += 5;
    });

    const lessonsLeft = totalLessons - attendance.length;
    possibleAttendance += lessonsLeft * 10; 

    return possibleAttendance;
  };

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3003/api/user/${userData._id}/subject/${subject._id}/attendance`);
        const data = await response.json();
        if (response.ok) {
          console.log("Полученные данные о посещаемости:", data);
          setAttendance(data);
        } else {
          console.error('Не удалось получить данные о посещаемости:', data.error);
        }
      } catch (error) {
        console.error('Ошибка при получении данных о посещаемости:', error);
      }
    };

    fetchAttendance();
  }, [subject._id, userData._id]);

  const maximumPossibleAttendance = calculateMaximumPossibleAttendance();

  return (
    <SafeAreaView style={ATStyle.container}>
      <Header userData={userData} />

      <View style={ATStyle.subjectData}>
        <Text style={ATStyle.name}>{subject.name}</Text>
        <Text style={ATStyle.teacher}>{subject.teacher.name}</Text>
      </View>

      {/* Заголовки для списка посещаемости */}
      <View style={ATStyle.main}>
        <Text style={ATStyle.mainText}>DATE</Text>
        <Text style={ATStyle.mainText}>STATUS</Text>
        <Text style={ATStyle.mainText}>POINTS</Text>
      </View>

      <FlatList
        data={attendance}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={ATStyle.attendanceRow}>
            <Text style={ATStyle.attendanceData}>{formatDateTime(item.date)}</Text>
            <Text style={ATStyle.attendanceData}>{item.status}</Text>
            <Text style={ATStyle.attendanceData}>{pointsCalculation(item.status)}</Text>
          </View>
        )}
      />

      {/* Максимальный возможный процент посещаемости */}
      <View style={ATStyle.maxAttendance}>
        <Text style={ATStyle.maxAttendanceText}>
          Maximum Possible Attendance: {maximumPossibleAttendance}%
        </Text>
      </View>

      <View>
        <TouchableOpacity onPress={() => navigation.goBack()} style={ATStyle.backBtn}>
           <Text style={ATStyle.backBtnText}>back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
