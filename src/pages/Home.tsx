import { useEffect } from "react";
import { Link } from "react-router-dom";

import {
  type MovieListProps,
  useCategoryStore,
  useListStore,
} from "../stores/list-store";

import { CATEGORIES } from "../utils/data/movies";

import { Header } from "../components/header";
import { Movie } from "../components/movie";
import { CategoryButton } from "../components/category-button";
import { useDataStore } from "../stores/data-store";

export default function Home() {
  const listStore = useListStore();

  const { category, watched, handleCategorySelect } = useCategoryStore();

  const clear = useDataStore((state) => state.clear);
  const setMovieInput = useDataStore((state) => state.setMovieInput);

  useEffect(() => {
    clear();
    setMovieInput("");
  }, [clear, setMovieInput]);

  // Filmes assistidos e não assistidos
  const watchedMovies = listStore.movies.filter((film) => film.watched);

  const unwatchedMovies = listStore.movies.filter((film) => !film.watched);

  // Remover filme da lista
  function handleMovieRemove(movie: MovieListProps) {
    const confirmed = window.confirm(
      `Deseja remover ${movie.title} da lista?`
    );

    if (confirmed) {
      listStore.remove(movie.id);
    }
  }

  // Renderizar lista de filmes
  function renderMovies(movies: MovieListProps[]) {
    if (movies.length === 0) {
      return (
        <p className="font-body text-text-secondary text-center my-8">
          {watched
            ? "Você não assistiu filmes ainda."
            : "Sua lista de filmes está vazia."}
        </p>
      );
    }

    return (
      <div className="flex-1 p-5 pb-24 overflow-y-auto">
        {movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <Movie
              data={movie}
              onLongPress={() => handleMovieRemove(movie)}
            />
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen pt-8 bg-background">
      <Header title="Minha lista" />

      {/* Categorias */}
      <div className="flex gap-3 px-5 mt-5 max-h-12 overflow-x-auto">
        {CATEGORIES.map((item) => (
          <CategoryButton
            key={item}
            title={item}
            isSelected={item === category}
            onClick={() => handleCategorySelect(item)}
          />
        ))}
      </div>

      {/* Lista de filmes */}
      {watched ? renderMovies(watchedMovies) : renderMovies(unwatchedMovies)}
    </div>
  );
}
