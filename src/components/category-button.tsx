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
        "bg-surface px-4 h-12 rounded-md flex items-center justify-center cursor-pointer transition-all duration-200",
        isSelected
          ? "border-2 border-primary-light bg-surface-elevated"
          : "border-2 border-transparent hover:bg-surface-elevated"
      )}
      {...rest}
    >
      {isSelected ? (
        <div className="flex flex-row items-center">
          <span className="text-text-primary font-subtitle text-sm">
            {title}
          </span>

          <span className="text-text-primary font-subtitle text-sm bg-primary px-2 ml-2 rounded-md">
            {qtd}
          </span>
        </div>
      ) : (
        <span className="text-text-secondary font-subtitle text-sm">
          {title}
        </span>
      )}
    </button>
  );
}