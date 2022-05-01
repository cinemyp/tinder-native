import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStoreon } from 'storeon';
import { StoreContext } from 'storeon/react';
import { storeonParams } from './store';

import { LogBox, Platform } from 'react-native';
import Main from './Main';
import SocketContext, { socket } from './contexts';

const store = createStoreon(storeonParams);

if (Platform.OS === 'android') {
  LogBox.ignoreLogs(['Setting a timer']);
}
export default function App() {
  return (
    <StoreContext.Provider value={store}>
      <SocketContext.Provider value={socket}>
        <NavigationContainer>
          <Main />
        </NavigationContainer>
      </SocketContext.Provider>
    </StoreContext.Provider>
  );
}
