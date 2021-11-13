import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStoreon } from 'storeon';
import { storeonParams } from './store';
import { StoreContext } from 'storeon/react';
import Main from './Main';

const store = createStoreon(storeonParams);

export default function App() {
  return (
    <StoreContext.Provider value={store}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </StoreContext.Provider>
  );
}
