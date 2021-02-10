import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";

const ProfileScreen = (props) => {
  const { navigation } = props;
  const removeValue = async (navigation) => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text>PROFILE SCREEN</Text>
      <Button mode="contained" onPress={() => removeValue(navigation)}>
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
