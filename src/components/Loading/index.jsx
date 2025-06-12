import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../../constants/theme";
import styles from "./styles";

const Loading = ({ size = "large", color = colors.primary }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

export default Loading;
