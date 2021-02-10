import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useEffect } from "react/cjs/react.development";

const LoadingScreen = (props) => {
  const { navigation } = props;
  const fetchToken = async () => {
    const token = await AsyncStorage.getItem("token");
    token ? navigation.replace("Home") : navigation.replace("Login");
  };

  useEffect(() => {
    fetchToken();
  }, []);
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: "#003f5c",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoadingScreen;
