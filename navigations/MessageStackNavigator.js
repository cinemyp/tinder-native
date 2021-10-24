import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import DialogScreen from '../screens/DialogScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import HomeTabs from './HomeTabs';

const Stack = createStackNavigator();

export default MessageStackNavigator = () => {
  //TODO: получаем из стора данные о диалоге
  const name = 'Amelia';

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
        options={{
          headerTitle: name,
          headerStyle: { height: 110 },
          headerBackTitle: BACK_TITLE,
        }}
      />
      <Stack.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={{ headerShown: true, headerBackTitle: BACK_TITLE }}
      />
    </Stack.Navigator>
  );
};
