import React, { useContext} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppContext } from "../context/AppContext";

function Onboarding({ navigation }) {
  const {
    setLogged,
    logged,
    firstName,
    onChangeFirstName,
    email,
    onChangeEmail,
  } = useContext(AppContext);


  const validateInputs = () => {
    if (email === "" || firstName === "") {
      Alert.alert("All fields are needed");
      return false;
    }
    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      Alert.alert("e-mail not valid !");
      return false;
    }
    return true;
  };
  return (
    <>
      <View style={onboardingStyles.header}>
        <Image
          source={require("../images/logo.png")}
          style={onboardingStyles.image}
          resizeMode="contain"
        />
      </View>
      <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
        <KeyboardAvoidingView style={onboardingStyles.container}>
          <ScrollView
            style={onboardingStyles.content}
            keyboardDismissMode="on-drag"
            automaticallyAdjustKeyboardInsets={true}
          >
            <Text style={onboardingStyles.headerText}>
              Let us get to know you !
            </Text>
            <Text style={onboardingStyles.Text}>First Name</Text>
            <TextInput
              style={onboardingStyles.input}
              onChangeText={onChangeFirstName}
              value={firstName}
              placeholder="First Name"
              clearButtonMode={true}
            />
            <Text style={onboardingStyles.Text}>Email</Text>
            <TextInput
              style={onboardingStyles.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
              clearButtonMode={true}
            />
            <Pressable
              onPress={() => {
                if (validateInputs()) {
                  navigation.navigate("Home");
                  setLogged(true);
                  console.log("from Onboarding : " + logged)
                }
              }}
              style={onboardingStyles.button}
            >
              <Text style={onboardingStyles.buttonText}>Next</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
}

const onboardingStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#EDEFEE",
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  Text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#EDEFEE",
    padding: 30,
    alignSelf: "center",
  },
  image: {
    marginTop: 0,
    height: 50,
    width: 150,
  },
  header: {
    flex: 0.1,
    backgroundColor: "#FFF8DC",
    alignItems: "center",
    marginTop: 0,
  },
  content: {
    flex: 1,
    backgroundColor: "#495E57",
  },
  input: {
    height: 40,
    borderWidth: 2,
    paddingHorizontal: 10, // Reduced padding to avoid text overflow
    fontSize: 18, // Adjusted font size for better visibility
    borderColor: "#F4CE14",
    backgroundColor: "#F4CE14",
    width: "70%",
    borderRadius: 25,
    alignSelf: "center",
    color: "#333333", // Ensures text is visible
  },
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 100,
    marginTop: 100,
    backgroundColor: "#F4CE14",
    borderColor: "#F4CE14",
    borderWidth: 2,
    borderRadius: 12,
  },
  buttonText: {
    color: "#333333",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default Onboarding;
