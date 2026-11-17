import { Link } from "react-router-dom";

import { Movie } from "../components/movie";
import { Loading } from "../components/loading";
import { useDataStore } from "../stores/data-store";
import { Header } from "../components/header";

export default function Results() {
  const loading = useDataStore((state) => state.loading);
  const movies = useDataStore((state) => state.movies);

  return (
    <div className="flex flex-col min-h-screen pt-8 bg-slate-900">
      <Header title="Resultados" backButton />
      {loading ? (
        <Loading />
      ) : movies && movies.length > 0 ? (
        <div className="flex-1 p-5 pb-24 overflow-y-auto">
          {movies.map((item) => (
            <Link key={item.id} to={`/data/${item.id}`}>
              <Movie
                data={{
                  id: item.id.toString(),
                  poster_path: item.poster_path,
                  title: item.original_title,
                  overview: item.overview,
                }}
                searched={true}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="font-body text-slate-400 text-center my-8">
          Nenhum filme encontrado :(
        </p>
      )}
    </div>
  );
}
