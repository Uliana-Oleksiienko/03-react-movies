import axios from "axios";
import type { Movie } from "../types/movie";

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

if (!API_TOKEN) {
  console.error('VITE_TMDB_TOKEN is not defined in .env file');
}

interface MoviesResponse {
  results: Movie[];
}

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_TOKEN}`, // ← ТІЛЬКИ ТУТ!
  },
});

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  if (!query?.trim()) {
    return [];
  }

  try {
    const response = await api.get<MoviesResponse>("/search/movie", {
      params: {
        query: query.trim(),
        include_adult: false,
        language: "en-US",
        page: 1,
      },
    });

    return response.data?.results || [];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("TMDB API Error:", {
        status: error.response?.status,
        message: error.response?.data?.status_message || error.message,
      });
    }
    throw error;
  }
};

export const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500'): string => {
  if (!path) {
    return 'https://via.placeholder.com/500x750?text=No+Image';
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};