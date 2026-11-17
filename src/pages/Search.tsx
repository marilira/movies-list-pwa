import { useNavigate } from "react-router-dom";

import { Header } from "../components/header";
import { Button } from "../components/button";
import { LinkButton } from "../components/link-button";
import { Input } from "../components/input";

import { useDataStore } from "../stores/data-store";

export default function Search() {
  const navigate = useNavigate();

  const movieInput = useDataStore((state) => state.movieInput);
  const setMovieInput = useDataStore((state) => state.setMovieInput);
  const setLoading = useDataStore((state) => state.setLoading);
  const clear = useDataStore((state) => state.clear);
  const setMovies = useDataStore((state) => state.setMovies);

  const handleSearch = async () => {
    if (!movieInput.trim()) {
      window.alert("Informe o título de um filme.");
      return;
    }

    setLoading(true);
    clear();
    navigate("/results");

    try {
      if (!navigator.onLine) {
        throw new Error("Sem conexão com a internet");
      }

      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_TMDB_API_KEY}&query=${encodeURIComponent(movieInput)}&language=pt-BR`
      );

      if (!response.ok) {
        throw new Error("Não foi possível buscar os filmes.");
      }

      const data = await response.json();

      setMovies(data.results);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);

      const message =
        error instanceof Error ? error.message : "Erro desconhecido";

      window.alert(
        `Algo deu errado durante essa pesquisa.\n\nErro: ${message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-8 bg-slate-900 flex flex-col">
      <Header title="Buscar filmes" icon={false} />

      <form
        className="p-5 flex-1 flex flex-col justify-center"
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch();
        }}
      >
        <Input
          placeholder="Informe o título do filme..."
          value={movieInput}
          onChange={(event) => setMovieInput(event.target.value)}
        />

        <div className="mt-auto pt-5 flex flex-col gap-5">
          <Button type="submit">
            <Button.Text>Buscar</Button.Text>
          </Button>

          <LinkButton
            title="Voltar para minha lista"
            to="/"
          />
        </div>
      </form>
    </div>
  );
}
