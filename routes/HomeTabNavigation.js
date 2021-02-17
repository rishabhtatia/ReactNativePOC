import * as React from "react";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../components/Home/Home";
import Profile from "../components/Profile/Profile";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Ionicons";
import { View } from "react-native";
// import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator();

const HomeTabNavigation = ({ route }) => {
  return (
    <Tab.Navigator shifting>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Posts",
          tabBarColor: "#009387",
          tabBarIcon: ({ color, size }) => <Ionicons name="ios-home" color={color} size={size} />,
        }}
        initialParams={{ ...route.params }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarColor: "black",
          tabBarIcon: ({ color, size }) => <Ionicons name="ios-person" color={color} size={size} />,
        }}
        initialParams={{ ...route.params }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createStackNavigator();
const HomeStackScreen = ({ navigation, route }) => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#009387",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <HomeStack.Screen
      name="Home"
      component={Home}
      options={() => {
        return {
          title: "Posts",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () =>
            route?.params?.email && (
              <View style={{ padding: 10 }}>
                <AntDesign
                  name="logout"
                  size={24}
                  color="#fff"
                  backgroundColor="#009387"
                  onPress={() => {
                    firebase.auth().signOut();
                    navigation.navigate("Login");
                  }}
                />
              </View>
            ),
        };
      }}
    />
  </HomeStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({ navigation, route }) => (
  <ProfileStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "black",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <ProfileStack.Screen
      name="Home"
      component={Profile}
      options={() => {
        return {
          title: "Profile",
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor="black"
              onPress={() => navigation.openDrawer()}
            ></Icon.Button>
          ),
          headerRight: () =>
            route?.params?.email && (
              <View style={{ padding: 10 }}>
                <AntDesign
                  name="logout"
                  size={24}
                  color="#fff"
                  backgroundColor="#black"
                  onPress={() => {
                    firebase.auth().signOut();
                    navigation.navigate("Login");
                  }}
                />
              </View>
            ),
        };
      }}
    />
  </ProfileStack.Navigator>
);

export default HomeTabNavigation;
