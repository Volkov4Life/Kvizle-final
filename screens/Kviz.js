import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Kviz({ route, navigation }) {
  const { gamemode, difficulty } = route.params;

  // State variables
  const [question, setQuestion] = useState('Loading question...');
  const [answers, setAnswers] = useState(['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4']);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lives, setLives] = useState(difficulty === 'Hard' ? 1 : 3);


  const handleEndQuiz = () => {
    Alert.alert('Končaj kviz', 'Ali želite prekiniti kviz?', [
      { text: 'Ne', style: 'cancel' },
      {
        text: 'Da',
        onPress: () => navigation.navigate('Igre'),
      },
    ]);
  };

  const handleSubmitAnswer = () => {
    if(selectedAnswer == null){
        return;
    }
    console.log('Submitted answer:', selectedAnswer);
    // Prever odgovor in naloudi nov vprasanje

    setSelectedAnswer(null);
    setQuestion('New question...'); // Loadat se bojo mogl dinamicno
    setAnswers(['1', '2', '3', '4']);
    
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <TouchableOpacity style={[styles.endQuizButton, styles.martop]} onPress={handleEndQuiz}>
        <Text style={styles.endQuizText}>Končaj</Text>
      </TouchableOpacity>

      
      <View style={[styles.livesContainer, styles.martop]}>
        {Array.from({ length: lives }).map((_, index) => (
          <Ionicons key={index} name="heart" size={24} color="red" />
        ))}
      </View>

      
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{question}</Text>
      </View>

      
      <View style={styles.answersContainer}>
        {answers.map((answer, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.answerButton,
              selectedAnswer === index && styles.selectedAnswerButton,
            ]}
            onPress={() => setSelectedAnswer(index)}
          >
            <Text style={styles.answerText}>{answer}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitAnswer}>
        <Text style={styles.submitButtonText}>Potrdi</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(127, 255, 212)',
    padding: 20,
  },
  martop: {
    marginTop: "5%"
  },
  endQuizButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  endQuizText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  livesContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    gap: 5,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  answersContainer: {
    flex: 2,
    justifyContent: 'center',
  },
  answerButton: {
    backgroundColor: 'rgb(179,167,254)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.7,
    shadowRadius: 7,
    elevation: 5,
  },
  selectedAnswerButton: {
    backgroundColor: 'rgb(127, 255, 80)',
  },
  answerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgb(255, 127, 80)',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
