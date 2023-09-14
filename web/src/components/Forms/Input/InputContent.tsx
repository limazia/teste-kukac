import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function InputContent({ ...rest }: InputProps) {
  return <input className="form-control" {...rest} />;
}
