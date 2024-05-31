// src/screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { SERVER_IP, SERVER_PORT } from '@env';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`http://${SERVER_IP}:${SERVER_PORT}/api/auth/login`, {
                username,
                password
            });
            const { token } = response.data;
            Alert.alert('Login Successful'/*, `Token: ${token}`*/);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home', params: { token } }],
            });
        } catch (error) {
            Alert.alert('Login Failed', 'Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} disabled={loading} />
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.link}>Don't have an account? Register</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
    },
    header: {
      fontSize: 24,
      marginBottom: 24,
      textAlign: 'center',
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    link: {
      color: 'blue',
      marginTop: 16,
      textAlign: 'center',
    },
  });

export default LoginScreen;
