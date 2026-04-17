import { AlertTriangle } from "lucide-react";

export function ErrorAlert({ title, message }: { title: string; message: string }) {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 flex flex-col items-center text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20 text-red-400 mb-4">
        <AlertTriangle size={24} />
      </div>
      <h3 className="text-lg font-bold text-red-500 mb-2">{title}</h3>
      <p className="text-red-400 max-w-sm">{message}</p>
    </div>
  );
}
