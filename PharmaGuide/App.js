import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Import the functions you need from the SDKs you need

import Splash from "./src/Splash";
import LogIn from "./UserAuth/LogIn";
import HomeScreen from "./src/HomeScreen";
import MainTabScreen from "./src/MainTabScreen";
import SupportScreen from "./src/SupportScreen";
import SettingsScreen from "./src/SettingsScreen";
import BookmarkScreen from "./src/BookmarkScreen";

//import { AuthContext } from "./Components/context";



import DrawerContent from "./src/DrawerContent.js";

const Stack = createNativeStackNavigator();
const Auth = () => {
  // Stack Navigator for Login
  return (
    <Stack.Navigator initialRouteName="LogIn ">
      <Stack.Screen
        name="LogIn "
        component={LogIn}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabScreen">
        <Stack.Screen
          name="MainTabScreen"
          component={MainTabScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="SupportScreen"
          options={{ headerShown: false }}
          component={SupportScreen}
        />
        <Stack.Screen
          name="SettingsScreen"
          options={{ headerShown: false }}
          component={SettingsScreen}
        />
        <Stack.Screen
          name="BookmarkScreen"
          options={{ headerShown: false }}
          component={BookmarkScreen}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="MainTabScreen"
          component={MainTabScreen}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
