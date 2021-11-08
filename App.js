import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MessageStackNavigator from './navigations/MessageStackNavigator';
import { auth } from './firebase';
import { Text, View } from 'react-native';
import LoginRegStackNavigator from './navigations/LoginRegStackNavigator';
import { createStoreon } from 'storeon';
import { storeonParams } from './store';
import { StoreContext } from 'storeon/react';

const store = createStoreon(storeonParams);

export default function App() {
  const [state, setState] = useState({ loaded: false });
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
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

    return unsubscribe;
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
      <StoreContext.Provider value={store}>
        <NavigationContainer>
          <LoginRegStackNavigator />
        </NavigationContainer>
      </StoreContext.Provider>
    );
  }
  return (
    <StoreContext.Provider value={store}>
      <NavigationContainer>
        <MessageStackNavigator />
      </NavigationContainer>
    </StoreContext.Provider>
  );
}
