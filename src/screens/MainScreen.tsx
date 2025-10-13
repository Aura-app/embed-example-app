import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Alert, Image, Text, ScrollView, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import CenterButton from '../components/CenterButton';
import { createCallout, getToken, signupCustomer } from '../api';
import * as Location from 'expo-location';
import Loader from '../components/Loader';

const MainScreen = ({ navigation }) => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [email, setEmail] = useState('');
  const [returnUrl, setReturnUrl] = useState('');
  const [siteName, setSiteName] = useState('');
  const [siteReferenceId, setSiteReferenceId] = useState('');
  const [customerReferenceId, setCustomerReferenceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [buttonState, setButtonState] = useState<'getToken' | 'goToDispatch'>('getToken');
  const [isWebView, setIsWebView] = useState(true);

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

  const handleButtonPress = async () => {
    if (buttonState === 'getToken') {
      if (!clientId || !clientSecret) {
        Alert.alert('Validation Error', 'Client ID and Client Secret are required.');
        return;
      }

      setLoading(true);
      try {
        const tokenVal = await getToken(clientId, clientSecret);
        setToken(tokenVal);
        setButtonState('goToDispatch'); // Change button state to "Go to Dispatch"
      } catch (error) {
        console.error('Failed to fetch token:', error);
      } finally {
        setLoading(false);
      }
    } else if (buttonState === 'goToDispatch') {
      if (!customerId) {
        Alert.alert('Validation Error', 'Customer ID is required.');
        return;
      }

      setLoading(true);
      try {
        const dispatchURL = await createCallout(customerId, token);
        navigation.navigate('Home', { dispatchURL });
      } catch (error) {
        console.error('Failed to create callout:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSignup = async () => {
    if (!email || !returnUrl || !siteName) {
      Alert.alert('Validation Error', 'Email, Return URL, and Site Name fields are mandatory');
      return;
    }
    console.log("isWebView: ", isWebView);
    setLoading(true)
    try {
      const dispatchURL = await signupCustomer(email, returnUrl, customerReferenceId, siteName, 
        siteReferenceId, token);
      navigation.navigate('Home', {dispatchURL});
    } catch (error) {
      console.error('Failed to fetch data on button click:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSwitch = (value: boolean) => setIsWebView(value);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Image source={require('../assets/icon.png')} style={styles.logo} />
          
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleText}>Web View</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#84eab3' }}
              thumbColor={isWebView ? '#2eb774' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isWebView}
            />
            <Text style={styles.toggleText}>Browser</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter Client ID"
            value={clientId}
            onChangeText={setClientId}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Client Secret"
            value={clientSecret}
            onChangeText={setClientSecret}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Customer ID"
            value={customerId}
            onChangeText={setCustomerId}
          />
        
          <CenterButton 
            title={buttonState === 'getToken' ? "Get Token" : "Go to Dispatch"} 
            onPress={handleButtonPress} 
            style={[styles.button_theme, styles.buttonSpacing]} 
            textStyle={styles.text} 
          />
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter return url"
            value={returnUrl}
            onChangeText={setReturnUrl}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Customer reference id (Optional)"
            value={customerReferenceId}
            onChangeText={setCustomerReferenceId}
          />

          <Text style={styles.label}>Site Details</Text>
          
          <TextInput
            style={styles.input}
            placeholder="Enter Site name"
            value={siteName}
            onChangeText={setSiteName}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Site reference id (Optional)"
            value={siteReferenceId}
            onChangeText={setSiteReferenceId}
          />
          <CenterButton title="Customer Signup Flow" onPress={(handleSignup)} style={[styles.button_theme, styles.buttonSpacing]} textStyle={styles.text} />
          <Loader
            visible={loading} message='Processing....'></Loader>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
    marginBottom: 10,
    resizeMode: 'contain',
    
  },
  button_theme : {
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38cb82',
    color: '#fff',
    padding: 5,
    borderRadius: 10,
    textAlign: 'center', // Ensure text is centered
  },
  buttonSpacing: {
    marginTop: 20,
    marginBottom: 20
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    alignSelf: 'flex-start', // Align the label to the left
    marginLeft: '10%', // Align with the text field
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10
  },
});

export default MainScreen;
