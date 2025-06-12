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

const Login = () => {
  const navigation = useNavigation();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [isLoading, setIsLoading] = useState(false);
  const { login: loginUser } = useAuth();

  const handleSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert("Login", "Please fill all the fields");
      return;
    }
    setIsLoading(true);
    const res = await loginUser(emailRef.current, passwordRef.current);
    setIsLoading(false);

    if (!res.success) {
      Alert.alert("Login", res.msg);
      return;
    }
  };

  return (
    <SafeScreen>
      <View style={styles.container}>
        <BackButton iconSize={28} />

        <View style={{ gap: 5, marginTop: spacingY._20 }}>
          <Typo size={30} fontWeight="800">
            Hey,
          </Typo>
          <Typo size={30} fontWeight="800">
            Welcome Back
          </Typo>
        </View>

        <View style={styles.form}>
          <Typo size={12} color={colors.textLighter}>
            Login now to track your favorite movies
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
            onChangeText={(value) => (passwordRef.current = value)}
            icon={
              <Icons.Lock
                size={verticalScale(26)}
                color={colors.neutral300}
                weight="fill"
              />
            }
          />

          <Typo size={12} color={colors.text} style={{ alignSelf: "flex-end" }}>
            Forgot Password?
          </Typo>

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight="700" color={colors.black} size={21}>
              Login
            </Typo>
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Typo size={15}>Don't have an account?</Typo>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Typo size={15} fontWeight="700" color={colors.primary}>
              Sign up
            </Typo>
          </TouchableOpacity>
        </View>
      </View>
    </SafeScreen>
  );
};

export default Login;
