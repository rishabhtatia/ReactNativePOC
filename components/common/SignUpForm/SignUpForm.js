// import React, { useState } from "react";
// import {
//   Text,
//   View,
//   TextInput,
//   StyleSheet,
//   ImageBackground,
//   TouchableOpacity,
//   Dimensions,
//   ScrollView,
//   Picker,
// } from "react-native";
// import { useForm, Controller } from "react-hook-form";
// import DatePicker from "react-native-datepicker";
// import * as firebase from "firebase";
// import Checkbox from "expo-checkbox";
// import { PickerItem } from "react-native/Libraries/Components/Picker/Picker";

// export default function SignUpForm() {
//   const initialFormValues = {
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     date: "",
//     sports: false,
//     cooking: false,
//     travelling: false,
//     city: "",
//   };
//   const [city, setCity] = useState("");
//   const { control, handleSubmit, errors, reset, setValue, getValues } = useForm();
//   const [signUpError, setSignUpError] = useState("");
//   const clearError = () => {
//     setTimeout(() => {
//       setSignUpError("");
//     }, 5000);
//   };
//   const onSubmit = (data) => {
//     console.log(data);
//     firebase
//       .auth()
//       .createUserWithEmailAndPassword(data.email, data.password)
//       .then(
//         (resp) => {
//           setModalToggle(false);
//           reset(initialFormValues);
//         },
//         (error) => {
//           setSignUpError(error.message);
//           clearError();
//         }
//       );
//   };
//   const validateEmail = (email) => {
//     const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(email) ? true : "Invalid Email";
//   };

//   return (
//     <ImageBackground source={require("../../../assets/background.png")} style={styles.backgroundImage}>
//       <ScrollView style={styles.container}>
//         <View style={styles.headerTitle}>
//           <Text style={styles.headerText}>Sign Up</Text>
//         </View>
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{signUpError}</Text>
//         </View>
//         <View style={styles.inputContainer}>
//           <Controller
//             control={control}
//             render={({ onChange, onBlur, value }) => (
//               <TextInput
//                 style={styles.input}
//                 placeholder="First Name"
//                 onBlur={onBlur}
//                 onChangeText={(value) => onChange(value)}
//                 value={value}
//               />
//             )}
//             name="firstName"
//             rules={{ required: "The value is required" }}
//             defaultValue={initialFormValues.firstName}
//           />
//           <Text style={styles.errorText}>{errors?.firstName?.message}</Text>
//         </View>
//         <View style={styles.inputContainer}>
//           <Controller
//             control={control}
//             render={({ onChange, onBlur, value }) => (
//               <TextInput
//                 placeholder="Last Name"
//                 style={styles.input}
//                 onBlur={onBlur}
//                 onChangeText={(value) => onChange(value)}
//                 value={value}
//               />
//             )}
//             name="lastName"
//             defaultValue={initialFormValues.lastName}
//             rules={{ required: "The value is required" }}
//           />
//           <Text style={styles.errorText}>{errors?.lastName?.message}</Text>
//         </View>
//         <View style={styles.inputContainer}>
//           <Controller
//             control={control}
//             render={({ onChange, onBlur, value }) => (
//               <TextInput
//                 placeholder="Email"
//                 style={styles.input}
//                 onBlur={onBlur}
//                 onChangeText={(value) => onChange(value)}
//                 value={value}
//               />
//             )}
//             name="email"
//             defaultValue={initialFormValues.email}
//             rules={{ required: "The value is required", validate: validateEmail }}
//           />
//           <Text style={styles.errorText}>{errors?.email?.message}</Text>
//         </View>
//         <View style={styles.inputContainer}>
//           <Controller
//             control={control}
//             render={({ onChange, onBlur, value }) => (
//               <TextInput
//                 placeholder="Password"
//                 style={styles.input}
//                 onBlur={onBlur}
//                 onChangeText={(value) => onChange(value)}
//                 value={value}
//                 secureTextEntry={true}
//               />
//             )}
//             name="password"
//             defaultValue={initialFormValues.password}
//             rules={{
//               required: "The value is required",
//               minLength: { message: "The minimum length should be 6 characters", value: 6 },
//             }}
//           />
//           <Text style={styles.errorText}>{errors?.password?.message}</Text>
//         </View>
//         <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
//           <Text style={styles.submitText}>CREATE ACCOUNT</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </ImageBackground>
//   );
// }

// const styles = StyleSheet.create({
//   backgroundImage: {
//     width: Dimensions.get("window").width,
//     height: Dimensions.get("window").height,
//     resizeMode: "stretch",
//   },
//   container: {
//     padding: 10,
//   },
//   inputContainer: { marginBottom: 10 },
//   input: {
//     borderWidth: 1,
//     padding: 8,
//     borderColor: "#ddd",
//     fontSize: 16,
//     borderRadius: 6,
//     backgroundColor: "white",
//     borderRadius: 30,
//   },
//   checkBoxText: {
//     fontSize: 16,
//   },
//   labelName: {
//     fontSize: 20,
//     marginHorizontal: 8,
//   },
//   errorText: {
//     color: "red",
//   },
//   submitBtn: {
//     alignItems: "center",
//     padding: 10,
//     backgroundColor: "#007bff",
//     margin: 20,
//     borderRadius: 30,
//   },
//   submitText: {
//     fontSize: 20,
//     color: "#fff",
//   },
//   headerTitle: { alignItems: "center", marginBottom: 60 },
//   headerText: {
//     fontFamily: "dancing-bold",
//     fontSize: 40,
//     color: "blue",
//   },
//   errorContainer: {
//     alignItems: "center",
//     margin: 10,
//   },
// });
