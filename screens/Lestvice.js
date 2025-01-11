import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Lestvice({ navigation }) {
  //Primer
  const leaderboardData = [
    { username: 'Player1', score: 100 },
    { username: 'Player2', score: 90 },
    { username: 'Player3', score: 80 },
    { username: 'Player4', score: 70 },
    { username: 'Player5', score: 60 },
    { username: 'Player6', score: 50 },
    { username: 'Player7', score: 40 },
    { username: 'Player8', score: 30 },
    { username: 'Player9', score: 20 },
    { username: 'Player10', score: 10 },
  ];

  const userPoints = 0; //Primer

  const renderItem = ({ item, index }) => {
    let rowStyle = styles.defaultRow;
    let textStyle = styles.defaultText;

    // top 3
    if (index === 0) {
      rowStyle = styles.goldRow;
      textStyle = styles.goldText;
    } else if (index === 1) {
      rowStyle = styles.silverRow;
      textStyle = styles.silverText;
    } else if (index === 2) {
      rowStyle = styles.bronzeRow;
      textStyle = styles.bronzeText;
    }

    return (
      <View style={[styles.row, rowStyle]}>
        <Text style={[styles.username, textStyle]}>
          {index + 1}. {item.username}
        </Text>
        <Text style={[styles.score, textStyle]}>{item.score}</Text>
        {index < 3 && (
          <FontAwesome
            name="star"
            size={20}
            color={index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'}
            style={styles.starIcon}
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Najboljši igralci</Text>

      <FlatList
        data={leaderboardData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />

      <View style={styles.userPointsContainer}>
        <Text style={styles.userPointsText}>Vaše točke: {userPoints}</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Nazaj</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(127, 255, 212)', // Light blue background
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4B0082',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
  defaultRow: {
    backgroundColor: '#fff',
  },
  goldRow: {
    backgroundColor: '#FFD700', // Gold
  },
  silverRow: {
    backgroundColor: '#C0C0C0', // Silver
  },
  bronzeRow: {
    backgroundColor: '#CD7F32', // Bronze
  },
  defaultText: {
    color: '#000',
  },
  goldText: {
    color: '#4B0082', // Contrasting text color
    fontWeight: 'bold',
  },
  silverText: {
    color: '#4B0082',
    fontWeight: 'bold',
  },
  bronzeText: {
    color: '#4B0082',
    fontWeight: 'bold',
  },
  username: {
    fontSize: 18,
  },
  score: {
    fontSize: 18,
  },
  starIcon: {
    marginLeft: 10,
  },
  userPointsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  userPointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4B0082',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgb(255, 127, 80)', // Tomato
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
