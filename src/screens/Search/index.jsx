import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import * as Icons from "phosphor-react-native";
import { useNavigation } from "@react-navigation/native";
import SafeScreen from "../../components/SafeScreen";
import Typo from "../../components/Typo";
import {
  searchMovies,
  getGenreList,
  discoverMovies,
} from "../../../api/moviedb";
import { colors, spacingX, spacingY } from "../../constants/theme";
import { verticalScale } from "../../utils/styling";
import SearchMovieItem from "../../components/SearchMovieItem";
import styles from "./styles";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const RATINGS = ["4+", "5+", "6+", "7+", "8+", "9+"];

export default function SearchScreen() {
  const navigation = useNavigation();

  // --- pagination & data ---
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // --- search vs filter state ---
  const [q, setQ] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // --- filter state ---
  const [genres, setGenres] = useState([]);
  const [selGenreId, setSelGenreId] = useState(null);
  const [selRating, setSelRating] = useState(null);
  const [showGenreModal, setShowGenreModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);

  useEffect(() => {
    (async () => {
      const gl = await getGenreList();
      setGenres(gl || []);
    })();
  }, []);

  useEffect(() => {
    if (isSearching) setShowFilters(false);

    loadPage(1, false);
  }, [isSearching, q, selGenreId, selRating]);

  const loadPage = useCallback(
    async (nextPage, append) => {
      let res;
      if (isSearching && q.trim()) {
        res = await searchMovies(q.trim(), nextPage);
      } else {
        res = await discoverMovies({
          page: nextPage,
          genreId: selGenreId,
          ratingGte: selRating,
        });
      }
      const list = res.results || [];

      setMovies((prev) => {
        if (!append) return list;
        const existing = new Set(prev.map((m) => m.id));
        const newOnes = list.filter((m) => !existing.has(m.id));
        return prev.concat(newOnes);
      });

      setPage(res.page || nextPage);
      setTotalPages(res.total_pages || nextPage);
    },
    [q, selGenreId, selRating, isSearching]
  );

  const onEndReached = () => {
    if (loadingMore || page >= totalPages) return;
    setLoadingMore(true);
    loadPage(page + 1, true).finally(() => setLoadingMore(false));
  };

  const onSubmitSearch = () => {
    setIsSearching(true);
  };
  const cancelSearch = () => {
    setQ("");
    setIsSearching(false);
  };
  const clearFilters = () => {
    setSelGenreId(null);
    setSelRating(null);
  };

  const renderMovie = useCallback(
    ({ item }) => (
      <SearchMovieItem
        item={item}
        onPress={() => navigation.navigate("MovieDetail", { item })}
      />
    ),
    [navigation]
  );

  return (
    <SafeScreen>
      {/* Search vs Filter row */}
      <View style={styles.row}>
        {isSearching ? (
          <View style={styles.searchInputWrapper}>
            <Icons.MagnifyingGlass
              size={verticalScale(20)}
              color={colors.textLight}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search movies..."
              placeholderTextColor={colors.textLight}
              value={q}
              onChangeText={setQ}
              onSubmitEditing={onSubmitSearch}
              returnKeyType="search"
              autoFocus
            />
            <TouchableOpacity onPress={cancelSearch}>
              <Icons.X size={verticalScale(20)} color={colors.textLight} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              setIsSearching(true);
              setShowFilters(false);
            }}
          >
            <Typo>Search</Typo>
          </TouchableOpacity>
        )}

        {!isSearching && (
          <TouchableOpacity
            style={[styles.searchButton, { marginLeft: spacingX._10 }]}
            onPress={() => {
              setShowFilters((f) => !f);
              setIsSearching(false);
            }}
          >
            <Typo>Filter</Typo>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter chips + Clear All */}
      {showFilters && !isSearching && (
        <View style={[styles.row, { marginBottom: spacingY._15 }]}>
          <TouchableOpacity
            style={styles.chip}
            onPress={() => setShowGenreModal(true)}
          >
            <Typo color={colors.white}>
              {selGenreId != null
                ? genres.find((g) => g.id === selGenreId)?.name
                : "Genre"}
            </Typo>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chip}
            onPress={() => setShowRatingModal(true)}
          >
            <Typo color={colors.white}>
              {selRating != null ? `${selRating}+` : "Rating"}
            </Typo>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip} onPress={clearFilters}>
            <Typo color={colors.white}>Clear All</Typo>
          </TouchableOpacity>
        </View>
      )}

      {/* Movie grid */}
      <FlatList
        data={movies}
        renderItem={renderMovie}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: spacingX._20,
        }}
        contentContainerStyle={{ paddingBottom: spacingY._20 }}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator color={colors.primary} style={{ margin: 16 }} />
          ) : null
        }
        ListEmptyComponent={
          !loadingMore && (
            <Typo
              color={colors.textLight}
              style={{ textAlign: "center", marginTop: 20 }}
            >
              No results.
            </Typo>
          )
        }
      />

      {/* Genre Modal */}
      <Modal transparent visible={showGenreModal} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setShowGenreModal(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
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
                    setSelRating(parseInt(r, 10));
                    setShowRatingModal(false);
                  }}
                >
                  <Typo
                    size={16}
                    color={
                      selRating === parseInt(r, 10)
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
