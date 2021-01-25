import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput
} from "react-native";

const App = () => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => response.json())
      .then(responseJson => {
        setFilteredData(responseJson);
        setOriginalData(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const onSearch = text => {
    if (text) {
      const newData = originalData.filter(function (item) {
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

  const Item = ({ item }) => {
    return (
      <Text style={styles.itemStyle}>
        {item.id}
        {"."}
        {item.title}
      </Text>
    );
  };

  const ItemSeparator = () => {
    return <View style={styles.separator} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingText}>POSTS</Text>
      <TextInput
        style={styles.textInputStyle}
        onChangeText={text => onSearch(text)}
        value={search}
        underlineColorAndroid="transparent"
        placeholder="Search Here"
      />
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
    padding: 10,
    marginTop: 20
  },
  itemStyle: {
    padding: 10
  },
  headingText: {
    paddingLeft: 20,
    margin: 5,
    fontWeight: "bold"
  },
  separator: {
    height: 0.5,
    width: "100%",
    backgroundColor: "#C8C8C8"
  },
  textInputStyle: {
    height: 40,
    borderWidth: 1,
    paddingLeft: 20,
    margin: 5,
    borderColor: "#009688",
    backgroundColor: "#FFFFFF",
    borderRadius: 20
  }
});

export default App;
