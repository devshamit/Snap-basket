import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignupScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    if (!firstName || !lastName || !mobile || !email || !password) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    const newUser = { firstName, lastName, mobile, email: email.trim().toLowerCase(), password };
    await AsyncStorage.setItem('localUser', JSON.stringify(newUser));
    Alert.alert('Success', 'Signup successful. Please login.');
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Image
              source={require('../../assets/logo2.jpg')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.heading}>🔐 Create Your Account</Text>

            <TextInput
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              style={styles.input}
              placeholderTextColor="#8A2BE2"
            />
            <TextInput
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
              style={styles.input}
              placeholderTextColor="#8A2BE2"
            />
            <TextInput
              placeholder="Mobile"
              value={mobile}
              onChangeText={setMobile}
              style={styles.input}
              keyboardType="phone-pad"
              placeholderTextColor="#8A2BE2"
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
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
              <Button title="Sign Up" onPress={handleSignup} color="#9370DB" />
            </View>

            <Text onPress={() => navigation.navigate('Login')} style={styles.link}>
              Already have an account? <Text style={styles.linkBold}>Login</Text>
            </Text>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#E6E6FA', // lavender background across the full screen
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    padding: 24,
    minHeight: '100%',
    backgroundColor: '#E6E6FA', // lavender
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#4B0082',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D8BFD8',
    backgroundColor: '#F8F4FF',
    marginVertical: 8,
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

export default SignupScreen;
