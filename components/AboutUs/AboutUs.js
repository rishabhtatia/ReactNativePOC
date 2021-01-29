import * as React from "react";
import { Button, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Card from "../common/Card/Card";
const Stack = createStackNavigator();
const AboutUs = () => {
  return (
    <Card>
      <Text>ABOUT US</Text>
    </Card>
  );
};
export default AboutUs;
