import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, Platform } from "react-native";
import Header from "../components/common/Header/Header";
import AboutUs from "../components/AboutUs/AboutUs";
import Constants from "expo-constants";

const Stack = createStackNavigator();

const AboutNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="AboutUs">
      <Stack.Screen
        name="AboutUs"
        component={AboutUs}
        options={(navigate) => {
          return {
            headerTitle: () => <Header navigate={navigate} title="ABOUT US" />,
            headerBackground: () => (
              <Image
                source={require("../assets/background.png")}
                style={{
                  marginTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
                  flex: 1,
                }}
              />
            ),
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default AboutNavigation;
