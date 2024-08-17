import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, Button } from 'react-native';
import Header from '../Components/Header';
import { Mstyle } from '../StudentStyles/studentMain';

export default function SubjectAttendanceDetails({ route, navigation }) {
  const { subject, userData } = route.params;
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const fetchAttendance = async () => {
        try {
            const response = await fetch(`http://10.0.2.2:3003/api/user/${userData._id}/subject/${subject._id}/attendance`);
            const data = await response.json();
            if (response.ok) {
                console.log("Fetched attendance data:", data); // Лог для проверки данных
                setAttendance(data);
            } else {
                console.error('Failed to fetch attendance:', data.error);
            }
        } catch (error) {
            console.error('Error fetching attendance:', error);
        }
    };

    fetchAttendance();
}, [subject._id, userData._id]);


  const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A'; // Если нет даты, возвращаем 'N/A'
    const date = new Date(dateString);
    if (isNaN(date)) return 'Invalid Date'; // Проверяем, валидна ли дата

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' });
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${month} ${hours}:${minutes}`; // Объединяем дату и время
  };


  return (
    <SafeAreaView style={Mstyle.container}>
      {/* Верхний Header */}
      <Header userData={userData} />
      <FlatList
    data={attendance}
    keyExtractor={item => item._id}
    renderItem={({ item }) => (
        <View style={Mstyle.attendanceItem}>
            <Text style={Mstyle.attendanceDataTxt}>
                {formatDateTime(item.date)} | {item.status}
            </Text>
        </View>
    )}
/>


      {/* Кнопка "Back" */}
      <View style={Mstyle.backButtonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>
    </SafeAreaView>
  );
}
