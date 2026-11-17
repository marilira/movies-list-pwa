import type { ButtonHTMLAttributes } from "react";
import { clsx } from "clsx";

import { useListStore } from "../stores/list-store";
import { CATEGORIES } from "../utils/data/movies";

type CategoryProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
  isSelected?: boolean;
};

export function CategoryButton({
  title,
  isSelected,
  ...rest
}: CategoryProps) {
  const listStore = useListStore();

  const qtd =
    title === CATEGORIES[0]
      ? listStore.movies.reduce(
          (acc, item) => (!item.watched ? acc + 1 : acc),
          0
        )
      : listStore.movies.reduce(
          (acc, item) => (item.watched ? acc + 1 : acc),
          0
        );

  return (
    <button
      className={clsx(
        "bg-slate-800 px-4 h-12 rounded-md flex items-center justify-center cursor-pointer",
        isSelected && "border-2 border-lime-300"
      )}
      {...rest}
    >
      {isSelected ? (
        <div className="flex flex-row items-center">
          <span className="text-slate-100 font-subtitle text-sm">
            {title}
          </span>

          <span className="text-slate-100 font-subtitle text-sm bg-gray-700 ml-2 px-1 rounded-md">
            {qtd}
          </span>
        </div>
      ) : (
        <span className="text-slate-100 font-subtitle text-sm">
          {title}
        </span>
      )}
    </button>
  );
}