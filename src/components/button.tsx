import type { ReactNode, ButtonHTMLAttributes } from "react";
import { Check } from "lucide-react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: boolean;
};

type ButtonTextProps = {
  children: ReactNode;
};

function Button({ children, icon = false, ...rest }: ButtonProps) {
  return (
    <button
      className="h-12 bg-primary hover:bg-primary-light text-text-primary rounded-md flex items-center justify-center flex-row cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      {...rest}
    >
      {children}
      {icon && <Check size={20} className="ml-2" />}
    </button>
  );
}

function ButtonText({ children }: ButtonTextProps) {
  return (
    <span className="text-text-primary font-heading text-base mx-2">
      {children}
    </span>
  );
}

Button.Text = ButtonText;

export { Button };
