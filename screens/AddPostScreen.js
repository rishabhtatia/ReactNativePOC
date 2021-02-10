import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { TextInput, Button, Switch, Provider, Text, HelperText, Avatar, Portal, Modal, Card } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
const AddPostScreen = (props) => {
  const { navigation } = props;
  const { control, errors, handleSubmit } = useForm({
    mode: "onBlur",
  });
  const createFormData = (photo, body) => {
    let formData = new FormData();
    // formData.append("image", {
    //   name: `${Date.now().toString()}`,
    //   type: "multipart/form-data",
    //   uri: Platform.OS === "android" ? imageUrl.uri : imageUrl.uri.replace("file://", ""),
    // });
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
    return formData;
  };
  const submit = (data) => {
    const payload = createFormData(imageUrl, data);
    console.log(payload);
    axios
      .post("http://192.168.0.100:3000/api/imagepost", payload)
      .then((resp) => console.log(resp.data))
      .catch((err) => {
        console.log(err);
        console.log(err?.response?.message);
      });
  };

  const removeValue = async (navigation) => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      // setImageData((prevState) => [...prevState, { title: prevState.length + "1", imageUrl: { uri: result.uri } }]);
      setImageUrl(result);
    }
  };
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState({
    uri: "http://192.168.0.100:3000/api/getimagepost/6023cd8645f6de97080835b9",
  });
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <Provider>
      <View style={styles.container}>
        <Portal>
          <Modal visible={visible} onDismiss={hideModal}>
            <Card>
              <Card.Cover source={{ uri: imageUrl.uri }} />
              <Card.Actions>
                <Button onPress={hideModal}>Cancel</Button>
                <Button onPress={pickImage}>Edit</Button>
              </Card.Actions>
            </Card>
          </Modal>
        </Portal>
        <TouchableWithoutFeedback onPress={showModal}>
          <View style={{ alignItems: "center" }}>
            <Avatar.Image size={200} source={{ uri: imageUrl.uri }} />
          </View>
        </TouchableWithoutFeedback>
        <Controller
          control={control}
          defaultValue=""
          name="author"
          rules={{ required: "The value is required" }}
          render={({ onChange, onBlur, value }) => (
            <>
              <TextInput
                label="Author"
                style={styles.input}
                value={value}
                mode="outlined"
                multiline={true}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                theme={{ colors: { text: "black", placeholder: "black", primary: "black" } }}
              />
              {errors.author?.message && (
                <HelperText type="error" padding="normal">
                  {errors.author?.message}
                </HelperText>
              )}
            </>
          )}
        />
        <Controller
          control={control}
          name="title"
          defaultValue=""
          render={({ onBlur, onChange, value }) => (
            <TextInput
              label="Title"
              style={styles.input}
              onBlur={onBlur}
              value={value}
              mode="outlined"
              onChangeText={(value) => onChange(value)}
              theme={{ colors: { text: "black", placeholder: "black", primary: "black" } }}
            />
          )}
        />
        <Controller
          control={control}
          name="language"
          defaultValue=""
          render={({ onBlur, onChange, value }) => (
            <TextInput
              label="Language"
              style={styles.input}
              onBlur={onBlur}
              value={value}
              mode="outlined"
              onChangeText={(value) => onChange(value)}
              theme={{ colors: { text: "black", placeholder: "black", primary: "black" } }}
            />
          )}
        />
        <Controller
          control={control}
          name="country"
          defaultValue=""
          render={({ onBlur, onChange, value }) => (
            <TextInput
              label="Country"
              style={styles.input}
              onBlur={onBlur}
              value={value}
              mode="outlined"
              onChangeText={(value) => onChange(value)}
              theme={{ colors: { text: "black", placeholder: "black", primary: "black" } }}
            />
          )}
        />
        <Controller
          control={control}
          name="genre"
          defaultValue=""
          render={({ onBlur, onChange, value }) => (
            <TextInput
              label="Genre"
              style={styles.input}
              onBlur={onBlur}
              value={value}
              mode="outlined"
              onChangeText={(value) => onChange(value)}
              theme={{ colors: { text: "black", placeholder: "black", primary: "black" } }}
            />
          )}
        />
        <Controller
          control={control}
          name="pages"
          defaultValue=""
          render={({ onBlur, onChange, value }) => (
            <TextInput
              label="Pages"
              style={styles.input}
              onBlur={onBlur}
              value={value}
              mode="outlined"
              onChangeText={(value) => onChange(value)}
              theme={{ colors: { text: "black", placeholder: "black", primary: "black" } }}
            />
          )}
        />
        <HelperText type="error">{errors.pages?.message}</HelperText>
        <Button mode="contained" onPress={handleSubmit(submit)}>
          Submit
        </Button>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#00a4ccff",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  input: { marginVertical: 5, backgroundColor: "white" },
  // row: {
  //   alignItems: "center",
  //   flexDirection: "row",
  //   marginVertical: 20,
  //   justifyContent: "space-between",
  // },
});

export default AddPostScreen;
