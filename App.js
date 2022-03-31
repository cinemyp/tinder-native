import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { createStoreon } from 'storeon';
import { StoreContext } from 'storeon/react';
import { storeonParams } from './store';

import { LogBox, Platform } from 'react-native';
import Main from './Main';

const store = createStoreon(storeonParams);

if (Platform.OS === 'android') {
  LogBox.ignoreLogs(['Setting a timer']);
}
export default function App() {
  return (
    <StoreContext.Provider value={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </StoreContext.Provider>
  );
}
