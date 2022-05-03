import React from 'react';
import { useStoreon } from 'storeon/react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeTabs from './HomeTabs';
import { ProfileScreen } from '../screens/ProfileScreen';
import DialogScreen from '../screens/DialogScreen';
import { RegisterScreen } from '../screens/RegisterScreen';

const Stack = createStackNavigator();

const MessageStackNavigator = () => {
  const BACK_TITLE = 'Messages';

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'HomeTabs'}
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={'Dialog'}
        component={DialogScreen}
        options={({ route }) => ({
          headerStyle: { height: 110 },
          headerBackTitle: BACK_TITLE,
        })}
      />
      <Stack.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{ headerShown: false, headerBackTitle: BACK_TITLE }}
      />
    </Stack.Navigator>
  );
};
export default MessageStackNavigator;
