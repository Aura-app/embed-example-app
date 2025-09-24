import React, { useRef, useState } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HomeScreen = ({ route }: { route: { params: { dispatchURL: string } } }) => {
  const insets = useSafeAreaInsets();
  const { dispatchURL } = route.params;
  const webViewRef = useRef(null); // Reference to the WebView
  const [canGoBack, setCanGoBack] = useState(false);

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
          ref={webViewRef}
          source={{ 
            uri: dispatchURL
          }} 
          onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)} // Track navigation state
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