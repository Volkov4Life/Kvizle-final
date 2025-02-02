import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { collection, getDocs, query, orderBy, limit, where } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { getAuth } from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Lestvice({ navigation }) {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const [userPoints, setUserPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const q = query(collection(firestore, 'users'), orderBy('stTock', 'desc'), limit(10));
        const querySnapshot = await getDocs(q);

        const data = [];
        querySnapshot.forEach((doc) => {
          const { uporabniskoIme, stTock, WR } = doc.data();
          data.push({
            username: uporabniskoIme || '',
            score: stTock || 0,
            winRate: Math.round(WR * 100)|| 0,
          });
        });

        // Ensure the leaderboard has exactly 10 entries
        while (data.length < 10) {
          data.push({ username: '', score: 0, winRate: 0 });
        }

        setLeaderboardData(data);
      } catch (error) {
        console.error('Napaka z lestvico:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    const fetchUserPoints = async () => {
      if (currentUser) {
        try {
          const usersRef = collection(firestore, 'users');
          const q = query(usersRef, where('email', '==', currentUser.email));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            setUserPoints(userData.stTock || 0);
          }
        } catch (error) {
          console.error('Error fetching user points:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserPoints();
  }, [currentUser]);

  const renderItem = ({ item, index }) => {
    let rowStyle = styles.defaultRow;
    let textStyle = styles.defaultText;

    // Highlight the top 3 players
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
        <Text style={[styles.score, textStyle]}>Točke: {item.score}</Text>
        <Text style={[styles.score, textStyle]}>Zmage: {item.winRate}%</Text>
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
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
    fontSize: 16,
    marginHorizontal: 5,
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
    backgroundColor: 'rgb(255, 127, 80)',
    padding: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
