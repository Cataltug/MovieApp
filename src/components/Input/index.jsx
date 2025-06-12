import React from "react";
import { View, TextInput } from "react-native";
import { colors } from "../../constants/theme";
import styles from "./styles";

const Input = ({ containerStyle, inputStyle, icon, inputRef, ...rest }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {icon}
      <TextInput
        ref={inputRef}
        style={[styles.input, inputStyle]}
        placeholderTextColor={colors.neutral400}
        {...rest}
      />
    </View>
  );
};

export default Input;
