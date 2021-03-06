import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStoreon } from 'storeon';
import { storeonParams } from './store';
import { StoreContext } from 'storeon/react';
import Main from './Main';
import { LogBox, Platform } from 'react-native';

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
