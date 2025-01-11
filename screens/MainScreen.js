import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert } from 'react-native';


export default function MainScreen({ navigation }) {
  

  const handleIgraj = () => {
    navigation.navigate('Igre');
  };

  const handleLestvice = () => {
    navigation.navigate('Lestvice');
  };

  const handleNastavitve = () => {
    console.log('Nastavitve pressed');
  };

  const handlePrijava = () => {
    navigation.navigate('Prijava'); // Prijava screen bo mal drugacen prly
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Kvizle</Text>
    
      <View style={styles.card}>
        <TouchableOpacity style={styles.button} onPress={handleIgraj}>
          <Text style={styles.buttonText}>Igraj</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLestvice}>
          <Text style={styles.buttonText}>Lestvice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNastavitve}>
          <Text style={styles.buttonText}>Nastavitve</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePrijava}>
          <Text style={styles.buttonText}>Prijava</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(127, 255, 212)',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'rgb(255, 127, 80)',
    fontFamily: 'fantasy',
    marginBottom: "50%",
    textAlign: 'center',
    marginTop: 50
  },
  card: {
    backgroundColor: 'rgb(254,216,192)',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow
  },
  button: {
    backgroundColor: 'rgb(255, 127, 80)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
