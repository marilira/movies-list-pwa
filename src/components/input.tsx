import type { TextareaHTMLAttributes } from "react";

type InputProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Input({ ...rest }: InputProps) {
  return (
    <textarea
      maxLength={300}
      className="h-32 w-full resize-none bg-slate-800 rounded-md px-4 py-3 font-body text-sm text-white placeholder:text-slate-400 outline-none"
      {...rest}
    />
  );
}
