import React, { useState } from 'react';
import { Text, View, TextInput, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Lstyle } from '../styles/login';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signin({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3003/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User data:', data);

                // Fetch the full user data
                const userResponse = await fetch(`http://10.0.2.2:3003/api/user/${email}`);
                const userData = await userResponse.json();

                // Save user data to AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(userData));

                // Navigate to the appropriate screen with userData
                navigation.navigate(data.role === 'teacher' ? 'TeacherNav' : 'StudentNav', { userData });
            } else {
                Alert.alert('Login failed', 'Invalid email or password');
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <SafeAreaView style={Lstyle.loginContainer}>
            <View>
                <Image source={require('../assets/img/aitu.png')} style={Lstyle.ImageStyle} />
            </View>
            <View style={Lstyle.inputContainer}>
                <TextInput
                    style={Lstyle.TextInputStyle}
                    placeholder="EMAIL"
                    placeholderTextColor={'black'}
                    onChangeText={text => setEmail(text)}
                    value={email}
                />
                <TextInput
                    style={Lstyle.TextInputStyle}
                    placeholder="PASSWORD"
                    placeholderTextColor={'black'}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                    value={password}
                />
                <TouchableOpacity onPress={() => console.log("Forgot password was pressed")}>
                    <Text style={Lstyle.linkStyle}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={Lstyle.loginBtn} onPress={handleLogin}>
                <Text style={Lstyle.loginBtnText}>LOGIN</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}
