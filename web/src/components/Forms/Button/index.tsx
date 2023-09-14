import { ReactNode, ButtonHTMLAttributes } from "react";

import { Spinner } from "@components/Spinner";

type ButtonProps = {
  children: ReactNode;
  loading?: boolean;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  loading,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button className={className} {...rest}>
      {loading ? <Spinner type="grow" width="1.2rem" height="1.2rem" /> : children}
    </button>
  );
}
