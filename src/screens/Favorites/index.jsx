import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Modal,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import * as Icons from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";

import SafeScreen from "../../components/SafeScreen";
import Typo from "../../components/Typo";
import { colors, spacingX, spacingY } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";
import { useAuth } from "../../../contexts/authContext";
import { getGenreList } from "../../../api/moviedb";
import styles from "./styles";

const RATINGS = ["4+", "5+", "6+", "7+", "8+", "9+"];

export default function FavoritesScreen() {
  const navigation = useNavigation();
  const { favorites, removeFavorite } = useAuth();

  const [genres, setGenres] = useState([]);
  const [q, setQ] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selGenreId, setSelGenreId] = useState(null);
  const [selRating, setSelRating] = useState(null);

  useEffect(() => {
    (async () => {
      const gl = await getGenreList();
      setGenres(gl || []);
    })();
  }, []);

  const filtered = useMemo(() => {
    return favorites
      .filter((m) => m.title.toLowerCase().includes(q.toLowerCase()))
      .filter((m) =>
        selGenreId
          ? Array.isArray(m.genre_ids) && m.genre_ids.includes(selGenreId)
          : true
      )
      .filter((m) =>
        selRating ? Math.floor(m.vote_average) >= parseInt(selRating, 10) : true
      );
  }, [favorites, q, selGenreId, selRating]);

  const renderItem = ({ item }) => {
    const posterUri = item.poster_path
      ? `https://image.tmdb.org/t/p/w185${item.poster_path}`
      : item.posterUrl;

    const year = item.release_date
      ? item.release_date.substring(0, 4)
      : item.year;

    return (
      <View style={styles.itemWrapper}>
        <TouchableOpacity
          style={styles.touchableRow}
          onPress={() => navigation.navigate("MovieDetail", { item })}
        >
          <View style={styles.leftRow}>
            <Image source={{ uri: posterUri }} style={styles.poster} />
            <View style={styles.textContainer}>
              <Typo size={18} fontWeight="600" color={colors.white}>
                {item.title}
              </Typo>
              <Typo size={14} color={colors.textLight}>
                {year} · ⭐ {item.vote_average?.toFixed(1) ?? item.rating}
              </Typo>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeFavorite(item.id)}>
          <Icons.Heart size={verticalScale(26)} color="red" weight="fill" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeScreen>
      {/* Search + Filter */}
      <View style={styles.row}>
        {isSearching ? (
          <View style={styles.searchInputWrapper}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search favorites..."
              placeholderTextColor={colors.textLight}
              value={q}
              onChangeText={setQ}
              autoFocus
            />
            <TouchableOpacity
              onPress={() => {
                setQ("");
                setIsSearching(false);
              }}
            >
              <Icons.X size={verticalScale(20)} color={colors.textLight} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setIsSearching(true)}
          >
            <Typo>Search</Typo>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.searchButton, { marginLeft: spacingX._10 }]}
          onPress={() => setShowFilters((f) => !f)}
        >
          <Typo>Filter</Typo>
        </TouchableOpacity>
      </View>

      {/* Filter + Clear All */}
      {showFilters && (
        <View style={[styles.row, { marginBottom: spacingY._15 }]}>
          <TouchableOpacity
            style={styles.chip}
            onPress={() => setShowGenreModal(true)}
          >
            <Typo color={colors.white}>
              {selGenreId
                ? genres.find((g) => g.id === selGenreId)?.name
                : "Genre"}
            </Typo>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chip}
            onPress={() => setShowRatingModal(true)}
          >
            <Typo color={colors.white}>
              {selRating ? `${selRating}+` : "Rating"}
            </Typo>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chip}
            onPress={() => {
              setSelGenreId(null);
              setSelRating(null);
            }}
          >
            <Typo color={colors.white}>Clear All</Typo>
          </TouchableOpacity>
        </View>
      )}

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: spacingY._20 }}
      />

      {/* Genre Modal */}
      <Modal transparent visible={showGenreModal} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowGenreModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={styles.modalList}>
                {genres.map((g) => (
                  <TouchableOpacity
                    key={g.id}
                    style={styles.modalItem}
                    onPress={() => {
                      setSelGenreId(g.id);
                      setShowGenreModal(false);
                    }}
                  >
                    <Typo
                      size={16}
                      color={
                        g.id === selGenreId ? colors.primary : colors.textLight
                      }
                    >
                      {g.name}
                    </Typo>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Rating Modal */}
      <Modal transparent visible={showRatingModal} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowRatingModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {RATINGS.map((r) => (
                <TouchableOpacity
                  key={r}
                  style={styles.modalItem}
                  onPress={() => {
                    setSelRating(r.replace("+", ""));
                    setShowRatingModal(false);
                  }}
                >
                  <Typo
                    size={16}
                    color={
                      String(selRating) === r.replace("+", "")
                        ? colors.primary
                        : colors.textLight
                    }
                  >
                    {r}
                  </Typo>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeScreen>
  );
}
