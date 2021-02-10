import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const CustomCheckbox = (props) => {
  const { style, isChecked, setChecked, label } = props;
  return (
    <View style={styles.section}>
      <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
      <Text style={style}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: { flexDirection: "row", alignItems: "center" },
  checkbox: {},
});

export default CustomCheckbox;
