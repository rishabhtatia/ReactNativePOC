import React from "react";
import { Text, View, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";

export default function SignUpForm({ setModalToggle }) {
  const initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const { control, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    setModalToggle(false);
    reset(initialFormValues);
  };
  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email) ? true : "Invalid Email";
  };

  return (
    <ImageBackground source={require("../../../assets/background.png")} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>Sign Up</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                placeholder="First Name"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="firstName"
            rules={{ required: "The value is required" }}
            defaultValue={initialFormValues.firstName}
          />
          <Text style={styles.errorText}>{errors?.firstName?.message}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholder="Last Name"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="lastName"
            defaultValue={initialFormValues.lastName}
            rules={{ required: "The value is required" }}
          />
          <Text style={styles.errorText}>{errors?.lastName?.message}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                placeholder="Email"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="email"
            defaultValue={initialFormValues.email}
            rules={{ required: "The value is required", validate: validateEmail }}
          />
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
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="password"
            defaultValue={initialFormValues.password}
            rules={{ required: "The value is required" }}
          />
          <Text style={styles.errorText}>{errors?.password?.message}</Text>
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitText}>CREATE ACCOUNT</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "stretch",
  },
  container: {
    padding: 10,
  },
  inputContainer: { marginBottom: 10 },
  input: {
    borderWidth: 1,
    padding: 10,
    borderColor: "#ddd",
    fontSize: 18,
    borderRadius: 6,
    backgroundColor: "white",
    borderRadius: 30,
  },
  errorText: {
    color: "red",
  },
  submitBtn: {
    alignItems: "center",
    padding: 10,
    backgroundColor: "#007bff",
    margin: 20,
    borderRadius: 30,
  },
  submitText: {
    fontSize: 20,
    color: "#fff",
  },
  headerTitle: { alignItems: "center", marginBottom: 60 },
  headerText: {
    fontFamily: "dancing-bold",
    fontSize: 40,
    color: "blue",
  },
});
