export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16">
      <div className="relative h-12 w-12">
        <div className="absolute inset-0 rounded-full border-4 border-white/10" />
        <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-teal-500" />
      </div>
      <p className="text-sm font-medium text-neutral-400">Loading live data...</p>
    </div>
  );
}

export function LoadingCard() {
  return (
    <div className="card space-y-4 p-6 bg-white/5 border-white/5">
      <div className="h-6 w-1/3 rounded bg-white/10 loading-pulse" />
      <div className="space-y-2">
        <div className="h-4 w-full rounded bg-white/10 loading-pulse" />
        <div className="h-4 w-2/3 rounded bg-white/10 loading-pulse" />
      </div>
    </div>
  );
}
