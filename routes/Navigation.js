import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import Home from "../components/Home/Home";
import Post from "../components/Post/Post";
import { Image, Platform } from "react-native";
import Constants from "expo-constants";
import Header from "../components/common/Header/Header";

const Stack = createStackNavigator();
const LogoTitle = () => <Image style={{ width: 50, height: 50 }} source={require("../assets/favicon.png")} />;

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={(navigate) => {
          return {
            headerTitle: () => <Header navigate={navigate} title="Login" />,
            headerBackground: () => (
              <Image
                source={require("../assets/background.png")}
                style={{ marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight }}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: "HOME",
          headerStyle: {
            backgroundColor: "#f4511e",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{
          headerRight: () => <LogoTitle />,
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
