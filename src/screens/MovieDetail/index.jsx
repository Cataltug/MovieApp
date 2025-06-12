import React, { useState, useRef, useEffect } from "react";
import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Pressable,
} from "react-native";
import * as Icons from "phosphor-react-native";
import SafeScreen from "../../components/SafeScreen";
import Typo from "../../components/Typo";
import { colors, spacingY } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";
import { useAuth } from "../../../contexts/authContext";
import { getMovieDetail } from "../../../api/moviedb";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";

export default function MovieDetail({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;
  const { favorites, addFavorite, removeFavorite } = useAuth();

  const [detail, setDetail] = useState(null);
  const [isFav, setIsFav] = useState(false);
  const lastTapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    getMovieDetail(item.id).then((data) => {
      if (!cancelled) setDetail(data);
    });
    return () => {
      cancelled = true;
    };
  }, [item.id]);

  useEffect(() => {
    setIsFav(favorites.some((m) => m.id === item.id));
  }, [favorites, item.id]);

  const handleHeart = () => {
    if (isFav) removeFavorite(item.id);
    else addFavorite({ id: item.id, ...detail });
  };

  const handlePress = () => {
    const now = Date.now();
    if (lastTapRef.current && now - lastTapRef.current < 300) {
      handleHeart();
    }
    lastTapRef.current = now;
  };

  if (!detail) return null;

  const bgImage = detail.poster_path
    ? `https://image.tmdb.org/t/p/w342${detail.poster_path}`
    : null;

  return (
    <SafeScreen>
      <Pressable onPress={handlePress}>
        <ImageBackground source={{ uri: bgImage }} style={styles.headerBg}>
          <View style={styles.scrim} />

          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icons.CaretLeft
                size={verticalScale(28)}
                color={colors.white}
                weight="bold"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleHeart}>
              {isFav ? (
                <Icons.Heart
                  size={verticalScale(26)}
                  color="red"
                  weight="fill"
                />
              ) : (
                <Icons.Heart size={verticalScale(26)} color={colors.white} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.headerContent}>
            <Typo size={20} fontWeight="600" color={colors.white}>
              {detail.title}
            </Typo>
            <View style={styles.metaRow}>
              <Typo size={14} color={colors.textLight}>
                {detail.release_date?.substring(0, 4)}
              </Typo>
              {detail.runtime && (
                <>
                  <View style={styles.dot} />
                  <Typo size={14} color={colors.textLight}>
                    {detail.runtime} min
                  </Typo>
                </>
              )}
            </View>
            <FlatList
              horizontal
              data={detail.genres}
              keyExtractor={(g) => String(g.id)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.genresList}
              renderItem={({ item: g }) => (
                <Typo size={14} color={colors.textLight} style={styles.genre}>
                  {g.name}
                </Typo>
              )}
            />
          </View>
        </ImageBackground>
      </Pressable>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: spacingY._20 }}
      >
        {/* Description */}
        <View style={{ marginBottom: spacingY._25 }}>
          <Typo
            size={18}
            fontWeight="600"
            color={colors.white}
            style={{ marginBottom: 8 }}
          >
            Description
          </Typo>
          <Typo size={14} color={colors.textLight}>
            {detail.overview}
          </Typo>
        </View>

        {/* Cast */}
        <View style={{ marginBottom: spacingY._25 }}>
          <Typo
            size={18}
            fontWeight="600"
            color={colors.white}
            style={{ marginBottom: 8 }}
          >
            Cast
          </Typo>
          <FlatList
            horizontal
            data={detail.credits.cast}
            keyExtractor={(c) => String(c.cast_id)}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: actor }) => (
              <View style={styles.castItem}>
                <Image
                  source={{
                    uri: actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : undefined,
                  }}
                  style={styles.castPhoto}
                />
                <Typo size={12} color={colors.white} style={{ marginTop: 4 }}>
                  {actor.name}
                </Typo>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </SafeScreen>
  );
}
