import { STATUS_FILTERS } from "../../utils/constants";

export default function TaskFilterTabs({ activeFilter, onChange, counts }) {
  return (
    <div className="flex flex-wrap gap-1.5 rounded-lg border border-border bg-surface p-1">
      {STATUS_FILTERS.map((filter) => {
        const isActive = filter.value === activeFilter;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              isActive ? "bg-accent text-white" : "text-muted hover:bg-bg hover:text-ink"
            }`}
          >
            {filter.label}
            <span
              className={`rounded-full px-1.5 text-xs ${
                isActive ? "bg-white/20" : "bg-bg text-subtle"
              }`}
            >
              {counts[filter.value] ?? 0}
            </span>
          </button>
        );
      })}
    </div>
  );
}
