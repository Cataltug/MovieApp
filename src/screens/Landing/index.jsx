import { View, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { colors } from "../../constants/theme";
import SafeScreen from "../../components/SafeScreen";
import Typo from "../../components/Typo";

import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

const Landing = () => {
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [opacity]);

  return (
    <SafeScreen>
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            style={styles.loginButton}
          >
            <Typo fontWeight="500">Sign in</Typo>
          </TouchableOpacity>

          <Animated.Image
            source={require("../../../assets/images/welcome.png")}
            style={[styles.welcomeImage, { opacity }]}
            resizeMode="contain"
          />
        </View>

        <View style={styles.footer}>
          <View style={{ alignItems: "center" }}>
            <Typo size={20} fontWeight={"800"}>
              Log in to your account
            </Typo>
            <Typo size={20} fontWeight={"800"}>
              to explore your favorite movies.
            </Typo>
          </View>

          <View style={{ alignItems: "center", gap: 2 }}>
            <Typo size={13} color={colors.textLight}>
              Unlock personalized recommendations
            </Typo>
            <Typo size={13} color={colors.textLight}>
              and discover your next favorite film.
            </Typo>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => navigation.navigate("Register")}>
              <Typo size={22} color={colors.neutral900} fontWeight="600">
                Get Started
              </Typo>
            </Button>
          </View>
        </View>
      </View>
    </SafeScreen>
  );
};

export default Landing;
