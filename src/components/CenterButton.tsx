import React from 'react';
import { View, Text, TouchableOpacity, GestureResponderEvent, StyleSheet } from 'react-native';
 
type CenterButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: Object;
  textStyle?: Object;
};
 
 
const CenterButton: React.FC<CenterButtonProps> = ({ title, onPress, style, textStyle }) => {
  return (
    <View style={[styles.center, style]}>
      <TouchableOpacity onPress={onPress}>
        <Text style={textStyle}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
 
export default CenterButton;