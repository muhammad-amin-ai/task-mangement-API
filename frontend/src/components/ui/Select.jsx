export default function Select({ label, id, error, options, className = "", ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`h-10 rounded-md border bg-surface px-3 text-sm text-ink
          transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-accent/30
          ${error ? "border-danger" : "border-border focus:border-accent"} ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
