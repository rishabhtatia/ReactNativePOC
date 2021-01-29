import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen/LoginScreen";
import Home from "../components/Home/Home";
import Post from "../components/Post/Post";
import { Image, Platform, View } from "react-native";
import Constants from "expo-constants";
import Header from "../components/common/Header/Header";
import LogoTitle from "../components/common/LogoTitle/LogoTitle";

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={(navigate) => {
          return {
            headerTitle: () => <Header navigate={navigate} title="LOGIN" />,
            headerBackground: () => (
              <Image
                source={require("../assets/background.png")}
                style={{ marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight, flex: 1 }}
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
          headerBackground: () => (
            <View
              style={{
                backgroundColor: "#f4511e",
                marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
                flex: 1,
              }}
            ></View>
          ),
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
      <Stack.Screen
        name="POST"
        component={Post}
        options={{
          headerRight: () => <LogoTitle />,
          headerBackground: () => (
            <Image
              source={require("../assets/background.png")}
              style={{ marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight, flex: 1 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
