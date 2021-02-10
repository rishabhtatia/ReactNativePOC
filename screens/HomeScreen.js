import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef } from "react";
import { ActivityIndicator, Animated, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
const HomeScreen = (props) => {
  const { navigation } = props;
  const scrollY = useRef(new Animated.Value(0)).current;
  const fakedata = [
    {
      author: "Chinua Achebe",
      country: "Nigeria",
      imageLink: require("../assets/background.png"),
      language: "English",
      link: "https://en.wikipedia.org/wiki/Things_Fall_Apart\n",
      pages: 209,
      title: "Things Fall Apart",
      year: 1958,
    },
    {
      author: "Hans Christian Andersen",
      country: "Denmark",
      imageLink: require("../assets/background.png"),
      language: "Danish",
      link: "https://en.wikipedia.org/wiki/Fairy_Tales_Told_for_Children._First_Collection.\n",
      pages: 784,
      title: "Fairy tales",
      year: 1836,
    },
    {
      author: "Dante Alighieri",
      country: "Italy",
      imageLink: require("../assets/background.png"),
      language: "Italian",
      link: "https://en.wikipedia.org/wiki/Divine_Comedy\n",
      pages: 928,
      title: "The Divine Comedy",
      year: 1315,
    },
    {
      author: "Unknown",
      country: "Sumer and Akkadian Empire",
      imageLink: require("../assets/background.png"),
      language: "Akkadian",
      link: "https://en.wikipedia.org/wiki/Epic_of_Gilgamesh\n",
      pages: 160,
      title: "The Epic dfs Gilgamesh",
      year: -1700,
    },
    {
      author: "Unknown",
      country: "Achaemenid Empire",
      imageLink: require("../assets/background.png"),
      language: "Hebrew",
      link: "https://en.wikipedia.org/wiki/Book_of_Job\n",
      pages: 176,
      title: "The Bookghgh Of Job",
      year: -600,
    },
    {
      author: "Unknown",
      country: "India/Iran/Iraq/Egypt/Tajikistan",
      imageLink: require("../assets/background.png"),
      language: "Arabic",
      link: "https://en.wikipedia.org/wiki/One_Thousand_and_One_Nights\n",
      pages: 288,
      title: "One Thouddfsand and One Nights",
      year: 1200,
    },
    {
      author: "Unknown",
      country: "Achaemenid Empire",
      imageLink: require("../assets/background.png"),
      language: "Hebrew",
      link: "https://en.wikipedia.org/wiki/Book_of_Job\n",
      pages: 176,
      title: "The Book Offfff Job",
      year: -600,
    },
    {
      author: "Unknown",
      country: "India/Iran/Iraq/Egypt/Tajikistan",
      imageLink: require("../assets/background.png"),
      language: "Arabic",
      link: "https://en.wikipedia.org/wiki/One_Thousand_and_One_Nights\n",
      pages: 288,
      title: "One Thouffsand and One Nights",
      year: 1200,
    },
    {
      author: "Unknown",
      country: "Achaemenid Empire",
      imageLink: require("../assets/background.png"),
      language: "Hebrew",
      link: "https://en.wikipedia.org/wiki/Book_of_Job\n",
      pages: 176,
      title: "The Booasssk Of Job",
      year: -600,
    },
    {
      author: "Unknown",
      country: "India/Iran/Iraq/Egypt/Tajikistan",
      imageLink: require("../assets/background.png"),
      language: "Arabic",
      link: "https://en.wikipedia.org/wiki/One_Thousand_and_One_Nights\n",
      pages: 288,
      title: "One Thoasusand and One Nights",
      year: 1200,
    },
    {
      author: "Unknown",
      country: "Achaemenid Empire",
      imageLink: require("../assets/background.png"),
      language: "Hebrew",
      link: "https://en.wikipedia.org/wiki/Book_of_Job\n",
      pages: 176,
      title: "The Booaskert Of Job",
      year: -600,
    },
    {
      author: "Unknown",
      country: "India/Iran/Iraq/Egypt/Tajikistan",
      imageLink: require("../assets/background.png"),
      language: "Arabic",
      link: "https://en.wikipedia.org/wiki/One_Thousand_and_One_Nights\n",
      pages: 288,
      title: "One Thouaassand and One Nights",
      year: 1200,
    },
  ];
  const removeValue = async (navigation) => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };
  const ITEM_SIZE = 70 + 20 * 3;
  return (
    <View style={styles.container}>
      <View>
        <Text>HOME SCREEN</Text>
        <Button mode="contained" onPress={() => removeValue(navigation)}>
          LOGOUT
        </Button>
        <Button mode="contained" onPress={() => navigation.navigate("Post")}>
          ADD POST
        </Button>
      </View>
      <View>
        <Animated.FlatList
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
          contentContainerStyle={{ padding: 20 }}
          data={fakedata}
          renderItem={({ item, index }) => {
            const inputRange = [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)];
            const scale = scrollY.interpolate({ inputRange, outputRange: [1, 1, 1, 0] });
            const opacity = scrollY.interpolate({ inputRange, outputRange: [1, 1, 1, 0] });
            return (
              <Animated.View
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
                  opacity,
                  shadowOpacity: 1,
                  shadowRadius: 20,
                  transform: [{ scale }],
                }}
              >
                <Image source={item.imageLink} style={{ width: 70, height: 70, borderRadius: 70, marginRight: 10 }} />
                <View style={{ flexShrink: 1 }}>
                  <Text style={{ fontSize: 22, fontWeight: "800" }}>{item.title}</Text>
                  <Text style={{ fontSize: 18, opacity: 0.5 }}>{item.author}</Text>
                </View>
              </Animated.View>
            );
          }}
          keyExtractor={(item) => item.title}
          onEndReachedThreshold={0.5}
          onEndReached={() => console.log("Hi")}
          initialNumToRender={5}
        />
      </View>
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
