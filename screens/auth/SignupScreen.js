import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import logo from '../../assets/logo.png';


const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Email and Password required");
      return;
    }

    const newUser = { email, password };
    await AsyncStorage.setItem('localUser', JSON.stringify(newUser));

    Alert.alert("Success", "Signup successful. Please login.");
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.heading}>🔐 Create Your Account</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <View style={styles.buttonSpacing}>
        <Button title="Sign Up" onPress={handleSignup} color="#007AFF" />
      </View>
      <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
        Already have an account? <Text style={styles.linkBold}>Login</Text>
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

export default SignupScreen;
