import React from 'react';
import { View, Button, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';

export default function MainScreen({ navigation }) {

    const handleGeografija = () => navigation.navigate("Geografija");

    const handleZgodovina = () => {
        
    }

    const handleSlovenci = () => {
        
    }

    const handleTODO = () => {
        
    }



  return (
    <SafeAreaView style={styles.container}>
      <Text style={{color: "rgb(255, 127, 80)", fontFamily: "fantasy", marginTop: "4%", fontWeight: "bold", fontSize: 50}} numberOfLines={1}>Kvizle</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleGeografija}>
        <Text style={styles.buttonText}>Geografija</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleZgodovina}>
        <Text style={styles.buttonText}>Zgodovina</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleSlovenci}>
        <Text style={styles.buttonText}>Slovenci</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleTODO}>
        <Text style={styles.buttonText}>TODO</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: "rgb(127, 255, 212)",
    color: "rgb(255, 127, 80)",
  },
  button: {
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: 'rgb(255, 127, 80)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
