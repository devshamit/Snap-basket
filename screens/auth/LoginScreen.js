import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';
import logo from '../../assets/logo.png';


const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const savedUser = await AsyncStorage.getItem('localUser');
    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      if (parsed.email === email && parsed.password === password) {
        await AsyncStorage.setItem('access_token', 'local_dummy_token');
        login('local_dummy_token');
        return;
      }
    }

    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await res.json();
      if (data.token) {
        await AsyncStorage.setItem('access_token', data.token);
        login(data.token);
      } else {
        Alert.alert('Login Failed', 'Invalid credentials');
      }
    } catch (err) {
      Alert.alert('Error', 'Network error or API failure');
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.heading}>Hi there 👋, welcome back!</Text>
      <TextInput
        placeholder="Email or username"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonSpacing}>
        <Button title="Login" onPress={handleLogin} color="#007AFF" />
      </View>
      <Text onPress={() => navigation.navigate('Signup')} style={styles.link}>
        Don't have an account? <Text style={styles.linkBold}>Sign up</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f2f2f2',
    flex: 1,
    justifyContent: 'center',
  },
  logo:{
     width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  buttonSpacing: {
    marginTop: 20,
    marginBottom: 20,
  },
  link: {
    marginTop: 10,
    textAlign: 'center',
    color: '#555',
    fontSize: 15,
  },
  linkBold: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
});

export default LoginScreen;
