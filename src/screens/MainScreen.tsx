import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Alert, Image } from 'react-native';
import CenterButton from '../components/CenterButton';
import { createCallout, getToken } from '../api';
import * as Location from 'expo-location';
import Loader from '../components/Loader';

const MainScreen = ({ navigation }) => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [loading, setLoading] = useState(false);

    // Request location permission
  const requestLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Location permission is required to proceed. Please enable it in your device settings.'
      );
    } else {
      console.log('Location permission granted');
    }
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const handlePress = async () => {
    if (!field1 || !field2 || !field3) {
      Alert.alert('Validation Error', 'All fields are required.');
      return;
    }

    setLoading(true);
    try {
      const token = await getToken(field1, field2);
      console.log('Token fetched on button click:', token);

      const dispatchURL = await createCallout(field3, token);
      console.log('callout data fetched:', dispatchURL);

      navigation.navigate('Home', {dispatchURL});
    } catch (error) {
      console.error('Failed to fetch data on button click:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
        
        <Image source={require('../assets/icon.png')} style={styles.logo} />
         
      <TextInput
        style={styles.input}
        placeholder="Enter Client ID"
        value={field1}
        onChangeText={setField1}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Client Secret"
        value={field2}
        onChangeText={setField2}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Customer ID"
        value={field3}
        onChangeText={setField3}
      />
      <CenterButton title="Go to Dispatch" onPress={handlePress} style={styles.button_theme} textStyle={styles.text}/>
      <Loader
        visible={loading} message='Processing....'></Loader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    textTransform: 'none'
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    resizeMode: 'contain',
    
  },
  button_theme : {
    textTransform: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    padding: 5,
    borderRadius: 2,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default MainScreen;
