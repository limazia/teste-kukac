interface SpinnerProps {
  type?: "border" | "grow";
  colorClass?:
    | "primary"
    | "secondary"
    | "success"
    | "danger"
    | "warning"
    | "info"
    | "light"
    | "dark";
  title?: string;
  size?: string;
}

export function Spinner({
  type = "border",
  colorClass = "light",
  title = "Carregando...",
  size = "0.9rem",
}: SpinnerProps) {
  return (
    <div
      className={`spinner-${type} text-${colorClass}`}
      role="status"
      style={{
        width: size,
        height: size,
      }}
    >
      <span className="sr-only">{title}</span>
    </div>
  );
}
