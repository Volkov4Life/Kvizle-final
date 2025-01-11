import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { firestore } from '../firebaseConfig'; 
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore"; 

export default function Kviz({ route, navigation }) {
  const { gamemode, difficulty } = route.params;
  console.log(gamemode + " " + difficulty);
  
  const [question, setQuestion] = useState('Loading question...');
  const [answers, setAnswers] = useState(['Answer 1', 'Answer 2', 'Answer 3', 'Answer 4']);
  const [correctAnswer, setCorrectAnswer] = useState("ans");
  const [correctIndex, setCorrectIndex] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [lives, setLives] = useState(difficulty === "Hard" ? 1 : 3);
  const db = getFirestore(); 


  const nastaviVprasanje = async (vrstaVprasanja) => {
    let difficultyIgre = 0;
    switch (difficulty) {
      case "Easy":
        difficultyIgre = 1;
        break;
      case "Medium":
        difficultyIgre = 2;
        break;
      case "Hard":
        difficultyIgre = 3;
        break;
    }

    const izbranaVprasanjaCollection = collection(db, vrstaVprasanja);
    const q = query(izbranaVprasanjaCollection, where("difficulty", "==", difficultyIgre));
    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map(doc => doc.data());    
    if (documents.length > 0) {
      const randomDocument = documents[Math.floor(Math.random() * documents.length)];
      const rightAns = randomDocument.rightAns; // Store correct answer locally
      setCorrectAnswer(rightAns); // Update state for correct answer
      setQuestion(randomDocument.question);
      
      const napacniOdg = collection(db, vrstaVprasanja + "Wrong");
      const querySnapshotW = await getDocs(napacniOdg);
      const documentsW = querySnapshotW.docs.map(doc => doc.data());

      if (documentsW.length > 0) {
        const randomDocumentW = documentsW[0];
        const attributeKeys = Object.keys(randomDocumentW);

        const randomAttributes = [];
        for (let i = 0; i < 3; i++) {
          const randomIndex = Math.floor(Math.random() * attributeKeys.length);
          const randomKey = attributeKeys[randomIndex];
          randomAttributes.push(randomDocumentW[randomKey]);
          attributeKeys.splice(randomIndex, 1); // Avoid duplicates
        }

        // Insert the correct answer directly (not using state) into the randomAttributes array
        const randomIndex = Math.floor(Math.random() * 4); // Random position for the correct answer
        const updatedAnswers = [...randomAttributes];
        updatedAnswers.splice(randomIndex, 0, rightAns); // Use rightAns directly

        // Update the state with the new array and correct index
        setAnswers(updatedAnswers);
        setCorrectIndex(randomIndex);
      } else {
        console.log("No wrong answers found for the selected difficulty.");
      }
    } else {
      console.log("No questions found for the selected difficulty.");
    }
  };

  useEffect(() => {
    switch (gamemode) {
      case 'Geografija':
        nastaviVprasanje("geografska");
        break;
      case 'Zgodovina':
        // Handle history
        break;
      case 'Mesano':
        // Handle mixed mode
        break;
      default:
        console.log('Unknown gamemode selected');
        break;
    }
  }, [gamemode, difficulty]);
  
  const handlePress = (index) => {
    setSelectedAnswer(index);
  };

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
    if (selectedAnswer == null) {
      return;
    }
    if (selectedAnswer == correctIndex) {
      console.log("JAA ZMAGAL");
      setSelectedAnswer(null);
      nastaviVprasanje("geografska"); // Call the function again to load a new question
    } else {
      console.log("SI ZGUBU");
      setLives((prevLives) => prevLives - 1);
      if (lives - 1 <= 0) {
        console.log("Game over");
        navigation.navigate('Igre');
      }
    }
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
            onPress={() => handlePress(index)} // call the function here
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