import axios from "axios";
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, FlatList, TextInput } from "react-native";
import { globalStyles } from "../../styles/global";

const Post = ({ route, navigation }) => {
  const { listId } = route.params;
  const [listData, setListData] = useState({});
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${listId}`)
      .then((response) => {
        setListData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <View style={styles.container}>
      <Text style={globalStyles.titleText}>{listData.title}</Text>
      <Text style={globalStyles.paragraphText}>{listData.body}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
});

export default Post;
