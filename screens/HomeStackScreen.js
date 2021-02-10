import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import AddPostScreen from "./AddPostScreen";

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#fb5b5a",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={HomeScreen}
      options={() => {
        return {
          title: "Posts",
        };
      }}
    />
    <HomeStack.Screen
      name="Post"
      component={AddPostScreen}
      options={() => {
        return {
          title: "Post",
        };
      }}
    />
  </HomeStack.Navigator>
);

export default HomeStackScreen;
