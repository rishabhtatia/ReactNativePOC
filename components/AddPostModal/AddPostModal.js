import React from "react";
import { Text, View, TextInput, StyleSheet, ImageBackground, TouchableOpacity, Dimensions } from "react-native";
import { useForm, Controller } from "react-hook-form";

const AddPostModal = ({ AddPost }) => {
  const initialFormValues = {
    title: "",
    body: "",
  };
  const { control, handleSubmit, errors, reset } = useForm();
  const onSubmit = (data) => {
    AddPost(data);
  };

  return (
    <ImageBackground source={require("../../assets/background.png")} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.headerTitle}>
          <Text style={styles.headerText}>Add Post</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                placeholder="Title"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="title"
            rules={{ required: "The value is required" }}
            defaultValue={initialFormValues.title}
          />
          <Text style={styles.errorText}>{errors?.title?.message}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                multiline
                placeholder="Body"
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="body"
            defaultValue={initialFormValues.body}
          />
        </View>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.submitText}>ADD POST</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    resizeMode: "stretch",
  },
  container: {
    padding: 20,
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
  headerTitle: { alignItems: "center", marginBottom: 100 },
  headerText: {
    fontFamily: "dancing-bold",
    fontSize: 40,
    color: "blue",
  },
});
export default AddPostModal;
