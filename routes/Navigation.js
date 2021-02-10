import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import Post from "../components/Post/Post";
import { Image, Platform, View, Text } from "react-native";
import Constants from "expo-constants";
import Header from "../components/common/Header/Header";
import LogoTitle from "../components/common/LogoTitle/LogoTitle";
import HomeTabNavigation from "./HomeTabNavigation";
import Icon from "react-native-vector-icons/Ionicons";
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <Stack.Navigator initialRouteName="Login" headerMode="none">
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
        component={HomeTabNavigation}
        options={({ route }) => {
          return {
            // headerBackground: () => (
            //   <View
            //     style={{
            //       backgroundColor: "#181818",
            //       marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
            //       flex: 1,
            //     }}
            //   ></View>
            // ),
            // headerRight: () => <Text style={{ color: "white" }}>{route?.params?.email}</Text>,
            // headerTintColor: "#fff",
            // headerTitleStyle: {
            //   fontWeight: "bold",
            // },
          };
        }}
      />
      <Stack.Screen
        name="Post"
        component={PostStackScreen}
        options={
          {
            // title: "POST",
            // headerRight: () => <LogoTitle />,
            // headerBackground: () => (
            //   <Image
            //     source={require("../assets/background.png")}
            //     style={{ marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight, flex: 1 }}
            //   />
            // ),
          }
        }
      />
    </Stack.Navigator>
  );
};

const PostStack = createStackNavigator();
const PostStackScreen = ({ navigation, route }) => (
  <PostStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#694fad",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <PostStack.Screen
      name="Post"
      component={Post}
      options={() => {
        return {
          title: "Post",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#694fad"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
        };
      }}
      initialParams={{ ...route.params }}
    />
  </PostStack.Navigator>
);

export default Navigation;
