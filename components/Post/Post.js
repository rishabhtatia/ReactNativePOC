import axios from "axios";
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View } from "react-native";
import { globalStyles } from "../../styles/global";
import Card from "../common/Card/Card";

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
    <Card>
      <Text style={globalStyles.titleText}>{listData.title}</Text>
      <Text style={globalStyles.paragraphText}>{listData.body}</Text>
    </Card>
  );
};

export default Post;
