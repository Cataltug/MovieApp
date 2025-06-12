import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  StatusBar,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import SafeScreen from "../../components/SafeScreen";
import Typo from "../../components/Typo";
import { discoverMovies, getTrending } from "../../../api/moviedb";
import styles from "./styles";
import { colors } from "../../constants/theme";

export default function HomeScreen() {
  const nav = useNavigation();
  const [trending, setTrending] = useState([]);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const renderTrend = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.carouselItem}
        onPress={() => nav.navigate("MovieDetail", { item })}
      >
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${
              item.backdrop_path || item.poster_path
            }`,
          }}
          style={styles.carouselImage}
        />
        <View style={styles.carouselOverlay} />
        <Typo
          style={styles.carouselTitle}
          size={18}
          fontWeight="600"
          color={colors.white}
        >
          {item.title}
        </Typo>
      </TouchableOpacity>
    ),
    [nav]
  );

  const renderGrid = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => nav.navigate("MovieDetail", { item })}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w342${item.poster_path}` }}
          style={styles.gridImage}
        />
        <Typo size={14} color={colors.white} style={{ marginTop: 4 }}>
          {item.title}
        </Typo>
      </TouchableOpacity>
    ),
    [nav]
  );

  useEffect(() => {
    (async () => {
      const t = await getTrending();
      setTrending(t.results || []);
      const randomPage = Math.floor(Math.random() * 20) + 1;
      const d = await discoverMovies({ page: randomPage });
      setMovies(d.results || []);
      setPage(d.page || randomPage);
      setTotal(d.total_pages || 1);
    })();
  }, []);

  const loadMore = useCallback(async () => {
    if (loading || page >= total) return;
    setLoading(true);
    const d = await discoverMovies({ page: page + 1 });
    setMovies((prev) => [...prev, ...(d.results || [])]);
    setPage(d.page || page + 1);
    setLoading(false);
  }, [loading, page, total]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const next = (page % total) + 1;
    const d = await discoverMovies({ page: next });
    setMovies(d.results || []);
    setPage(d.page || next);
    setRefreshing(false);
  }, [page, total]);

  return (
    <SafeScreen>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Typo size={20} fontWeight="700" color={colors.white}>
          Discover
        </Typo>
      </View>

      <FlatList
        data={movies}
        keyExtractor={(i) => String(i.id)}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.gridContainer}
        renderItem={renderGrid}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && (
            <ActivityIndicator color={colors.primary} style={{ margin: 16 }} />
          )
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      />
    </SafeScreen>
  );
}
