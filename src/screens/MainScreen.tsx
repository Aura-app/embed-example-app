import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Alert, Image, Text, ScrollView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import CenterButton from '../components/CenterButton';
import { createCallout, signupCustomer } from '../api';
import * as Location from 'expo-location';
import Loader from '../components/Loader';

const MainScreen = ({ navigation, route }: { navigation: any, route: { params: { token: string } } }) => {
  const FINISH_URL = 'myapp://finish.com';
  const [customerId, setCustomerId] = useState('');
  const [email, setEmail] = useState('');
  const [siteName, setSiteName] = useState('');
  const [siteReferenceId, setSiteReferenceId] = useState('');
  const [customerReferenceId, setCustomerReferenceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeFlow, setActiveFlow] = useState<'dispatch' | 'signup'>('dispatch');

  const { token } = route.params;

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

  const handleCreateDispatch = async () => {
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
  };

  const handleSignup = async () => {
    if (!email || !siteName) {
      Alert.alert('Validation Error', 'Email and Site Name fields are mandatory');
      return;
    }
    setLoading(true)
    try {
      const dispatchURL = await signupCustomer(email, FINISH_URL, customerReferenceId, siteName, 
        siteReferenceId, token);
      navigation.navigate('Home', {dispatchURL});
    } catch (error) {
      console.error('Failed to fetch data on button click:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.container}>
          <Image source={require('../assets/icon.png')} style={styles.logo} />
          <View style={styles.infoContainer}>
            <Text style={styles.infoLabel}>Return URL</Text>
            <Text style={styles.infoValue}>{FINISH_URL}</Text>
          </View>
          
          
          <View style={styles.flow_selector}>
            <TouchableOpacity
              style={[styles.flow_button, activeFlow === 'dispatch' && styles.flow_button_active]}
              onPress={() => setActiveFlow('dispatch')}
            >
              <Text style={[styles.flow_button_text, activeFlow === 'dispatch' && styles.flow_button_text_active]}>Dispatch Experience</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.flow_button, activeFlow === 'signup' && styles.flow_button_active]}
              onPress={() => setActiveFlow('signup')}
            >
              <Text style={[styles.flow_button_text, activeFlow === 'signup' && styles.flow_button_text_active]}>Customer Signup</Text>
            </TouchableOpacity>
          </View>

          {activeFlow === 'dispatch' && (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <TextInput
                style={styles.input}
                placeholder="Enter Customer ID"
                value={customerId}
                onChangeText={(t) => setCustomerId(t.toLowerCase())}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <CenterButton 
                title={"Go to Dispatch"} 
                onPress={handleCreateDispatch} 
                style={[styles.button_theme, styles.buttonSpacing]} 
                textStyle={styles.text} 
              />
            </View>
          )}

          {activeFlow === 'signup' && (
            <View style={{ width: '100%', alignItems: 'center' }}>
              <TextInput
                style={styles.input}
                placeholder="Enter email"
                value={email}
                onChangeText={(t) => setEmail(t.toLowerCase())}
                autoCapitalize="none"
                autoCorrect={false}
              />
              
              <TextInput
                style={styles.input}
                placeholder="Enter Customer reference id (Optional)"
                value={customerReferenceId}
                onChangeText={(t) => setCustomerReferenceId(t.toLowerCase())}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <Text style={styles.label}>Site Details</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Site name"
                value={siteName}
                onChangeText={(t) => setSiteName(t.toLowerCase())}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter Site reference id (Optional)"
                value={siteReferenceId}
                onChangeText={(t) => setSiteReferenceId(t.toLowerCase())}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <CenterButton title="Customer Signup Flow" onPress={(handleSignup)} style={[styles.button_theme, styles.buttonSpacing]} textStyle={styles.text} />
            </View>
          )}
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
  infoContainer: {
    width: '80%',
    backgroundColor: '#f4f6f8',
    borderColor: '#d3dce6',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  infoLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  infoValue: {
    color: '#111',
    fontSize: 14,
    fontWeight: '600',
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
  
  flow_selector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  flow_button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  flow_button_active: {
    borderColor: '#2eb774',
    backgroundColor: '#dff6ea',
  },
  flow_button_text: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  flow_button_text_active: {
    color: '#2eb774',
    fontWeight: '700',
  },
});

export default MainScreen;
