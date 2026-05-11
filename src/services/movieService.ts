import axios from "axios"
import type { FetchMoviesResponse } from "../types/movie";
const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
});

const fetchMovies = async(query: string) : Promise<FetchMoviesResponse>=>{
const response = await api.get<FetchMoviesResponse>('/search/movie', {
    params: {
      query,
      include_adult: false,
      language: 'en-US',
      page: 1,
    },
  });
  return response.data;
};

export default fetchMovies