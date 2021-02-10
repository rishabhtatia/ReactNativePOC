import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Picker, FlatList, Modal, TouchableOpacity } from "react-native";
import { TextInput, TouchableWithoutFeedback } from "react-native-gesture-handler";
import DatePicker from "react-native-datepicker";
import Checkbox from "expo-checkbox";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";

const Profile = ({ route }) => {
  const uri = "https://facebook.github.io/react-native/docs/assets/favicon.png";
  const [userProfile, setUserProfile] = useState({
    city: undefined,
    travelling: false,
    cooking: false,
    date: new Date(),
  });
  const [imageModal, setImageModal] = useState(null);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [imageData, setImageData] = useState([
    {
      title: "First Item",
      imageUrl: require("../../assets/gallery1.jpg"),
    },
    {
      title: "Second Item",
      imageUrl: require("../../assets/gallery2.jpg"),
    },
    {
      title: "Third Item",
      imageUrl: require("../../assets/gallery3.jpg"),
    },
    {
      title: "Fourth Item",
      imageUrl: require("../../assets/gallery4.jpg"),
    },
    {
      title: "Fifth Item",
      imageUrl: require("../../assets/gallery5.jpg"),
    },
    {
      title: "Sixth Item",
      imageUrl: require("../../assets/gallery6.jpg"),
    },
  ]);
  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => setImageModal(index)}>
      <Image source={item.imageUrl} style={{ width: 100, height: 100, borderRadius: 12, marginRight: 10 }} />
    </TouchableOpacity>
  );

  const getUserData = async () => {
    // const user = await firebase.auth().currentUser;
    // setUserProfile(user);
    // try {
    //   const token = (await Notifications.getExpoPushTokenAsync()).data;
    //   firebase.database().ref(`users/${user.uid}/push_token`).set(token);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImageData((prevState) => [...prevState, { title: prevState.length + "1", imageUrl: { uri: result.uri } }]);
    }
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  return (
    <>
      <Modal visible={imageModal !== null} animationType="slide" onRequestClose={() => setImageModal(null)}>
        <View style={styles.modalContent}>
          <MaterialIcons
            name="close"
            size={30}
            color="white"
            onPress={() => setImageModal(null)}
            style={styles.modalClose}
          />
          <Image source={imageModal !== null ? imageData[imageModal].imageUrl : null} />
        </View>
      </Modal>
      <View style={{ height: 100, backgroundColor: "#181818" }}></View>
      <View style={styles.container}>
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/ProfileDefault.png")}
            style={{ height: 100, width: 100, borderRadius: 50, marginTop: -70 }}
          />
          <Text style={{ color: "#181818", fontFamily: "dancing-bold", fontSize: 40, margin: 20 }}>USER INFO</Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldText}>Email</Text>
          <TextInput style={styles.fieldInput} value="rishabhtatia1@gmail.com" />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldText}>Full Name</Text>
          <TextInput style={styles.fieldInput} value="Rishabh Tatia" />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldText}>Date</Text>
          <DatePicker
            style={{ widht: "70%", fontSize: 20, fontFamily: "roboto-medium" }}
            date={userProfile.date}
            mode="date"
            placeholder="Select DOB"
            format="DD-MM-YYYY"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: "absolute",
                left: 0,
                top: 4,
                marginLeft: 0,
              },
              dateInput: {
                backgroundColor: "white",
                elevation: 0,
                color: "#D3D3D3",
              },
            }}
            onDateChange={() => {}}
          />
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldText}>Hobbies</Text>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={userProfile.travelling}
              onValueChange={(value) => {
                setUserProfile((prevState) => ({ ...prevState, travelling: value }));
              }}
            />
            <Text style={styles.fieldInput}>Travelling</Text>
          </View>
          <View style={styles.checkboxContainer}>
            <Checkbox
              value={userProfile.cooking}
              onValueChange={(value) => {
                setUserProfile((prevState) => ({ ...prevState, cooking: value }));
              }}
            />
            <Text style={styles.fieldInput}>Cooking</Text>
          </View>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldText}>City</Text>
          <View>
            <Picker
              selectedValue={userProfile.city}
              style={{ height: 50, width: 130, color: "black" }}
              onValueChange={(itemValue) =>
                setUserProfile((prevState) => {
                  return { ...prevState, city: itemValue };
                })
              }
            >
              <Picker.Item label="Indore" value="Indore" />
              <Picker.Item label="Pune" value="Pune" />
              <Picker.Item label="Mumbai" value="Mumbai" />
            </Picker>
          </View>
        </View>
        <View style={styles.galleryContainer}>
          <TouchableWithoutFeedback onPress={pickImage}>
            <Text style={styles.fieldText}>Gallery</Text>
          </TouchableWithoutFeedback>
          <View>
            <FlatList
              horizontal={true}
              data={imageData}
              showsHorizontalScrollIndicator={false}
              renderItem={renderItem}
              keyExtractor={(item) => item.title}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
  },
  fieldContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    margin: 5,
    padding: 5,
    borderBottomWidth: 1,
  },
  fieldText: { fontSize: 20, width: "30%" },
  fieldInput: { fontSize: 20 },
  checkboxContainer: { flexDirection: "row", alignItems: "center" },
  galleryContainer: { margin: 5 },
  modalClose: {
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 30,
    alignSelf: "center",
    borderColor: "white",
  },
  modalContent: {
    backgroundColor: "black",
  },
});
export default Profile;
