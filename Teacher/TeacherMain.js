import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Header from '../Components/Header';
import { TMstyle } from '../TeacherStyles/teacherMain';

export default function TeacherMain({ route, navigation }) {
  const { userData } = route.params || {};
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Fetch subjects for the teacher
    const fetchSubjects = async () => {
      try {
        const response = await axios.get(`http://10.0.2.2:3003/api/teacher/${userData._id}/subjects`);
        setSubjects(response.data.subjects);
      } catch (error) {
        console.error('Error fetching subjects:', error);
      }
    };

    fetchSubjects();
  }, [userData._id]);

  const handleSubjectPress = (subject) => {
    // Навигация на страницу SubjectDetails с передачей данных о предмете
    navigation.navigate('SubjectDetails', { subject, userData });
  };

  const renderSubjectItem = ({ item }) => (
    <TouchableOpacity 
      style={TMstyle.subjectItem} 
      onPress={() => handleSubjectPress(item)}
    >
      <Text style={TMstyle.subjectText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={TMstyle.container}>
      <Header userData={userData} />
    
      <View style={TMstyle.subjectsListContainer}>
        <FlatList
          data={subjects}
          renderItem={renderSubjectItem}
          keyExtractor={(item) => item._id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}
