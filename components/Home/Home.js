import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/global";
import Card from "../common/Card/Card";
import AddPostModal from "../AddPostModal/AddPostModal";

const Home = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setFilteredData(response.data);
        setOriginalData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoading(false);
      });
  }, []);

  const onSearch = (text) => {
    if (text) {
      const newData = originalData.filter((item) => {
        const itemData = item.title.trim().toUpperCase();
        const textData = text.toUpperCase();
        return itemData.includes(textData);
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(originalData);
      setSearch(text);
    }
  };

  const deleteHandler = (selectedId) => {
    setFilteredData((prevState) => {
      return prevState.filter((item) => item.id !== selectedId);
    });
  };

  const Item = ({ item }) => {
    return (
      <Card>
        <View style={styles.item}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={() => navigation.navigate("Post", { listId: item.id })}>
              <Text style={globalStyles.paragraphText}>
                {item.id}
                {"."}
                {item.title}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity>
              <MaterialIcons name="delete" size={24} color="#333" onPress={() => deleteHandler(item.id)} />
            </TouchableOpacity>
          </View>
        </View>
      </Card>
    );
  };

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  const AddPost = (post) => {
    post.id = originalData.length + 1;
    setFilteredData((currentPosts) => {
      return [post, ...currentPosts];
    });
    setModalOpen(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Modal visible={modalOpen} animationType="slide">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={35}
              onPress={() => setModalOpen(false)}
              style={[styles.modalToggle, styles.modalClose]}
            />
            <AddPostModal AddPost={AddPost} />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      {isLoading ? (
        <View style={styles.loadingSpinner}>
          <ActivityIndicator size="large" color="purple" />
        </View>
      ) : (
        <>
          <View style={styles.headingTitle}>
            {/* <Text style={styles.headingText}>POSTS</Text> */}
            <TextInput style={styles.textInputStyle} onChangeText={onSearch} value={search} placeholder="Search Here" />
            <MaterialIcons name="add" size={30} onPress={() => setModalOpen(true)} style={styles.modalToggle} />
          </View>
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={Item}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  item: {
    padding: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    fontFamily: "nunito-regular",
  },
  headingTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  headingText: {
    paddingLeft: 20,
    margin: 5,
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "nunito-bold",
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#C8C8C8",
  },
  textInputStyle: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
  modalContent: {
    flex: 1,
    padding: 10,
  },
  modalToggle: {
    borderWidth: 1,
    borderColor: "#A9A9A9",
    borderRadius: 20,
  },
  modalClose: { alignSelf: "center", borderColor: "white", marginTop: 10 },
  loadingSpinner: { margin: 20 },
});

export default Home;
