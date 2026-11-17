import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { LinkButton } from "./link-button";

type HeaderProps = {
  title: string;
  icon?: boolean;
  backButton?: boolean;
};

export function Header({
  title,
  icon = true,
  backButton = false,
}: HeaderProps) {
  return (
    <div className="flex flex-row items-center border-b border-border-app py-5 mx-5">
      <div className="flex-1">
        <h1 className="text-text-primary text-xl font-heading">
          {title}
        </h1>
      </div>

      {backButton ? (
        <LinkButton title="Voltar" to="/search" />
      ) : (
        icon && (
          <Link to="/search" className="relative">
            <button
              className="flex items-center justify-center cursor-pointer hover:bg-surface-elevated rounded-full transition-colors duration-200"
              style={{ width: 48, height: 48 }}
              aria-label="Pesquisar filmes"
            >
              <Search
                size={24}
                className="text-text-primary hover:text-primary-light transition-colors"
              />
            </button>
          </Link>
        )
      )}
    </div>
  );
}