import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [logged, setLogged] = useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [firstName, onChangeFirstName] = React.useState("");
  const [lastName, onChangeLastName] = React.useState("");
  const [email, onChangeEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [profile, setProfile] = useState(null);

  const [isOrder, setOrder] = useState(false);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);
  const [isSpecialOffers, setIsSpecialOffers] = useState(false);
  const [isNewsletter, setIsNewsletter] = useState(false);

  useEffect(() => {
    const loadState = async () => {
      try {
        const storedLogged = await AsyncStorage.getItem("logged");
        const storedFirstName = await AsyncStorage.getItem("firstName");
        const storedLastName = await AsyncStorage.getItem("lastName");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedPhone = await AsyncStorage.getItem("phone");
        const storedProfile = await AsyncStorage.getItem("profile");

        const storedOrder = await AsyncStorage.getItem("isOrder");
        const storedPasswordChanged = await AsyncStorage.getItem(
          "isPasswordChanged"
        );
        const storedSpecialOffers = await AsyncStorage.getItem(
          "isSpecialOffers"
        );
        const storedNewsletter = await AsyncStorage.getItem("isNewsletter");

        if (storedLogged !== null) setLogged(JSON.parse(storedLogged));
        if (storedFirstName !== null)
          onChangeFirstName(JSON.parse(storedFirstName));
        if (storedLastName !== null)
          onChangeLastName(JSON.parse(storedLastName));

        if (storedEmail !== null) onChangeEmail(JSON.parse(storedEmail));
        if (storedPhone !== null) setPhone(JSON.parse(storedPhone));
        if (storedProfile !== null) setProfile(JSON.parse(storedProfile));

        if (storedOrder !== null) setOrder(JSON.parse(storedOrder));

        if (storedPasswordChanged !== null)
          setIsPasswordChanged(JSON.parse(storedPasswordChanged));
        if (storedSpecialOffers !== null)
          setIsSpecialOffers(JSON.parse(storedSpecialOffers));
        if (storedNewsletter !== null)
          setIsNewsletter(JSON.parse(storedNewsletter));
      } catch (error) {
        console.error("Error loading state from AsyncStorage:", error);
      }finally {
        setIsLoading(false); // Set loading to false after data is loaded
      }
    };
    loadState();
  }, []);

  const logout = async () => {
    try {
      setLogged(false);
      onChangeFirstName('');
      onChangeLastName('');
      onChangeEmail('');
      setPhone('');
      setProfile(null);
      setOrder(false);
      setIsPasswordChanged(false);
      setIsSpecialOffers(false);
      setIsNewsletter(false);

      await AsyncStorage.clear();
      
    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  const handleSetLogged = async (value) => {
    try {
      setLogged(value);
      await AsyncStorage.setItem("logged", JSON.stringify(value)); // Save as string
    } catch (error) {
      console.error("Error saving logged state to AsyncStorage:", error);
    }
  };

  const handleSetFirstName = async (value) => {
    try {
      onChangeFirstName(value);
      await AsyncStorage.setItem("firstName", JSON.stringify(value)); // Save as string
    } catch (error) {
      console.error("Error saving firstName state to AsyncStorage:", error);
    }
  };

  const handleSetLastName = async (value) => {
    try {
      onChangeLastName(value);
      await AsyncStorage.setItem("lastName", JSON.stringify(value)); // Save as string
    } catch (error) {
      console.error("Error saving lastName state to AsyncStorage:", error);
    }
  };

  const handleSetEmail = async (value) => {
    try {
      onChangeEmail(value);
      await AsyncStorage.setItem("email", JSON.stringify(value)); // Save as string
    } catch (error) {
      console.error("Error saving email state to AsyncStorage:", error);
    }
  };

  const handleSetPhone = async (value) => {
    try {
      setPhone(value);
      await AsyncStorage.setItem("phone", JSON.stringify(value)); // Save as string
    } catch (error) {
      console.error("Error saving phone state to AsyncStorage:", error);
    }
  };

  const handleSetProfile = async (value) => {
    try {
      setProfile(value);
      await AsyncStorage.setItem("profile", JSON.stringify(value)); // Save as string
    } catch (error) {
      console.error(
        "Error saving Profile picture state to AsyncStorage:",
        error
      );
    }
  };

  const handleSetOrder = async (value) => {
    try {
      setOrder(value);
      await AsyncStorage.setItem("isOrder", JSON.stringify(value)); // Save as string
    } catch (error) {
      console.error("Error saving isOrder state to AsyncStorage:", error);
    }
  };

  const handleSetPasswordChanged = async (value) => {
    try {
      setIsPasswordChanged(value);
      await AsyncStorage.setItem("isPasswordChanged", JSON.stringify(value)); // Save as string
    } catch (error) {
      console.error(
        "Error saving isPasswordChanged state to AsyncStorage:",
        error
      );
    }
  };

  const handleSetIsSpecialOffers = async (value) => {
    try {
      setIsSpecialOffers(value);
      await AsyncStorage.setItem("isSpecialOffers", JSON.stringify(value)); // Save as string
    } catch (error) {
      console.error(
        "Error saving isSpecialOffers state to AsyncStorage:",
        error
      );
    }
  };

  const handleSetIsNewsletter = async (value) => {
    try {
      setIsNewsletter(value);
      await AsyncStorage.setItem("isNewsletter", JSON.stringify(value)); // Save as string
    } catch (error) {
      console.error("Error saving isNewsletter state to AsyncStorage:", error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        logged,
        setLogged: handleSetLogged,
        isLoading, setIsLoading,
        firstName,
        onChangeFirstName: handleSetFirstName,
        email,
        onChangeEmail: handleSetEmail,
        phone,
        setPhone: handleSetPhone,
        lastName,
        onChangeLastName: handleSetLastName,
        profile,
        setProfile: handleSetProfile,
        isOrder,
        setOrder: handleSetOrder,
        isPasswordChanged,
        setIsPasswordChanged: handleSetPasswordChanged,
        isSpecialOffers,
        setIsSpecialOffers: handleSetIsSpecialOffers,
        isNewsletter,
        setIsNewsletter: handleSetIsNewsletter,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
