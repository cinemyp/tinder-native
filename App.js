import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MessageStackNavigator from './navigations/MessageStackNavigator';
import { auth } from './firebase';
import { Text, View } from 'react-native';
import LoginRegStackNavigator from './navigations/LoginRegStackNavigator';

export default function App() {
  const [state, setState] = useState({ loaded: false });
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        setState((prevState) => ({
          ...prevState,
          loggedIn: false,
          loaded: true,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          loggedIn: true,
          loaded: true,
        }));
      }
    });
  }, []);

  if (!state.loaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text>Loading</Text>
      </View>
    );
  }
  if (!state.loggedIn) {
    return (
      <NavigationContainer>
        <LoginRegStackNavigator />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <MessageStackNavigator />
    </NavigationContainer>
  );
}
