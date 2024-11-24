import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { AppContext } from "../context/AppContext";
import { TouchableOpacity } from "react-native-gesture-handler";

const AvatarWithInitials = ({ style_1, style_2 }) => {
  const { firstName, lastName } = useContext(AppContext);

  const firstNameInitial = firstName[0] ? firstName[0] : "";
  const lastNameInitial = lastName[0] ? lastName[0] : "";

  return (
    <View style={style_1}>
      <Text style={style_2}>
        {firstNameInitial}
        {lastNameInitial}
      </Text>
    </View>
  );
};

const ProfilePicture = ({ header, changedProfile = null }) => {
  const { profile } = useContext(AppContext);

  return changedProfile === 1 ?
  (
    <AvatarWithInitials
      style_1={avatarStyles.container}
      style_2={avatarStyles.initials}
    />
  ): changedProfile ? (
    <Image source={{ uri: changedProfile }} style={avatarStyles.container} />)
    : (
    profile ? (
      header ? (
        <Image source={{ uri: profile }} style={avatarStyles.container_2} />
      )
       : (
        <Image source={{ uri: profile }} style={avatarStyles.container} />
      ))
     : header ? (
      <AvatarWithInitials
        style_1={avatarStyles.container_2}
        style_2={avatarStyles.initials_2}
      />
    ) : (
      <AvatarWithInitials
        style_1={avatarStyles.container}
        style_2={avatarStyles.initials}
      />
    )
    )
}

const avatarStyles = StyleSheet.create({
  container: {
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    width: 100, // Adjust as needed
    height: 100, // Match width for a perfect circle
    backgroundColor: "#F4CE14",
    borderRadius: 50, // Half of the width/height for a perfect circle
  },
  container_2: {
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    width: 50, // Adjust as needed
    height: 50, // Match width for a perfect circle
    backgroundColor: "#F4CE14",
    borderRadius: 50,
    marginRight: 20,
  },
  initials: {
    color: "#ffffff", // Text color
    fontSize: 30, // Adjust text size as needed
    fontWeight: "800", // Bold text
  },
  initials_2: {
    color: "#ffffff", // Text color
    fontSize: 18, // Adjust text size as needed
    fontWeight: "800", // Bold text
  },
  image: {
    borderRadius: "50%",
    height: 100,
    width: 100,
  },
});
export default ProfilePicture;
