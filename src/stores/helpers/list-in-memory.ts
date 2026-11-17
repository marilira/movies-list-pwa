import type { MovieListProps } from "../list-store";
import type { SelectedMovieProps } from "../../types/movie";

export function add(
  movies: MovieListProps[],
  newMovie: SelectedMovieProps,
  watched: boolean
) {
  const existingMovie = movies.find(
    ({ id }) => newMovie.id === id
  );

  if (existingMovie) {
    return movies.map((movie) =>
      movie.id === existingMovie.id
        ? {
            ...movie,
            watched,
          }
        : movie
    );
  }

  return [
    ...movies,
    {
      ...newMovie,
      watched,
    },
  ];
}

export function remove(
  movies: MovieListProps[],
  movieRemovedId: string
) {
  return movies.filter(
    (movie) => movie.id !== movieRemovedId
  );
}