import {
  useRef,
  type HTMLAttributes,
  type PointerEvent,
  type MouseEvent,
} from "react";

import { useListStore } from "../stores/list-store";
import type { SelectedMovieProps } from "../types/movie";

import list from "../assets/images/list.png";

type MovieProps = HTMLAttributes<HTMLDivElement> & {
  data: SelectedMovieProps;
  searched?: boolean;
  onLongPress?: () => void;
};

export function Movie({
  data,
  searched = false,
  onLongPress,
  ...rest
}: MovieProps) {
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

  const listStore = useListStore();

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressRef = useRef(false);

  const saved =
    searched &&
    listStore.movies.find((item) => item.id == data.id);

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    // Ignora o botão direito do mouse
    if (event.button !== 0) return;

    longPressRef.current = false;

    timerRef.current = setTimeout(() => {
      longPressRef.current = true;
      onLongPress?.();
    }, 600);
  }

  function handlePointerEnd() {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }

  function handleClickCapture(event: MouseEvent<HTMLDivElement>) {
    // Impede a navegação quando o usuário fez um clique prolongado
    if (longPressRef.current) {
      event.preventDefault();
      event.stopPropagation();
      longPressRef.current = false;
    }
  }

  return (
    <div
      {...rest}
      className={`w-full flex flex-row items-center pb-4 text-left ${rest.className ?? ""}`}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerEnd}
      onPointerLeave={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onClickCapture={handleClickCapture}
      onContextMenu={(event) => event.preventDefault()}
    >
      {saved && (
        <img
          src={list}
          alt="salvo"
          className="mr-2 w-5 h-5"
        />
      )}

      <img
        src={`${IMAGE_PATH}${data.poster_path}`}
        alt={data.title}
        className="w-20 h-20 rounded-md object-cover"
      />

      <div className="flex-1 ml-3">
        <div className="flex flex-row items-center">
          <h3 className="text-slate-100 font-subtitle text-base flex-1">
            {data.title}
          </h3>
        </div>

        <p
          className="
            text-slate-400
            text-xs
            leading-5
            mt-0.5
            text-justify
            overflow-hidden
          "
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
          }}
        >
          {data.overview}
        </p>
      </div>
    </div>
  );
}
