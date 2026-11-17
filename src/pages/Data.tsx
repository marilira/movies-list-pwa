import { useNavigate, useParams, Navigate } from "react-router-dom";
import { Check } from "lucide-react";

import { useDataStore } from "../stores/data-store";
import { useListStore } from "../stores/list-store";

import { Button } from "../components/button";
import { LinkButton } from "../components/link-button";

export default function Data() {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  const navigate = useNavigate();
  const { id } = useParams();

  const movies = useDataStore((state) => state.movies);

  const listMovies = useListStore((state) => state.movies);
  const add = useListStore((state) => state.add);

  const selectedMovie = movies.find(
    (movie) => movie.id.toString() === id
  );

  if (!selectedMovie) {
    return <Navigate to="/" replace />;
  }

  const saved = listMovies.find(
    (item) => item.id.toString() === id
  );

  function addToList() {
    if (!selectedMovie) return;

    const movieToAdd = {
      id: selectedMovie.id.toString(),
      title: selectedMovie.title,
      overview: selectedMovie.overview,
      poster_path: selectedMovie.poster_path,
    };

    add(movieToAdd, false);
    navigate(-1);
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="p-5 mt-8 flex-1 flex flex-col">
        <h1 className="text-text-heading text-2xl font-heading my-2 font-bold">
          {selectedMovie.title}
        </h1>

        <img
          src={`${IMAGE_PATH}${selectedMovie.poster_path}`}
          alt={`Pôster de ${selectedMovie.title}`}
          className="w-full h-80 object-contain"
        />

        <div className="overflow-y-auto mt-5">
          <p className="text-text-secondary font-body text-base leading-6 mb-6 text-justify">
            {selectedMovie.overview}
          </p>
        </div>
      </div>

      <div className="p-5 pb-8 flex flex-col gap-5">
        {saved ? (
          <div className="h-12 flex items-center justify-center">
            <span className="text-text-primary font-heading text-base mx-2 italic font-bold text-center">
              Filme já está salvo
            </span>

            <Check
              size={20}
              className="text-primary-selected"
            />
          </div>
        ) : (
          <Button onClick={addToList} icon={true}>
            <Button.Text>Adicionar à lista</Button.Text>
          </Button>
        )}

        <LinkButton title="Voltar" to="/results" />
      </div>
    </div>
  );
}
