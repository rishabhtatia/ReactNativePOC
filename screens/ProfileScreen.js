import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import CONSTANTS from "../constants/const";

const ProfileScreen = (props) => {
  const { navigation } = props;
  const logOut = async (navigation) => {
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
  return (
    <View style={styles.container}>
      <Text>PROFILE SCREEN</Text>
      <Button mode="contained" onPress={() => logOut(navigation)}>
        LOGOUT
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
