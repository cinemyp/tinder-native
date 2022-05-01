import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const LoginRegStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'Login'}
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'Register'}
        component={RegisterScreen}
        options={{
          presentation: 'modal',
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginRegStackNavigator;
