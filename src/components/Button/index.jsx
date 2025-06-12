import React from "react";
import { TouchableOpacity, View } from "react-native";
import Loading from "../Loading";
import styles from "./styles";

const Button = ({ style, onPress, loading = false, children }) => {
  if (loading) {
    return (
      <View style={[styles.button, style, { backgroundColor: "transparent" }]}>
        <Loading />
      </View>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
