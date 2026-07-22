export default function EmptyState({ title, subtitle, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border bg-surface px-6 py-16 text-center">
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-ink">
        <svg viewBox="0 0 20 20" className="h-5 w-5 fill-none stroke-accent" strokeWidth="1.7">
          <rect x="3.5" y="3.5" width="13" height="13" rx="3" />
          <path d="M7 10h6M10 7v6" strokeLinecap="round" />
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">{title}</p>
        <p className="mt-1 text-sm text-muted">{subtitle}</p>
      </div>
      {actionLabel && onAction && (
        <button
          type="button"
          onClick={onAction}
          className="mt-1 text-sm font-medium text-accent hover:text-accent-hover"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
