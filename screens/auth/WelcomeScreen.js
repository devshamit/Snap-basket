import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import logo from '../../assets/logo.png';

const WelcomeScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>🌟 BAZAARBUDDY</Text>
      <Text style={styles.subtitle}> Smart. Simple. Shopping.</Text>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo:{
     width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 30
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 12,
    lineHeight: 22,
  },
});
