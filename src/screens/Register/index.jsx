import { View, TouchableOpacity, Alert } from "react-native";
import React, { useRef, useState } from "react";
import Typo from "../../components/Typo";
import SafeScreen from "../../components/SafeScreen";
import { colors, spacingY } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";
import BackButton from "../../components/BackButton";
import Input from "../../components/Input";
import * as Icons from "phosphor-react-native";
import Button from "../../components/Button";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../../contexts/authContext";
import styles from "./styles";

const Register = () => {
  const navigation = useNavigation();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const { register: registerUser } = useAuth();

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Sign up", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const res = await registerUser(emailRef.current, passwordRef.current);
    setIsLoading(false);
    console.log("register result: ", res);
    if (!res.success) {
      Alert.alert("Sign up", res.msg);
    }
    navigation.replace("MainTabs");
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight="800">
            Let's
          </Typo>
          <Typo size={30} fontWeight="800">
            Get Started
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={12} color={colors.textLighter}>
            Create an account to track your favorite movies
          </Typo>
          <Input
            placeholder="Enter your email"
            onChangeText={(value) => (emailRef.current = value)}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
            icon={
              <Icons.At
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />
          <Input
            placeholder="Enter your password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={(value) => (passwordRef.current = value)}
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight="700" color={colors.black} size={21}>
              Sign Up
            </Typo>
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Typo size={15}>Already have an account?</Typo>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Typo size={15} fontWeight="700" color={colors.primary}>
              Login
            </Typo>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
};

export default Register;
