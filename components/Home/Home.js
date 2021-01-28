import axios from "axios";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, View, FlatList, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MaterialIcons } from "@expo/vector-icons";
import { globalStyles } from "../../styles/global";

const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setFilteredData(response.data);
        setOriginalData(response.data);
      })
      .catch((error) => {
        console.error(error);
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
      <View style={styles.item}>
        <TouchableOpacity>
          <MaterialIcons name="delete" size={24} color="#333" onPress={() => deleteHandler(item.id)} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Post", { listId: item.id })}>
          <Text style={globalStyles.paragraphText}>
            {item.id}
            {"."}
            {item.title}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>POSTS</Text>
      <TextInput style={styles.textInputStyle} onChangeText={onSearch} value={search} placeholder="Search Here" />
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={Item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  item: {
    padding: 5,
    marginRight: 20,
    flexDirection: "row",
    fontFamily: "nunito-regular",
  },
  headingText: {
    paddingLeft: 20,
    margin: 5,
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
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
  },
});

export default Home;
