import axios from "axios";
import React, { useState, useEffect } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import { globalStyles } from "../../styles/global";
import Card from "../common/Card/Card";

const Post = ({ route, navigation }) => {
  const { listId } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState({ title: "", body: "" });
  useEffect(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${listId}`)
      .then((response) => {
        setListData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Card>
      {isLoading ? (
        <ActivityIndicator size="large" color="purple" />
      ) : (
        <>
          <Text style={globalStyles.titleText}>{listData.title}</Text>
          <Text style={globalStyles.paragraphText}>{listData.body}</Text>
        </>
      )}
    </Card>
  );
};

export default Post;
