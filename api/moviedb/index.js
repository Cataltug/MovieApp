import axios from "axios";
import { TMDB_API_KEY } from "@env";

const API_KEY = TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY },
});

export async function getTrending() {
  const res = await tmdb.get("/trending/movie/week");
  return res.data;
}

export async function searchMovies(query, page = 1) {
  const res = await tmdb.get("/search/movie", {
    params: { query, page },
  });
  return res.data;
}

export async function getGenreList() {
  const res = await tmdb.get("/genre/movie/list");
  return res.data.genres;
}

export async function discoverMovies({
  genreId = null,
  ratingGte = null,
  page = 1,
}) {
  const params = { sort_by: "popularity.desc", page };
  if (genreId) params.with_genres = genreId;
  if (ratingGte) params["vote_average.gte"] = ratingGte;
  const res = await tmdb.get("/discover/movie", { params });
  return res.data;
}

export async function getMovieDetail(id) {
  const res = await tmdb.get(`/movie/${id}`, {
    params: { append_to_response: "credits" },
  });
  return res.data;
}
