import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DialogScreen from '../screens/DialogScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import HomeTabs from './HomeTabs';

const Stack = createStackNavigator();

export default LoginRegStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Login'}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name={'Register'} component={RegisterScreen} />
    </Stack.Navigator>
  );
};
