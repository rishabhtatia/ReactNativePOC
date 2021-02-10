import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  titleText: {
    fontFamily: "nunito-bold",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  paragraphText: {
    fontFamily: "nunito-regular",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    fontFamily: "nunito-bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
});
