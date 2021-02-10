import * as React from "react";
import { Button, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Card from "../common/Card/Card";
import ScrollViewRefresh from "../common/ScrollViewRefresh/ScrollViewRefresh";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const SettingsScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Settings!</Text>
    </View>
  );
};

const AboutUsScreen = () => {
  return (
    <ScrollViewRefresh>
      <Card>
        <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
          make a type specimen book. It has survived not only five centuries, but also the leap into electronic
          typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset
          sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus
          PageMaker including versions of Lorem Ipsum.
        </Text>
      </Card>
    </ScrollViewRefresh>
  );
};

const Tab = createMaterialTopTabNavigator();
const AboutUs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="About Us" component={AboutUsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
export default AboutUs;
