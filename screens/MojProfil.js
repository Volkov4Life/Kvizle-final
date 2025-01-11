import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

export default function MojProfil({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.error('Vpišite se!');
        setLoading(false);
        return;
      }

      try {
        const userEmail = currentUser.email;
        const userQuery = query(
          collection(firestore, 'users'),
          where('email', '==', userEmail)
        );
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data();
          setUserData({
            maxStreak: userDoc.maxStreak || 0,
            stTock: userDoc.stTock || 0,
            email: userDoc.email || '',
            uporabniskoIme: userDoc.uporabniskoIme || '',
            WR: Math.round(userDoc.WR * 100)|| 0, 
            gamesPlayed: userDoc.gamesPlayed || 0, 
          });
        } else {
          console.error('Uporabnik ni bil najden.');
        }
      } catch (error) {
        console.error('Napaka pri fetchanju:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff6f61" />
        <Text style={styles.loadingText}>Nalaganje profila...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Podakov nismo našli!.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Moj Profil</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Uporabniško Ime:</Text>
        <Text style={styles.value}>{userData.uporabniskoIme}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{userData.email}</Text>

        <Text style={styles.label}>Max pravilni odgovori zapored:</Text>
        <Text style={styles.value}>{userData.maxStreak}</Text>

        <Text style={styles.label}>Točke:</Text>
        <Text style={styles.value}>{userData.stTock}</Text>

        <Text style={styles.label}>Točnost:</Text>
        <Text style={styles.value}>{userData.WR}%</Text>

        <Text style={styles.label}>Število igranih iger:</Text>
        <Text style={styles.value}>{userData.gamesPlayed}</Text>
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
    backgroundColor: 'rgb(127, 255, 212)',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 50,
  },
  card: {
    backgroundColor: 'rgb(255, 213, 128)',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 8,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 10,
  },
  value: {
    fontSize: 18,
    color: '#777',
    marginBottom: 10,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    color: '#d9534f',
  },
  backButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'rgb(255, 127, 80)',
    padding: 10,
    borderRadius: 8,
  },
});
