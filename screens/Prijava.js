import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, firestore } from '../firebaseConfig'; // Make sure firestore is imported from firebaseConfig
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // Firestore methods

export default function Prijava({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [uporabniskoIme, setUporabniskoIme] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Napaka', 'Izpolni oboje.');
      return;
    }
    console.log('Email:', email);
    console.log('Password:', password);

    const testAuth = async () => {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email, 
          password
        );
        console.log("User signed in successfully:", userCredential.user);
        Alert.alert("Success", `User signed in: ${userCredential.user.email}`);
      } catch (error) {
        console.error("Error during authentication:", error.message);
        Alert.alert("Error", error.message);
      }
    };

    testAuth();

    navigation.navigate('MainScreen');
  };

  const handleSignIn = () => {
    if (!email || !password || !uporabniskoIme) {
      Alert.alert('Napaka', 'Izpolni vse podatke.');
      return;
    }
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Uporabniško ime:', uporabniskoIme);

    const testAuth = async () => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email, 
          password
        );
        console.log("User created successfully:", userCredential.user);

        // Now write the user's email and uporabniskoIme to Firestore
        const userRef = doc(firestore, 'users', userCredential.user.uid); // Using user uid as document ID
        await setDoc(userRef, {
          email: userCredential.user.email,
          uporabniskoIme: uporabniskoIme
        });
        console.log('User data saved to Firestore');
        
        Alert.alert("Success", `User created and data saved: ${userCredential.user.email}`);
      } catch (error) {
        console.error("Error during authentication:", error.message);
        Alert.alert("Error", error.message);
      }
    };

    testAuth();

    navigation.navigate('MainScreen');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pozdravljeni!</Text>
      <Text style={styles.subtitle}>Vpišite se</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Geslo"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Uporabniško ime"
        placeholderTextColor="#888"
        value={uporabniskoIme}
        onChangeText={setUporabniskoIme}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Vpis</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
        <Text style={styles.loginButtonText}>Nov Račun</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => Alert.alert('Pozabljeno geslo?', 'Nastavitev novega gesla pride kmalu')}>
        <Text style={styles.forgotPasswordText}>Pozabljeno geslo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: "-50%",
  },
  subtitle: {
    fontSize: 18,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#2a2a2a',
    color: '#fff',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
    borderColor: '#444',
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPasswordText: {
    color: '#aaa',
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
