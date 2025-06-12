import React from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Typo from "../Typo";
import { colors } from "../../constants/theme";
import styles from "./styles";

function MovieListItem({ item }) {
  const navigation = useNavigation();

  const posterUrl = item.poster_path
    ? `https://image.tmdb.org/t/p/w342${item.poster_path}`
    : null;

  const year = item.release_date ? item.release_date.substring(0, 4) : "";

  const rating =
    item.vote_average !== undefined ? item.vote_average.toFixed(1) : "";

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("MovieDetail", { item })}
      style={styles.container}
    >
      {posterUrl && <Image source={{ uri: posterUrl }} style={styles.poster} />}
      <View style={styles.textContainer}>
        <Typo size={16} fontWeight="600" color={colors.white}>
          {item.title}
        </Typo>
        {!!year && (
          <Typo size={12} color={colors.textLight} style={{ marginTop: 4 }}>
            {year} · ⭐ {rating}
          </Typo>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(
  MovieListItem,
  (prev, next) => prev.item.id === next.item.id
);
