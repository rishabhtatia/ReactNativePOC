import { StyleSheet, View, Text, ImageBackground } from "react-native";
import React from "react";
import { globalStyles } from "../../../styles/global";
import { MaterialIcons } from "@expo/vector-icons";

const Header = ({ navigate, title }) => {
  const openMenu = () => {
    navigate.navigation.openDrawer();
  };
  return (
    <View style={styles.header}>
      <MaterialIcons name="menu" size={28} style={styles.icon} onPress={openMenu} />
      <View>
        <Text style={globalStyles.titleText}>{title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    left: 10,
    position: "absolute",
  },
});

export default Header;
