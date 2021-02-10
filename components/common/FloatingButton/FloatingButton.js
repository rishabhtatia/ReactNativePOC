import React from "react";
import { StyleSheet, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { AntDesign, Entypo } from "@expo/vector-icons";

const FloatingButton = (props) => {
  return (
    // <View style={[styles.container, props.styles]}>
    //   <TouchableWithoutFeedback>
    //     <Animated.View style={[styles.button, styles.menu]}>
    //       <AntDesign name="plus" size={24} color="#FFF" />
    //     </Animated.View>
    //   </TouchableWithoutFeedback>
    // </View>
    <View>
      <Text>ADD BUTTOn</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
  },
  button: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    shadowRadius: 10,
    shadowColor: "#F02A4B",
    shadowOpacity: 0.3,
    shadowOffset: { height: 10 },
  },
  menu: {
    backgroundColor: "#F02A4B",
  },
});
export default FloatingButton;
