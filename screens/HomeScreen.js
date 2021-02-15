import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useRef } from "react";
import { useState } from "react";
import { ActivityIndicator, Animated, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { useEffect } from "react/cjs/react.development";
import { fakedata } from "../json/fakedata";
import CONSTANTS from "../constants/const";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const ITEM_SIZE = 70 + 20 * 3;
const HomeScreen = (props) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const { navigation, route } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [maxRows, setMaxRows] = useState(0);
  const [post, setPost] = useState([]);

  const getPosts = async () => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem("token");
      const resp = await axios.get(`${CONSTANTS.BASEURL}/api/post`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { pagesize: 10, page: page },
      });
      setMaxRows(resp.data.maxRows);
      const modifiedPosts = resp.data.posts.map((data) => {
        return {
          id: data._id,
          author: data.author,
          title: data.title,
          image: `${CONSTANTS.BASEURL}/api/imagepost/${data._id}`,
        };
      });
      if (page === 1) {
        setPost(modifiedPosts);
      } else if (post.length < resp.data.maxRows) {
        setPost((prevState) => [...prevState, ...modifiedPosts]);
      }
      setRefreshing(false);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      console.log("ERROR");
      setIsLoading(false);
      setRefreshing(false);
    }
  };
  const pulltoRefresh = () => setPage(1);
  const loadMore = () => {
    if (post.length < maxRows) {
      setPage(page + 1);
    }
  };
  useEffect(() => {
    getPosts();
  }, [page]);
  useEffect(() => {
    if (route?.params?.refresh) {
      pulltoRefresh();
    }
  }, [route?.params?.refresh]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="orange" />
      ) : (
        <View>
          <FlatList
            // onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
            contentContainerStyle={{ padding: 20 }}
            data={post}
            renderItem={({ item, index }) => {
              // const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
              // const scale = scrollY.interpolate({ inputRange, outputRange: [1, 1, 1, 0] });
              // const opacity = scrollY.interpolate({ inputRange, outputRange: [1, 1, 1, 0] });
              return (
                <TouchableWithoutFeedback onPress={() => navigation.navigate("Post", { id: item.id })}>
                  <View
                    style={{
                      backgroundColor: "lightpink",
                      flexDirection: "row",
                      padding: 20,
                      marginBottom: 20,
                      borderRadius: 12,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 10,
                      },
                      // opacity,
                      shadowOpacity: 1,
                      shadowRadius: 20,
                      // transform: [{ scale }],
                    }}
                  >
                    <Image
                      source={{ uri: item.image }}
                      // source={{ uri: item.imageLink }}
                      style={{ width: 70, height: 70, borderRadius: 70, marginRight: 10, resizeMode: "cover" }}
                    />
                    <View style={{ flexShrink: 1 }}>
                      <Text style={{ fontSize: 22, fontWeight: "800" }}>{item.title}</Text>
                      <Text style={{ fontSize: 18, opacity: 0.5 }}>{item.author}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            }}
            keyExtractor={(item) => item.id}
            onEndReachedThreshold={0.2}
            onEndReached={loadMore}
            refreshing={refreshing}
            onRefresh={() => pulltoRefresh()}
            initialNumToRender={10}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#003f5c",
    // justifyContent: "center",
    // alignItems: "center",
  },
});

export default HomeScreen;
