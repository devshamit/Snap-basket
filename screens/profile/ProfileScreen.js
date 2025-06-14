import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../../context/ThemeContext';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const { isDarkMode, setIsDarkMode } = useContext(ThemeContext);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const savedName = await AsyncStorage.getItem('profile_name');
      const savedImage = await AsyncStorage.getItem('profile_image');
      if (savedName) setName(savedName);
      if (savedImage) setImageUri(savedImage);
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('profile_name', name);
  }, [name]);

  const handleLogout = () => {
    Alert.alert('Logged out', 'You have been successfully logged out.', [
      {
        text: 'OK',
        onPress: () => {
          logout();
        },
      },
    ]);
  };

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission required!');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets[0]?.uri) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      await AsyncStorage.setItem('profile_image', uri);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#222' : '#fff' },
      ]}>
      <TouchableOpacity onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={{ color: '#888' }}>Pick Image</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        placeholder="Your Name"
        style={[
          styles.input,
          {
            color: isDarkMode ? '#fff' : '#000',
            borderBottomColor: isDarkMode ? '#888' : '#ccc',
          },
        ]}
        placeholderTextColor={isDarkMode ? '#aaa' : '#888'}
        value={name}
        onChangeText={setName}
      />

      <View style={styles.row}>
        <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
      </View>

      <Button title="Logout" color="red" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  imagePlaceholder: {
    height: 120,
    width: 120,
    borderRadius: 60,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    width: '80%',
    fontSize: 18,
    marginVertical: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    justifyContent: 'space-between',
    width: '60%',
  },
});

export default ProfileScreen;
