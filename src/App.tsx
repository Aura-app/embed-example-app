import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from './navigation/MainNavigator';
import { LogBox } from 'react-native';

LogBox.ignoreAllLogs(); // Ignore all log notifications

console.log('App initialized');

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator />
    </NavigationContainer>
  );
}