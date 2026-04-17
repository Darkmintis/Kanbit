export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="relative h-12 w-12">
        <div className="theme-divider absolute inset-0 rounded-full border-4" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-teal-500" />
      </div>
      <p className="theme-muted text-sm font-medium">Loading live data...</p>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="card theme-surface-soft space-y-4 p-6">
      <div className="theme-surface-softer h-6 w-1/3 rounded loading-pulse" />
      <div className="space-y-2">
        <div className="theme-surface-softer h-4 w-full rounded loading-pulse" />
        <div className="theme-surface-softer h-4 w-2/3 rounded loading-pulse" />
      </div>
    </div>
  );
}
