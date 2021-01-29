import React from "react";
import { Formik } from "formik";
import { StyleSheet, View, Button, TextInput } from "react-native";
import { globalStyles } from "../../styles/global";
import * as yup from "yup";

const AddPostModal = ({ AddPost }) => {
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ title: "", body: "" }}
        onSubmit={(values, actions) => {
          //actions.resetForm();
          AddPost(values);
        }}
      >
        {(props) => (
          <View>
            <TextInput
              style={globalStyles.input}
              placeholder="Title"
              onChangeText={props.handleChange("title")}
              value={props.values.title}
            />
            <TextInput
              multiline
              style={globalStyles.input}
              placeholder="Body"
              onChangeText={props.handleChange("body")}
              value={props.values.body}
            />
            <Button title="submit" color="blue" onPress={props.handleSubmit} />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default AddPostModal;
