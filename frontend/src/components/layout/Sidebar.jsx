import { useAuth } from "../../hooks/useAuth";

export default function Sidebar() {
  const { username, logout } = useAuth();

  const initial = username ? username.charAt(0).toUpperCase() : "?";

  return (
    <aside className="hidden w-60 shrink-0 flex-col justify-between border-r border-border bg-surface px-4 py-6 lg:flex">
      <div>
        <div className="mb-8 flex items-center gap-2 px-2 font-display text-lg font-semibold text-ink">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-accent text-white">
            <span className="h-2 w-2 rounded-sm bg-white" />
          </span>
          Tasks
        </div>

        <nav className="flex flex-col gap-1">
          <span className="flex items-center gap-2.5 rounded-md bg-accent-ink px-3 py-2 text-sm font-medium text-accent-hover">
            <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.7">
              <rect x="3.5" y="3.5" width="13" height="13" rx="3" />
              <path d="M7 10l2 2 4-4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Dashboard
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-2.5 rounded-md border border-border px-3 py-2.5">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
          {initial}
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-ink">{username}</span>
        <button
          type="button"
          onClick={logout}
          className="shrink-0 text-muted transition-colors hover:text-danger"
          aria-label="Sign out"
          title="Sign out"
        >
          <svg viewBox="0 0 20 20" className="h-4 w-4 fill-none stroke-current" strokeWidth="1.7">
            <path
              d="M7.5 3.5H5a1.5 1.5 0 00-1.5 1.5v10A1.5 1.5 0 005 16.5h2.5M13 13.5l3.5-3.5L13 6.5M16 10H7.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </aside>
  );
}
