import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Header from '../Components/Header';
import { Mstyle } from '../StudentStyles/studentMain';

export default function StudentMain({ route, navigation }) {
  const [subjects, setSubjects] = useState([]);
  const { userData } = route.params;
  
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:3003/api/user/${userData.email}/subjects`);
        if (!response.ok) {
          console.error('Failed to fetch subjects:', response.statusText);
          return;
        }
        const data = await response.json();
        setSubjects(data);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };
  
    fetchSubjects();
  }, [userData.email]);
  

  const openAttendanceDetails = (subject) => {
    navigation.navigate('SubjectAttendanceDetails', { subject, userData });
  };

  return (
    <SafeAreaView style={Mstyle.container}>
      <Header userData={userData} />
      <FlatList
        data={subjects}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={Mstyle.subject}>
            <TouchableOpacity 
              onPress={() => openAttendanceDetails(item)} 
              style={Mstyle.subjectButton}
            >
              <Text style={Mstyle.subjectDataTxt}>
                {item.name}
              </Text>
            </TouchableOpacity>
            <Text style={Mstyle.teacherText}>
              {item.teacher.name}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
