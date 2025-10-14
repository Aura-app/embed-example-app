import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TextInput, Alert, Image, Text } from 'react-native';
import CenterButton from '../components/CenterButton';
import { getToken } from '../api';
import * as SecureStore from 'expo-secure-store';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [clientId, setClientId] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [savedToken, setSavedToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const token = await SecureStore.getItemAsync('authToken');
        if (token) setSavedToken(token);
      } catch (e) {
        console.warn('Failed to load saved token');
      }
    })();
  }, []);

  const persistToken = async (token: string) => {
    try {
      await SecureStore.setItemAsync('authToken', token);
      setSavedToken(token);
    } catch (e) {
      console.warn('Failed to persist token');
    }
  };

  const clearPersistedToken = async () => {
    try {
      await SecureStore.deleteItemAsync('authToken');
      setSavedToken(null);
      Alert.alert('Cleared', 'Saved token has been cleared.');
    } catch (e) {
      console.warn('Failed to clear token');
    }
  };

  const handleGetToken = async () => {
    if (!clientId || !clientSecret) {
      Alert.alert('Validation Error', 'Client ID and Client Secret are required.');
      return;
    }

    setLoading(true);
    try {
      const token = await getToken(clientId, clientSecret);
      await persistToken(token);
      navigation.replace('Aura', { token });
    } catch (error) {
      console.error('Failed to fetch token:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/icon.png')} style={styles.logo} />
      <Text style={styles.note}>
        This screen is an example. In production, do not embed access keys in the app. 
        Keep them on your own backend and expose secure API endpoints instead.
      </Text>
      {savedToken && (
        <View style={styles.savedTokenContainer}>
          <Text style={styles.savedTokenText}>A saved token was found.</Text>
          <CenterButton
            title={loading ? 'Working...' : 'Use Saved Token'}
            onPress={() => navigation.replace('Aura', { token: savedToken })}
            style={[styles.button_theme, styles.buttonSpacing]}
            textStyle={styles.text}
          />
          <CenterButton
            title="Clear Saved Token"
            onPress={clearPersistedToken}
            style={[styles.button_theme, styles.buttonSpacing]}
            textStyle={styles.text}
          />
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Enter Client ID"
        value={clientId}
        onChangeText={(t) => setClientId(t.toLowerCase())}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Client Secret"
        value={clientSecret}
        onChangeText={(t) => setClientSecret(t.toLowerCase())}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <CenterButton
        title={loading ? 'Getting Token...' : 'Get Token'}
        onPress={handleGetToken}
        style={[styles.button_theme, styles.buttonSpacing]}
        textStyle={styles.text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
    resizeMode: 'contain',
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
  button_theme : {
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38cb82',
    color: '#fff',
    padding: 5,
    borderRadius: 10,
    textAlign: 'center',
  },
  buttonSpacing: {
    marginTop: 20,
    marginBottom: 20,
  },
  text: {
    color: '#fff',
    fontSize: 18,
  },
  note: {
    width: '80%',
    color: '#555',
    fontSize: 12,
    marginBottom: 10,
  },
  savedTokenContainer: {
    width: '80%',
    marginBottom: 10,
    alignItems: 'center',
  },
  savedTokenText: {
    color: '#333',
    fontSize: 12,
    marginBottom: 4,
  },
});

export default LoginScreen;


