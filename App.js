
import React, { useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import Signin from './Components/Signin';
import StudentNav from './Student/StudentNavigate';
import TeacherNav from './Teacher/TeacherNavigate';
import TeacherMain from './Teacher/TeacherMain';
import StudentMain from './Student/StudentMain';
import SubjectDetails from './Components/SubjectDetails';
import SubjectAttendanceDetails from './Components/SubjectAttendanceDetails';


const Stack = createStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    'noto-sans': require('./assets/Fonts/NotoSans-VariableFont_wdth,wght.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Signin} />
        <Stack.Screen name="StudentNav" component={StudentNav} />
        <Stack.Screen name="TeacherNav" component={TeacherNav} />
        <Stack.Screen name='StudentMain' component={StudentMain}/>
        <Stack.Screen name='SubjectDetails' component={SubjectDetails} />
        <Stack.Screen name='TeacherMain' component={TeacherMain} />
        <Stack.Screen name='SubjectAttendanceDetails' component={SubjectAttendanceDetails} />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}