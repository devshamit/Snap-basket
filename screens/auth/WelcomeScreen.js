import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 5,
      tension: 80,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#E6E6FA', '#D8BFD8', '#E0BBE4']} // Lavender gradient
      style={styles.container}
    >
      <Animated.Image
        source={require('../../assets/logo2.jpg')}
        style={[styles.logo, { transform: [{ scale: scaleAnim }] }]}
        resizeMode="contain"
      />
      <Text style={styles.title}>🧺 SNAP-BASKET</Text>
      <Text style={styles.subtitle}>Quick Picks, Fast Flicks.</Text>
    </LinearGradient>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    borderRadius: 60,
    shadowColor: '#9370DB', // soft purple shadow
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#7B68EE', // medium slate purple
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#6A5ACD', // slate blue
    textAlign: 'center',
    paddingHorizontal: 12,
    lineHeight: 24,
    fontStyle: 'italic',
  },
});
