import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import MyProfileScreen from '../screens/MyProfileScreen';
import MessengerScreen from '../screens/MessengerScreen';
import { PRIMARY_COLOR } from '../constants/colors';

const Tab = createBottomTabNavigator();

export default HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Messenger':
              iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
              break;
            case 'MyProfile':
              iconName = focused ? 'person' : 'person-outline';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarShowLabel: false,

        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen
        name={'Messenger'}
        component={MessengerScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="MyProfile" component={MyProfileScreen} />
    </Tab.Navigator>
  );
};
