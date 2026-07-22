/**
 * Signature element: a stack of "task rows" rendered as pure CSS/SVG on the
 * branded panel — checkbox + title bar + priority stripe — echoing the
 * actual dashboard UI, so the first thing a new user sees is a preview of
 * the product itself rather than generic marketing art.
 */
function TaskPreviewStack() {
  const rows = [
    { done: true, width: "70%", priority: "bg-priority-low" },
    { done: true, width: "45%", priority: "bg-priority-low" },
    { done: false, width: "85%", priority: "bg-priority-high" },
    { done: false, width: "60%", priority: "bg-priority-medium" },
    { done: false, width: "38%", priority: "bg-priority-medium" },
  ];

  return (
    <div className="flex flex-col gap-3">
      {rows.map((row, i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg bg-white/[0.06] px-4 py-3 backdrop-blur-sm"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${row.priority}`} />
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
              row.done ? "border-white/0 bg-white/90" : "border-white/30"
            }`}
          >
            {row.done && (
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-none stroke-[#12141C]" strokeWidth="2">
                <path d="M2.5 6.5L5 9l4.5-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <span
            className={`h-2 rounded-full bg-white/25 ${row.done ? "opacity-40" : ""}`}
            style={{ width: row.width }}
          />
        </div>
      ))}
    </div>
  );
}

export default function AuthLayout({ eyebrow, title, subtitle, children }) {
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Branded panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink px-12 py-10 text-white lg:flex">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(600px circle at 15% 10%, rgba(53,82,224,0.5), transparent 60%), radial-gradient(500px circle at 90% 90%, rgba(53,82,224,0.35), transparent 55%)",
          }}
          aria-hidden="true"
        />
        <div className="relative flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-accent text-white">
            <span className="h-2 w-2 rounded-sm bg-white" />
          </span>
          Tasks
        </div>

        <div className="relative flex flex-col gap-8">
          <div className="max-w-sm">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-white/50">
              {eyebrow}
            </p>
            <h1 className="font-display text-3xl font-semibold leading-tight">{title}</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/60">{subtitle}</p>
          </div>
          <TaskPreviewStack />
        </div>

        <p className="relative text-xs text-white/40">
          Built on a FastAPI + MySQL backend, secured with JWT.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center bg-bg px-6 py-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
