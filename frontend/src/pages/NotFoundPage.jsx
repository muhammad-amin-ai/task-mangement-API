import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 bg-bg px-6 text-center">
      <p className="font-mono text-sm text-subtle">404</p>
      <h1 className="font-display text-2xl font-semibold text-ink">Page not found</h1>
      <p className="max-w-sm text-sm text-muted">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/dashboard"
        className="mt-2 text-sm font-medium text-accent hover:text-accent-hover"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
