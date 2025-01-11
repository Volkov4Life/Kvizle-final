import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import Igre from './screens/Igre';
import Kviz from './screens/Kviz';
import Prijava from './screens/Prijava';
import Lestvice from './screens/Lestvice';
//import { firebase } from '@react-native-firebase/app';


const Stack = createStackNavigator();

export default function App() {

    /*useEffect(() => {
      if (!firebase.apps.length) {
        firebase.initializeApp();
      }
    }, []); */


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Igre" component={Igre} options={{headerShown: false}}/>
        <Stack.Screen name="Kviz" component={Kviz} options={{headerShown: false}}/>
        <Stack.Screen name="Prijava" component={Prijava}/>
        <Stack.Screen name="Lestvice" component={Lestvice} options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
