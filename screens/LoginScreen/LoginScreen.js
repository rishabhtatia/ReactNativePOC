import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  TextInput,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import SignUpForm from "../../components/common/SignUpForm/SignUpForm";

const LoginScreen = ({ navigation }) => {
  const initialFormValues = {
    email: "",
    password: "",
  };
  const [modalOpen, setModalOpen] = useState(false);
  const { control, handleSubmit, errors, reset } = useForm();

  const validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email) ? true : "Invalid Email";
  };
  const onSubmit = (data) => {
    navigation.navigate("Home");
    reset(initialFormValues);
  };

  return (
    <View style={styles.container}>
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons name="close" size={35} onPress={() => setModalOpen(false)} style={styles.modalClose} />
            <SignUpForm setModalToggle={setModalOpen} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.logoContainer}>
        <Image style={styles.image} source={require("../../assets/old_logo.png")} />
      </View>
      <View>
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
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonGroup} onPress={handleSubmit(onSubmit)}>
          <Text>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonGroup} onPress={() => setModalOpen(true)}>
          <Text>SIGN UP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#532b9f",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  buttonContainer: {
    alignItems: "center",
    marginHorizontal: 60,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 20,
  },
  buttonGroup: {
    paddingHorizontal: 80,
    paddingVertical: 15,
    margin: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF1493",
  },
  modalClose: {
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 20,
    alignSelf: "center",
    borderColor: "white",
    marginTop: 10,
  },
  inputContainer: { margin: 10, paddingHorizontal: 40 },
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
});

export default LoginScreen;
