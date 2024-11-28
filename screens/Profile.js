import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import Checkbox from "expo-checkbox";
import { AppContext } from "../context/AppContext";
import { useContext, useEffect, useState } from "react";
import PhoneNumber from "libphonenumber-js";
import ProfilePicture from "../Avatar/avatar";
import * as ImagePicker from "expo-image-picker";

const validatePhoneNumber = (phoneNumber, countryCode) => {
  try {
    const number = PhoneNumber(phoneNumber, countryCode);
    if (number.isValid()) {
      return true;
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
};

function Profile({ navigation }) {
  const {
    firstName,
    email,
    onChangeEmail,
    phone,
    setPhone,
    onChangeFirstName,
    lastName,
    onChangeLastName,
    profile,
    setProfile,
    isOrder,
    setOrder,
    isPasswordChanged,
    setIsPasswordChanged,
    isSpecialOffers,
    setIsSpecialOffers,
    isNewsletter,
    setIsNewsletter,
    logout,
  } = useContext(AppContext);

  const [profileData, setProfileData] = useState({
    firstName,
    email,
    phone,
    profile,
    isOrder,
    isPasswordChanged,
    isSpecialOffers,
    isNewsletter,
  });

  // Sync local state with context on mount
  useEffect(() => {
    setProfileData({
      firstName,
      lastName,
      email,
      phone,
      profile,
      isOrder,
      isPasswordChanged,
      isSpecialOffers,
      isNewsletter,
    });
  }, [
    firstName,
    lastName,
    email,
    phone,
    profile,
    isOrder,
    isPasswordChanged,
    isSpecialOffers,
    isNewsletter,
  ]);

  // Handle input changes in local state
  const handleChange = (key, value) => {
    setProfileData((prev) => ({ ...prev, [key]: value }));
  };

  // Save changes to context from the local state
  const handleSave = () => {
    if (profileData.phone && !validatePhoneNumber(profileData.phone, "EG")) {
      Alert.alert("Wrong Phone Number");
      setProfileData(phone)
    }
    else{
      setPhone(profileData.phone);
    }
    if(profileData.profile === 1){
      setProfile(null)
    }else{
      setProfile(profileData.profile);
    }

    onChangeFirstName(profileData.firstName);
    onChangeLastName(profileData.lastName);
    onChangeEmail(profileData.email);
    setOrder(profileData.isOrder);
    setIsPasswordChanged(profileData.isPasswordChanged);
    setIsSpecialOffers(profileData.isSpecialOffers);
    setIsNewsletter(profileData.isNewsletter);
    navigation.pop();
  };

  // Discard changes and reset to initial context state
  const handleDiscard = () => {
    setProfileData({
      firstName,
      lastName,
      email,
      phone,
      profile,
      isOrder,
      isPasswordChanged,
      isSpecialOffers,
      isNewsletter,
    });

    navigation.pop()
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access media library is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      handleChange("profile",result.assets[0].uri);
    } else {
      console.log("Problem in URI");
    }
  };

  const removeImage = async () => {
    if (profileData.profile) handleChange("profile", 1);
  };

  return (
    <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
      <KeyboardAvoidingView style={profileStyles.content}>
        <ScrollView
          style={profileStyles.contentBox}
          keyboardDismissMode="on-drag"
          automaticallyAdjustKeyboardInsets={true}
        >
          <Text style={profileStyles.labelText}>Avatar</Text>
          <View style={profileStyles.avatar_view}>
            <Pressable style={profileStyles.change_button} onPress={pickImage}>
              <Text style={profileStyles.change_text}>Change</Text>
            </Pressable>
            <Pressable
              style={{
                ...profileStyles.change_button,
                backgroundColor: "#EEEEEE",
                borderWidth: 4,
              }}
              onPress={removeImage}
            >
              <Text style={{ ...profileStyles.change_text, color: "#495E57" }}>
                Remove
              </Text>
            </Pressable>


            <ProfilePicture header={0} changedProfile={profileData.profile}/>
          </View>

          <Text style={profileStyles.labelText}>First Name</Text>
          <TextInput
            style={profileStyles.input}
            onChangeText={(text) => handleChange("firstName", text)}
            value={profileData.firstName}
            placeholder="First Name"
            clearButtonMode={true}
          />
          <Text style={profileStyles.labelText}>Last Name</Text>
          <TextInput
            style={profileStyles.input}
            onChangeText={(text) => handleChange("lastName", text)}
            value={profileData.lastName}
            placeholder="Last Name"
            clearButtonMode={true}
          />
          <Text style={profileStyles.labelText}>E-mail</Text>
          <TextInput
            style={profileStyles.input}
            onChangeText={(text) => handleChange("email", text)}
            value={profileData.email}
            placeholder="E-mail"
            keyboardType="email-address"
            clearButtonMode={true}
          />
          <Text style={profileStyles.labelText}>Phone Number</Text>
          <TextInput
            style={profileStyles.input}
            onChangeText={(text) => handleChange("phone", text)}
            value={profileData.phone}
            placeholder="Phone Number"
            keyboardType="numeric"
            clearButtonMode={true}
          />

          <Text
            style={{
              ...profileStyles.text,
              font: 18,
              fontWeight: "bold",
              margin: 12,
            }}
          >
            Email Notification
          </Text>
          <View style={profileStyles.checkbox_container}>
            <Checkbox
              style={profileStyles.checkbox}
              value={profileData.isOrder}
              onValueChange={(text) => handleChange("isOrder", text)}
              color={profileData.isOrder ? "#495E57" : undefined}
            />
            <Text style={profileStyles.text_2}>Order Statuses</Text>
          </View>

          <View style={profileStyles.checkbox_container}>
            <Checkbox
              style={profileStyles.checkbox}
              value={profileData.isPasswordChanged}
              onValueChange={(text) => handleChange("isPasswordChanged", text)}
              color={profileData.isPasswordChanged ? "#495E57" : undefined}
            />
            <Text style={profileStyles.text_2}>Password Changes</Text>
          </View>

          <View style={profileStyles.checkbox_container}>
            <Checkbox
              style={profileStyles.checkbox}
              value={profileData.isSpecialOffers}
              onValueChange={(text) => handleChange("isSpecialOffers", text)}
              color={profileData.isSpecialOffers ? "#495E57" : undefined}
            />
            <Text style={profileStyles.text_2}>Special Offers</Text>
          </View>

          <View style={profileStyles.checkbox_container}>
            <Checkbox
              style={profileStyles.checkbox}
              value={profileData.isNewsletter}
              onValueChange={(text) => handleChange("isNewsletter", text)}
              color={profileData.isNewsletter ? "#495E57" : undefined}
            />
            <Text style={profileStyles.text_2}>Newsletter</Text>
          </View>
          <View style={{ ...profileStyles.avatar_view, marginTop: 20 }}>
            <Pressable
              onPress={() => {
                handleSave();
              }}
              style={{ ...profileStyles.change_button, marginRight: 20, marginLeft: 10,}}
            >
              <Text style={profileStyles.change_text}>Save Changes</Text>
            </Pressable>
            <Pressable
              onPress={handleDiscard}
              style={{
                ...profileStyles.change_button,
                backgroundColor: "#EEEEEE",
                borderWidth: 4,
                marginRight: 60,
              }}
            >
              <Text style={{ ...profileStyles.change_text, color: "#495E57" }}>
                Discard
              </Text>
            </Pressable>
          </View>

          <Pressable
            onPress={() => {
              //navigation.navigate("Onboarding")
              logout();
            }}
            style={profileStyles.button}
          >
            <Text style={profileStyles.buttonText}>Log out</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const profileStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 20,
    color: "#495E57",
  },
  text_2: {
    fontSize: 16,
    color: "#495E57",
    marginLeft: 10,
  },
  labelText: {
    fontSize: 14,
    margin: 10,
    color: "#495E57",
  },
  content: {
    flex: 1,
    backgroundColor: "#EEEEEE",
  },
  contentBox: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: "90%",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 30,
    alignSelf: "center",
  },
  input: {
    height: 50,
    borderWidth: 2,
    paddingHorizontal: 10, // Reduced padding to avoid text overflow
    fontSize: 18, // Adjusted font size for better visibility
    borderColor: "grey",
    backgroundColor: "#EEEEEE",
    width: "95%",
    borderRadius: 10,
    alignSelf: "center",
    color: "#495E57", // Ensures text is visible
  },
  button: {
    fontSize: 22,
    padding: 10,
    marginVertical: 8,
    margin: 20,
    marginTop: 10,
    backgroundColor: "#F4CE14",
    borderColor: "#F4CE14",
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 40,

  },
  avatar_view: {
    flex: 0.3,
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  change_button: {
    fontSize: 16,
    padding: 10,
    marginVertical: 8,
    marginLeft: 20,
    backgroundColor: "#495E57",
    borderColor: "#495E57",
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#333333",
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
  change_text: {
    color: "#EEEEEE",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    borderRadius: "50%",
    height: 100,
    width: 100,
  },
  checkbox_container: {
    flexDirection: "row",
    alignItems: "left",
    margin: 10,
  },
});

export default Profile;
