import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { SERVER_IP, SERVER_PORT } from '@env'

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await axios.post(`http://${SERVER_IP}:${SERVER_PORT}/api/auth/register`, {
        username,
        password,
      });
      Alert.alert('Registration Successful', 'You can now log in');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Registration Failed', 'Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Register" onPress={handleRegister} />
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
});

export default RegisterScreen;
