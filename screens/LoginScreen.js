import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, StatusBar } from "react-native";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = (props) => {
  const initialFormValues = {
    email: "rishabhtatia1@gmail.com",
    password: "rishabh",
  };
  const { navigation } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, errors, reset } = useForm();
  const [loginError, setLoginError] = useState("");

  const clearError = () => {
    setTimeout(() => {
      setLoginError("");
    }, 5000);
  };
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email) ? true : "Invalid Email";
  };

  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem("token", value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);
  const onSubmit = async (data) => {
    axios.post("http://192.168.0.100:3000/api/login", data).then(
      async (response) => {
        const token = response.data.token;
        await storeToken(token);
        navigation.replace("Home");
      },
      (error) => {
        console.log(error);
        setLoginError(error?.response?.data?.message);
        clearError();
      }
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.logoText}>DEMO APP</Text>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              placeholder="Email"
              name="email"
              style={styles.input}
              onBlur={onBlur}
              value={value}
              onChangeText={(value) => onChange(value)}
              placeholderTextColor="#003f5c"
            />
          )}
          defaultValue={initialFormValues.email}
          name="email"
          rules={{ required: "The value is required", validate: validateEmail }}
        />
      </View>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errors?.email?.message}</Text>
      </View>
      <View style={styles.inputContainer}>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              placeholder="Password"
              style={styles.input}
              onBlur={onBlur}
              value={value}
              onChangeText={(value) => onChange(value)}
              secureTextEntry={true}
              placeholderTextColor="#003f5c"
            />
          )}
          name="password"
          rules={{ required: "The value is required" }}
          defaultValue={initialFormValues.password}
        />
      </View>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errors?.password?.message}</Text>
      </View>
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.buttonText} onPress={() => navigation.navigate("Signup")}>
          Create a new account?
        </Text>
      </TouchableOpacity>
      <Text style={styles.errorText}>{loginError}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center",
  },
  modalClose: {
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 20,
    alignSelf: "center",
    borderColor: "white",
    marginTop: 10,
  },
  inputContainer: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    height: 50,
    color: "white",
    alignItems: "center",
    margin: 10,
  },
  errorContainer: {
    marginBottom: 10,
  },
  errorText: {
    color: "red",
  },
  logoText: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40,
  },
  buttonContainer: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 40,
  },
  buttonText: {
    color: "white",
  },
});

export default LoginScreen;
