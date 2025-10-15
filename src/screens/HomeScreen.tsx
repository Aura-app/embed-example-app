import React, { useRef } from 'react';
import { StyleSheet, View, StatusBar, Alert } from 'react-native';
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
              try {
                const parsed = new URL(request.url);
                const status = (parsed.searchParams.get('status') || 'unknown').toLowerCase();
                const errorCode = parsed.searchParams.get('error_code') || undefined;
                const customerId = parsed.searchParams.get('customerId') || undefined;
                const siteId = parsed.searchParams.get('siteId') || undefined;
                const signupSessionId = parsed.searchParams.get('signupSessionId') || undefined;

                const lines: string[] = [];
                lines.push(`Status: ${status}`);
                if (status === 'failed' && errorCode) {
                  lines.push(`Error code: ${errorCode}`);
                }
                if (customerId) {
                  lines.push(`Customer ID: ${customerId}`);
                }
                if (siteId) {
                  lines.push(`Site ID: ${siteId}`);
                }
                if (signupSessionId) {
                  lines.push(`Signup Session ID: ${signupSessionId}`);
                }

                navigation.goBack();
                Alert.alert('Flow finished', lines.join('\n'));
              } catch (e) {
                navigation.goBack();
                Alert.alert('Flow finished', request.url);
              }
              return false; // Block loading the finish URL in WebView
            }
            return true;
          }}
          style={[
            styles.webview,
            {
              marginTop: 0,
              marginBottom: 0,
            }
          ]}
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