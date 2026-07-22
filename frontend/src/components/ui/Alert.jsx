export default function Alert({ variant = "error", children }) {
  if (!children) return null;

  const styles =
    variant === "error"
      ? "bg-danger-ink text-danger border-danger/20"
      : "bg-accent-ink text-accent-hover border-accent/20";

  return (
    <div role="alert" className={`rounded-md border px-3.5 py-2.5 text-sm ${styles}`}>
      {children}
    </div>
  );
}
