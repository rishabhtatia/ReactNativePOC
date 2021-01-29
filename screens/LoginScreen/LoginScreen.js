import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Input from "../../components/common/Input/Input";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("rishabh.tatia@gmail.com");
  const [password, setPassword] = useState("12");
  const [formErrors, setFormErrors] = useState({});
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email);
  };

  const submitHandler = () => {
    if (validateEmail(email) || password.trim() === "") {
      let updatedErrorState = {};
      updatedErrorState.email = validateEmail(email) ? "Please enter correct email" : "";
      updatedErrorState.password = password.trim() === "" ? "The value cannot be empty" : "";
      setFormErrors(updatedErrorState);
      return;
    }
    setFormErrors({});
    navigation.navigate("Home");
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("../../assets/favicon.png")} />
      <StatusBar style="auto" />
      <Input
        placeholder="Email"
        placeholderTextColor="#003f5c"
        value={email}
        onChangeHandler={(email) => setEmail(email)}
        error={formErrors.email}
      />
      <Input
        placeholder="Password."
        placeholderTextColor="#003f5c"
        onChangeHandler={(password) => setPassword(password)}
        value={password}
        error={formErrors.password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginBtn} onPress={() => submitHandler()}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#532b9f",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 40,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF1493",
  },
});

export default LoginScreen;
