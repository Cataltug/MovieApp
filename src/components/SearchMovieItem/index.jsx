import React from "react";
import { TouchableOpacity, Image, StyleSheet } from "react-native";
import Typo from "../Typo";
import { colors, spacingX, spacingY } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";

export default function SearchMovieItem({ item, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w342${item.poster_path}` }}
        style={styles.poster}
      />
      <Typo size={14} color={colors.white} style={{ marginTop: spacingY._4 }}>
        {item.title}
      </Typo>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: spacingY._20,
    marginHorizontal: spacingX._5,
  },
  poster: {
    width: "100%",
    height: verticalScale(200),
    borderRadius: 8,
  },
});
