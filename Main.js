import React, { useEffect, useState } from 'react';
import MessageStackNavigator from './navigations/MessageStackNavigator';
import { auth } from './firebase';
import { Text, View } from 'react-native';
import LoginRegStackNavigator from './navigations/LoginRegStackNavigator';
import { useStoreon } from 'storeon/react';

export default Main = () => {
  const [state, setState] = useState({ loaded: false });
  const { authState } = useStoreon('authState');

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
  if (authState.registration || !state.loggedIn) {
    return <LoginRegStackNavigator />;
  }
  return <MessageStackNavigator />;
};
