import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Geografija() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Geografija kviz!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
});
