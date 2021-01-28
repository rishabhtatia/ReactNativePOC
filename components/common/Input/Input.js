import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { globalStyles } from "../../../styles/global";

const Input = (props) => {
  const {
    placeholder = "Enter Text..",
    placeholderTextColor = "#003f5c",
    onChangeHandler = () => {},
    error = "",
    secureTextEntry = false,
  } = props;
  return (
    <>
      <TextInput
        style={[styles.textInput, globalStyles.paragraphText]}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeHandler}
        secureTextEntry={secureTextEntry}
      />
      <View style={styles.error}>
        <Text style={globalStyles.errorText}>{error}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 10,
    marginLeft: 20,
    backgroundColor: "#FFC0CB",
    borderRadius: 30,
    width: "70%",
    height: 45,
    paddingLeft: 10,
  },
  error: {
    marginBottom: 20,
    paddingHorizontal: 80,
    alignSelf: "flex-start",
  },
});

export default Input;
