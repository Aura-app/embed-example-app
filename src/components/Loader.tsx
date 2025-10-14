import React from "react";
import { View, ActivityIndicator, StyleSheet, Modal, Text } from "react-native";

const Loader = ({ visible, message }: { visible: boolean; message?: string }) => {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.container}>
        <View style={styles.loaderBox}>
          <ActivityIndicator size="large" color="#007AFF" />
          {message ? <Text style={styles.message}>{message}</Text> : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderBox: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
});

export default Loader;
 