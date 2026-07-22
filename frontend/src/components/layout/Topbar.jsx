import { useAuth } from "../../hooks/useAuth";

export default function Topbar() {
  const { username, logout } = useAuth();
  const initial = username ? username.charAt(0).toUpperCase() : "?";

  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-5 py-4 lg:hidden">
      <div className="flex items-center gap-2 font-display text-base font-semibold text-ink">
        <span className="flex h-6 w-6 items-center justify-center rounded bg-accent text-white">
          <span className="h-2 w-2 rounded-sm bg-white" />
        </span>
        Tasks
      </div>
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ink text-xs font-semibold text-white">
          {initial}
        </span>
        <button
          type="button"
          onClick={logout}
          className="text-sm font-medium text-muted hover:text-danger"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
