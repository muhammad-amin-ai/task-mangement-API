export default function Textarea({ label, id, error, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <textarea
        id={id}
        className={`min-h-[96px] resize-y rounded-md border bg-surface px-3 py-2 text-sm text-ink
          placeholder:text-subtle transition-shadow duration-150 focus:outline-none
          focus:ring-2 focus:ring-accent/30
          ${error ? "border-danger" : "border-border focus:border-accent"} ${className}`}
        aria-invalid={Boolean(error)}
        {...props}
      />
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
