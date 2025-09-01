import React from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  
  return (
    <>
      {/* Make status bar transparent on Android */}
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="transparent" 
        translucent={true} 
      />
      
      <View style={styles.container}>
        <WebView 
          source={{ 
            uri: 'https://dev-dispatch.aura.services/?sessionToken=U2FsdGVkX1%2FCLxu%2F3Pd2NNbIernv2I2fK3k7OGsI36RJLuKK2NHEt%2FNjIQc8s92ps%2BaUm%2BOK15KSAMrAGwxNNrYCurBb3n0%2FujJRCtHj1dQ%3D&calloutId=105199' 
          }} 
          style={[
            styles.webview,
            {
              // Only add top margin for the notch/dynamic island area
              marginTop: 0,
              // Don't add bottom margin to allow content behind home indicator
              marginBottom: 0,
            }
          ]}
          // Prevent WebView from automatically adjusting for safe areas
          automaticallyAdjustContentInsets={false}
          contentInset={{ top: 0, left: 0, bottom: 0, right: 0 }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  webview: {
    flex: 1,
  },
});

export default HomeScreen;