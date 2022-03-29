import React, { useEffect, useState } from 'react';
import MessageStackNavigator from './navigations/MessageStackNavigator';
import { auth } from './firebase';
import { Text, View } from 'react-native';
import LoginRegStackNavigator from './navigations/LoginRegStackNavigator';
import { useStoreon } from 'storeon/react';

const Main = () => {
  const [state, setState] = useState({ loaded: false });
  const { authState } = useStoreon('authState');

  // if (!state.loaded) {
  //   return (
  //     <View style={{ flex: 1, alignItems: 'center' }}>
  //       <Text>Loading</Text>
  //     </View>
  //   );
  // }
  if (!authState.isSignedIn) {
    return <LoginRegStackNavigator />;
  }
  return <MessageStackNavigator />;
};

export default Main;
