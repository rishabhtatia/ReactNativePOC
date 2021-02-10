import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeStackScreen from "./HomeStackScreen";
import ProfileStackScreen from "./ProfileStackScreen";
import FloatingButton from "../components/common/FloatingButton/FloatingButton";

const Tab = createMaterialBottomTabNavigator();

const HomeTabScreen = (props) => {
  return (
    <Tab.Navigator shifting>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Posts",
          tabBarColor: "#fb5b5a",
          tabBarIcon: ({ color, size }) => <Ionicons name="ios-home" color={color} size={24} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarColor: "#00B4FF",
          tabBarIcon: ({ color, size }) => <Ionicons name="ios-person" color={color} size={24} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabScreen;
