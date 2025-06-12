import React from "react";
import { TouchableWithoutFeedback, View, Image } from "react-native";
import Typo from "../Typo";
import { colors } from "../../constants/theme";
import styles from "./styles";

export default function MovieCard({ item }) {
  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={styles.card}>
        <Image source={{ uri: item.posterUrl }} style={styles.image} />
        <Typo size={14} color={colors.white} style={styles.title}>
          {item.title}
        </Typo>
      </View>
    </TouchableWithoutFeedback>
  );
}
