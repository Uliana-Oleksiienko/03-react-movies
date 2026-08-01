
import axios from "axios";
import type { Movie } from "../types/movie";

const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface MovieHttpProps {
  results: Movie[];
}

axios.defaults.baseURL = "https://api.themoviedb.org/3";

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const options = {
    params: { query: `${query}`, include_adult: false, api_key: myKey },
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${myKey}`,
    },
  };

  try {
    const response = await axios.get<MovieHttpProps>("search/movie", options);
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies");
    throw error;
  }
};