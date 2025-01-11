import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Igre({ navigation }) {
  const [difficulty, setDifficulty] = useState('Easy');
  const [gamemode, setGamemode] = useState('Geografija');

  const navigateToKviz = (selectedGamemode) => {
    setGamemode(selectedGamemode);
    navigation.navigate('Kviz', { gamemode: selectedGamemode, difficulty });
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("MainScreen")}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      
      <Text style={styles.title}>Kvizle</Text>

      
      <View style={styles.difficultyContainer}>
        <TouchableOpacity
          style={[styles.difficultyButton, difficulty === 'Easy' && styles.selectedEasy]}
          onPress={() => setDifficulty('Easy')}
        >
          <Text style={styles.difficultyText}>Lahko</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.difficultyButton, difficulty === 'Medium' && styles.selectedMedium]}
          onPress={() => setDifficulty('Medium')}
        >
          <Text style={styles.difficultyText}>Srednje</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.difficultyButton, difficulty === 'Hard' && styles.selectedHard]}
          onPress={() => setDifficulty('Hard')}
        >
          <Text style={styles.difficultyText}>Težko</Text>
        </TouchableOpacity>
      </View>

      
      <TouchableOpacity style={styles.button} onPress={() => navigateToKviz('Geografija')}>
        <Text style={styles.buttonText}>Geografija</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.color2]} onPress={() => navigateToKviz('Zgodovina')}>
        <Text style={styles.buttonText}>Zgodovina</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.color3]} onPress={() => navigateToKviz('Mesano')}>
        <Text style={styles.buttonText}>Mešano</Text>
      </TouchableOpacity>
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'rgb(255, 127, 80)',
    fontFamily: 'fantasy',
    marginBottom: 40,
    marginTop: 50,
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginBottom: "30%"
  },
  difficultyButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  selectedEasy: {
    backgroundColor: 'green',
  },
  selectedMedium: {
    backgroundColor: 'yellow',
  },
  selectedHard: {
    backgroundColor: 'red',
  },
  difficultyText: {
    color: 'black',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'rgb(179,167,254)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 7,
    elevation: 20, // Android
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  color2: {
    backgroundColor: 'rgb(201,167,254)',
  },
  color3: {
    backgroundColor: 'rgb(223,167,254)',
  },
});
