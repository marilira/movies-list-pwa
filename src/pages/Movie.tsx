import { useNavigate, useParams, Navigate } from "react-router-dom";

import {
  type MovieListProps,
  useListStore,
  useCategoryStore,
} from "../stores/list-store";

import { Button } from "../components/button";
import { LinkButton } from "../components/link-button";
import { CATEGORIES } from "../utils/data/movies";

export default function Movie() {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  const navigate = useNavigate();
  const { id } = useParams();

  const movies = useListStore((state) => state.movies);
  const add = useListStore((state) => state.add);

  const handleCategorySelect = useCategoryStore(
    (state) => state.handleCategorySelect,
  );

  const movie = movies.find(
    (movie: MovieListProps) => movie.id.toString() === id,
  );

  function handleAddToWatched() {
    if (movie) {
      add(movie, !movie.watched);
      handleCategorySelect(CATEGORIES[1]);
      navigate("/");
    }
  }

  function handleMovieRemove() {
    if (!movie) return;

    const confirmed = window.confirm(
      `Deseja remover ${movie.title} de Assistidos?`,
    );

    if (confirmed) {
      handleAddToWatched();
    }
  }

  if (!movie) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen pt-8 pb-8 bg-slate-900 flex flex-col">
      <img
        src={`${IMAGE_PATH}${movie.poster_path}`}
        alt={`Pôster de ${movie.title}`}
        className="w-full h-80 object-contain"
      />

      <div className="p-5 mt-8 flex-1 flex flex-col">
        <h1 className="text-violet-400 text-2xl font-heading my-2">
          {movie.title}
        </h1>

        <div className="overflow-y-auto">
          <p className="text-slate-400 font-body text-base leading-6 mb-6 text-justify">
            {movie.overview}
          </p>
        </div>
      </div>

      <div className="p-5 pb-8 flex flex-col gap-5">
        {movie.watched ? (
          <Button onClick={handleMovieRemove} icon={false}>
            <Button.Text>Desmarcar como assistido</Button.Text>
          </Button>
        ) : (
          <Button onClick={handleAddToWatched} icon={true}>
            <Button.Text>Marcar como assistido</Button.Text>
          </Button>
        )}

        <LinkButton title="Voltar para minha lista" to="/" />
      </div>
    </div>
  );
}
