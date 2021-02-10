import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import LoadingScreen from "./screens/LoadingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomeStackScreen from "./screens/HomeStackScreen";
import HomeTabScreen from "./screens/HomeTabScreen";

const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
    "dancing-bold": require("./assets/fonts/DancingScript-Bold.ttf"),
  });
const Stack = createStackNavigator();
const App = () => {
  const [fontsLoading, setFontsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const getToken = async () => {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
  return (
    <NavigationContainer>
      {fontsLoading ? (
        <AppLoading
          startAsync={getFonts}
          onFinish={() => setFontsLoading(false)}
          onError={() => console.log("Error")}
        />
      ) : (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeTabScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
