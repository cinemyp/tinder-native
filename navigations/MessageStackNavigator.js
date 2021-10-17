import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import DialogScreen from "../screens/DialogScreen";
import HomeTabs from "./HomeTabs";

const Stack = createStackNavigator();

export default MessageStackNavigator = () => {
  //TODO: получаем из стора данные о диалоге
  const name = "Amelia";

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={"HomeTabs"}
        component={HomeTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={"Dialog"}
        component={DialogScreen}
        options={{ headerTitle: name, headerStyle: { height: 110 } }}
      />
    </Stack.Navigator>
  );
};
