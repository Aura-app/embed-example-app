import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import CenterButton from '../components/CenterButton';
import { getToken } from '../api';

const MainScreen = ({ navigation }) => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');

  const handlePress = async () => {
    try {
        // const token = await getToken();
        // console.log('Token fetched on button click:', token);

      navigation.navigate('Home');
    } catch (error) {
      console.error('Failed to fetch token on button click:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Field 1"
        value={field1}
        onChangeText={setField1}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Field 2"
        value={field2}
        onChangeText={setField2}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Field 3"
        value={field3}
        onChangeText={setField3}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Field 4"
        value={field4}
        onChangeText={setField4}
      />
      <CenterButton title="Go to Dispatch" onPress={handlePress} style={styles.button_theme} textStyle={styles.text}/>
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