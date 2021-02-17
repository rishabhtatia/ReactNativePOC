import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ActivityIndicator, Avatar, Button } from "react-native-paper";
import { useEffect, useState } from "react/cjs/react.development";
import CONSTANTS from "../constants/const";

const ProfileScreen = (props) => {
  const { navigation } = props;
  const [profileData, setProfileData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const logOut = async (navigation) => {
    try {
      const token = await AsyncStorage.getItem("token");
      await axios.post(`${CONSTANTS.BASEURL}/api/logout`, {}, { headers: { Authorization: `Bearer ${token}` } });
      await AsyncStorage.removeItem("token");
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  const getProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await axios.get(`${CONSTANTS.BASEURL}/api/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfileData(response?.data?.user);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProfileData();
  }, []);
  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={{ justifyContent: "center", alignItems: "center", margin: 10 }}>
          <ActivityIndicator animating={true} size={50} />
        </View>
      ) : (
        <>
          <Button mode="contained" onPress={() => logOut(navigation)}>
            LOGOUT
          </Button>
          <Button mode="contained" onPress={() => getProfileData()}>
            GET PROFILE DATA
          </Button>

          <View style={{ margin: 10 }}>
            <Image source={{ uri: profileData?.avatarurl }} style={{ borderRadius: 100, width: 200, height: 200 }} />
            <View style={{ alignItems: "center", margin: 10 }}>
              <Avatar.Text size={50} label={`${profileData?.firstname[0]}${profileData?.lastname[0]}`} color="white" />
              <Text style={{ color: "white" }}>{`${profileData?.firstname} ${profileData?.lastname}`}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
  },
});

export default ProfileScreen;
