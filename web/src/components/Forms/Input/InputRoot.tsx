import { ReactNode } from "react";

interface InputRootProps {
  children: ReactNode;
  className?: string;
}

export function InputRoot({ children, className = "" }: InputRootProps) {
  return <div className={`container-input ${className}`.trim()}>{children}</div>;
}
