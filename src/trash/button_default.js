import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const MyButton = ({title, onPress, color}) => {
  return (
    <TouchableOpacity
      style={[styles.button, {backgroundColor: color}]}
      onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MyButton;
