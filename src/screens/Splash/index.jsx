import React, { useEffect } from "react";
import { View, Image } from "react-native";
import { useAuth } from "../../../contexts/authContext";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function Splash() {
  const navigation = useNavigation();
  const { user } = useAuth();
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (user) {
        navigation.replace("MainTabs");
      } else {
        navigation.replace("Landing");
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [navigation, user]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}
