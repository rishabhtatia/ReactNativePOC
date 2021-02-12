import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import AddPostScreen from "./AddPostScreen";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View } from "react-native";
import CONSTANTS from "../constants/const";
import axios from "axios";

const HomeStack = createStackNavigator();
const logOut = async ({ navigation }) => {
  try {
    const token = await AsyncStorage.getItem("token");
    await axios.post(`${CONSTANTS.BASEURL}/api/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });
    console.log("LOGGED OUT");
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  } catch (error) {
    console.log(error);
  }
};
const addPost = ({ navigation }) => navigation.navigate("Post", { id: "new" });
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
      options={(navigation) => {
        return {
          title: "Posts",
          headerLeft: () => (
            <Ionicons
              name="add-circle-sharp"
              size={35}
              style={{ marginLeft: 20 }}
              color="black"
              onPress={() => addPost(navigation)}
            />
          ),
          headerRight: () => {
            return (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AntDesign
                  name="logout"
                  size={28}
                  style={{ marginRight: 5 }}
                  color="black"
                  onPress={() => logOut(navigation)}
                />
              </View>
            );
          },
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
