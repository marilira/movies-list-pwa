import { create } from "zustand";
import type { MovieApiProps } from "../types/movie";

type StateProps = {
  movies: MovieApiProps[];
  setMovies: (movies: MovieApiProps[]) => void;

  movieInput: string;
  setMovieInput: (input: string) => void;

  loading: boolean;
  setLoading: (isLoading: boolean) => void;

  fetchMovies: () => Promise<void>;
  clear: () => void;
};

export const useDataStore = create<StateProps>((set, get) => ({
  movies: [],

  setMovies: (movies) => set({ movies }),

  movieInput: "",

  setMovieInput: (input) =>
    set({ movieInput: input }),

  loading: false,

  setLoading: (isLoading) =>
    set({ loading: isLoading }),

  fetchMovies: async () => {
    try {
      set({ loading: true });

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${encodeURIComponent(
          get().movieInput
        )}`
      );

      const data = await response.json();

      set({
        movies: data.results ?? [],
        loading: false,
      });
    } catch (error) {
      console.error(error);

      set({
        loading: false,
      });
    }
  },

  clear: () =>
    set({
      movies: [],
    }),
}));