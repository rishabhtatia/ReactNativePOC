import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "react-navigation-stack";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import Home from "./components/Home/Home";
import Post from "./components/Post/Post";
import { useState } from "react/cjs/react.development";
import { Image } from "react-native";

const Stack = createStackNavigator();
const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });
function LogoTitle() {
  return <Image style={{ width: 50, height: 50 }} source={require("./assets/favicon.png")} />;
}
function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: "HOME",
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}
          />
          <Stack.Screen name="Post" component={Post} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} onError={() => console.log("Error")} />
    );
  }
}

export default App;
