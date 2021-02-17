import React, { useState, useEffect, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image, StyleSheet, View } from "react-native";
import {
  TextInput,
  Button,
  Switch,
  Provider,
  Text,
  HelperText,
  Avatar,
  Portal,
  Modal,
  Card,
  Snackbar,
} from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { ScrollView, TouchableWithoutFeedback } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import CONSTANTS from "../constants/const";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
const AddPostScreen = (props) => {
  const { navigation, route } = props;
  const [visible, setVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [refreshImage, setRefreshImage] = useState(new Date());
  const [modalImage, setModalImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [onSubmitLoading, setonSubmitLoading] = useState(false);
  const [formData, setFormData] = useState(false);
  const [postingError, setPostingError] = useState("");
  const onDismissSnackBar = () => setPostingError("");
  const clearError = () => {
    setTimeout(() => {
      setPostingError("");
    }, 5000);
  };
  const showModal = (image) => {
    setModalImage(null);
    setModalImage(image);
    setVisible(true);
  };
  const hideModal = () => setVisible(false);
  const { control, errors, setValue, handleSubmit } = useForm({
    mode: "onBlur",
  });
  const setFormValues = ({
    author = "",
    title = "",
    language = "",
    country = "",
    genre = "",
    pages = "",
    _id = "",
  }) => {
    setValue("author", author);
    setValue("title", title);
    setValue("language", language);
    setValue("country", country);
    setValue("genre", genre);
    setValue("pages", pages);
  };
  const getPost = async () => {
    const token = await AsyncStorage.getItem("token");
    const id = route?.params?.id;
    try {
      const resp = await axios.get(`${CONSTANTS.BASEURL}/api/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(resp.data?.book);
      setIsLoading(false);
      setImageUrl(null);
      setImageUrl(`${CONSTANTS.BASEURL}/api/imagepost/${id}?refresh=${refreshImage}`);
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (route?.params?.id !== "new" && route?.params?.id !== undefined) {
      setFormValues(formData);
    }
  }, [isLoading]);
  useEffect(() => {
    if (route?.params?.id !== "new" && route?.params?.id !== undefined) {
      getPost();
    } else {
      setIsLoading(false);
    }
  }, []);

  const createFormData = (photo, body) => {
    let formData = new FormData();
    if (photo) {
      formData.append("image", {
        name: `${Date.now().toString()}`,
        type: "multipart/form-data",
        uri: Platform.OS === "android" ? photo : photo.replace("file://", ""),
      });
    }
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });
    return formData;
  };
  const submit = async (data) => {
    setonSubmitLoading(true);
    const token = await AsyncStorage.getItem("token");
    const payload = createFormData(imageUrl, data);
    try {
      if (route?.params?.id !== "new" && route?.params?.id !== undefined) {
        const resp = await axios.patch(`${CONSTANTS.BASEURL}/api/updatepost/${route?.params?.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigation.navigate("Home", { refresh: true });
      } else {
        const resp = await axios.post(`${CONSTANTS.BASEURL}/api/addpost`, payload, {
          headers: { Authorization: `Bearer ${token}` },
        });
        navigation.navigate("Home", { refresh: true });
      }
      setonSubmitLoading(false);
    } catch (err) {
      console.log("ERROR");
      console.log(err?.response);
      setPostingError(err?.response?.data?.message);
      setonSubmitLoading(false);
      clearError();
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
      setModalImage(null);
      setModalImage(result.uri);
    }
  };

  const changeImage = () => {
    if (imageUrl !== modalImage) {
      setImageUrl(null);
      setImageUrl(modalImage);
    }
    hideModal();
  };
  return (
    <ScrollView>
      <Provider>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator animating={true} size={100} color="#fb5b5a" />
          ) : (
            <>
              <Portal>
                <Modal visible={visible} onDismiss={hideModal} dismissable={false}>
                  <Card>
                    <Card.Cover
                      source={{
                        uri: `${modalImage}`,
                      }}
                      style={{ height: 350, resizeMode: "cover" }}
                    />
                    <Card.Actions>
                      <Button onPress={hideModal}>Cancel</Button>
                      <Button icon="camera" onPress={pickImage}>
                        Edit
                      </Button>
                      <Button onPress={() => changeImage()}>Done</Button>
                    </Card.Actions>
                  </Card>
                </Modal>
              </Portal>
              <TouchableWithoutFeedback onPress={() => showModal(imageUrl)}>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Avatar.Image
                    size={200}
                    source={{
                      uri: `${imageUrl}`,
                    }}
                  />
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
              <Button mode="contained" onPress={handleSubmit(submit)} loading={onSubmitLoading}>
                Submit
              </Button>
              <Text style={styles.errorText}>{postingError}</Text>
              <Snackbar
                visible={postingError}
                onDismiss={onDismissSnackBar}
                action={{
                  label: "Close",
                  onPress: () => setPostingError(""),
                }}
              >
                {postingError}
              </Snackbar>
            </>
          )}
        </View>
      </Provider>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#00a4ccff",
    justifyContent: "center",
    paddingHorizontal: 30,
    marginTop: 30,
  },
  input: { marginVertical: 5, backgroundColor: "white" },
  errorText: {
    color: "red",
    alignSelf: "center",
    fontSize: 15,
    paddingBottom: 20,
  },
});

export default AddPostScreen;
