import { Link, type LinkProps } from "react-router-dom";

type LinkButtonProps = LinkProps & {
  title: string;
};

export function LinkButton({
  title,
  ...rest
}: LinkButtonProps) {
  return (
    <Link
      className="text-text-secondary hover:text-primary-light text-center text-base font-body transition-colors duration-200 cursor-pointer"
      {...rest}
    >
      {title}
    </Link>
  );
}