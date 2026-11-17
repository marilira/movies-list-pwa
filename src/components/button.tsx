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
      className="h-12 bg-green-400 rounded-md flex items-center justify-center flex-row cursor-pointer"
      {...rest}
    >
      {children}
      {icon && <Check size={20} />}
    </button>
  );
}

function ButtonText({ children }: ButtonTextProps) {
  return (
    <span className="textblack font-heading text-base mx-2">{children}</span>
  );
}

Button.Text = ButtonText;

export { Button };
