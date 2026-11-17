import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import * as listInMemory from "./helpers/list-in-memory";
import { CATEGORIES } from "../utils/data/movies";

export type SelectedMovieProps = {
  id: string;
  title: string;
  overview: string;
  poster_path: string;
};

type CategoryStoreProps = {
  category: string;
  watched: boolean;
  handleCategorySelect: (selectedCategory: string) => void;
};

export const useCategoryStore = create<CategoryStoreProps>((set) => ({
  category: CATEGORIES[0],

  watched: false,

  handleCategorySelect: (selectedCategory) => {
    set(() => ({
      category: selectedCategory,
      watched: selectedCategory !== CATEGORIES[0],
    }));
  },
}));

export type MovieListProps = SelectedMovieProps & {
  watched?: boolean;
};

type StateProps = {
  movies: MovieListProps[];

  add: (
    movie: SelectedMovieProps,
    watched: boolean
  ) => void;

  remove: (movieId: string) => void;

  clear: () => void;
};

export const useListStore = create(
  persist<StateProps>(
    (set) => ({
      movies: [],

      add: (
        movie: SelectedMovieProps,
        watched: boolean
      ) =>
        set((state) => ({
          movies: listInMemory.add(
            state.movies,
            movie,
            watched
          ),
        })),

      remove: (movieId: string) =>
        set((state) => ({
          movies: listInMemory.remove(
            state.movies,
            movieId
          ),
        })),

      clear: () => set({ movies: [] }),
    }),
    {
      name: "movies-list:list",

      storage: createJSONStorage(
        () => localStorage
      ),
    }
  )
);