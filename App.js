import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MessageStackNavigator from "./navigations/MessageStackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <MessageStackNavigator />
    </NavigationContainer>
  );
}
