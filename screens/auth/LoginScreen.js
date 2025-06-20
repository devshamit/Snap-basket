import React, { useState, useContext } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../context/AuthContext';

const { height } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('localUser');

      if (savedUser) {
        const parsed = JSON.parse(savedUser);

        if (parsed.email === email.trim().toLowerCase() && parsed.password === password) {
          await AsyncStorage.setItem('access_token', 'local_dummy_token');
          login('local_dummy_token', 'local_dummy_refresh_token');
          return;
        } else {
          Alert.alert('Login Failed', 'Incorrect email or password.');
          return;
        }
      }

      Alert.alert('Login Failed', 'No user found. Please sign up first.');
    } catch (err) {
      Alert.alert('Error', 'Something went wrong. Try again.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Image source={require('../../assets/logo2.jpg')} style={styles.logo} resizeMode="contain" />
            <Text style={styles.heading}>Hi there 👋, welcome back!</Text>

            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor="#8A2BE2"
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
              placeholderTextColor="#8A2BE2"
            />

            <View style={styles.buttonSpacing}>
              <Button title="Login" onPress={handleLogin} color="#9370DB" />
            </View>

            <Text onPress={() => navigation.navigate('Signup')} style={styles.link}>
              Don't have an account? <Text style={styles.linkBold}>Sign up</Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#E6E6FA', // full screen background
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    height: height,
  },
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#E6E6FA',
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#4B0082',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D8BFD8',
    backgroundColor: '#F8F4FF',
    marginVertical: 10,
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    color: '#4B0082',
  },
  buttonSpacing: {
    marginTop: 20,
    marginBottom: 20,
  },
  link: {
    marginTop: 10,
    textAlign: 'center',
    color: '#6A5ACD',
    fontSize: 15,
  },
  linkBold: {
    fontWeight: 'bold',
    color: '#8A2BE2',
  },
});

export default LoginScreen;
