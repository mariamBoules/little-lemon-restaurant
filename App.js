import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "./screens/onboarding.js";
import Profile from "./screens/Profile.js";
import Home from "./screens/Home.js";
import SplashScreen from "./screens/SplashScreen.js";
import ProfilePicture from "./Avatar/avatar.js";
import { AppProvider, AppContext } from "./context/AppContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Image } from "react-native";
import { useContext } from "react";

const Stack = createStackNavigator();

export default function App() {

  return (
    <AppProvider>
      <NavigationContainer>
        <AppWrapper />
      </NavigationContainer>
    </AppProvider>
  );
}

function AppWrapper() {
  const { logged, isLoading } = React.useContext(AppContext);
  const { goBack } = useNavigation();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#EEEEEE", height: 120 },
        headerRight: () => (
          <ProfilePicture style={styles.profilePic} header={1} />
        ),
        
      }}
      initialRouteName= {logged ? "Home" : "Onboarding"}
    >

          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
            options={{ headerRight: null , headerLeft: null}}
          />
          <Stack.Screen
            options={{
              headerStyle: { height: 120 },
              headerTitle: () => (
                <Image
                  source={require("./images/logo.png")}
                  style={styles.image}
                  resizeMode="contain"
                />
              ),
              headerLeft: () => (
                <Icon
                  onPress={goBack}
                  name="arrow-back-circle"
                  color="#495E57"
                  size={42}
                />
              ),
            }}
            name="Profile"
            component={Profile}
          />
          <Stack.Screen name="Home" component={Home} options={{headerLeft: null}} />
       
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  image: {
    marginTop: 0,
    height: 50,
    width: 150,
  },
  profilePic: {
    height: 50,
    width: 50,
    marginRight: 10,
  },
});
