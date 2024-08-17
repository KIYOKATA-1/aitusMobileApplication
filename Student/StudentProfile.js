import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text, View, Image } from 'react-native';
import { PrStyle } from '../StudentStyles/studentProfile';
import IMAGES from '../assets/img';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function StudentProfile() {
  const [studentData, setStudentData] = useState(null);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedData = JSON.parse(userData);
          console.log('User data:', parsedData); // Логирование данных
          setStudentData(parsedData);
        } else {
          console.error('No user data found');
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
  
    fetchStudentData();
  }, []);
  

  if (!studentData) {
    return (
      <SafeAreaView style={PrStyle.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={PrStyle.container}>
      <StatusBar style="auto" />

      {/* Блок с аватаром и именем студента */}
      <View style={PrStyle.userDataC}>
        <Image source={IMAGES.AVATAR} style={PrStyle.avatar} />
        <View style={PrStyle.userData}>
          <Text style={PrStyle.username}>{studentData.name || 'No Name'}</Text>
          <Text style={PrStyle.barcode}>{`Barcode: ${studentData.barcode || 'No Barcode'}`}</Text>
        </View>
      </View>
      
      {/* Блок с академическими данными студента */}
      <View style={PrStyle.academData}>
        <View style={PrStyle.academRow}>
          <View style={PrStyle.academItem}>
            <Text style={PrStyle.academLabel}>Major</Text>
            <Text style={PrStyle.academValue}>{studentData.additionalData.major?.name || 'No Major'}</Text>
          </View>
        </View>
        <View style={PrStyle.academRow}>
          <View style={PrStyle.academItem}>
            <Text style={PrStyle.academLabel}>Course</Text>
            <Text style={PrStyle.academValue}>{studentData.additionalData.course || 'No Course'}</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
