import React, { useRef } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { WebView } from 'react-native-webview';

const HomeScreen = ({ route, navigation }: { route: { params: { dispatchURL: string } }, navigation: any }) => {
  const { dispatchURL } = route.params;
  const webViewRef = useRef(null); // Reference to the WebView

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
          geolocationEnabled={true}
          ref={webViewRef}
          source={{ 
            uri: dispatchURL
          }} 
          onShouldStartLoadWithRequest={(request) => {
            if (request?.url?.toLocaleLowerCase()?.startsWith('https://finish.com')) {
              navigation.goBack();
              alert(request.url);
              return false; // Block loading the custom scheme
            }
            return true;
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
  backButton: {
    position: 'absolute',
    left: 12,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#00000088',
    borderRadius: 16,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HomeScreen;