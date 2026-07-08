import Link from "next/link";
import { Sparkles } from "@/app/components/ui/sparkles";

export default function RoutesPage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--bg-primary)] px-4">
      <Sparkles className="absolute inset-0" />
      <div className="relative z-10 text-center max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-sans">
          Too Chalo fir.. ☕
        </h1>
        <p className="text-slate-400 mb-8">
          Support my work with a chai / coffee.
        </p>
        <div className="bg-[var(--bg-card)] rounded-2xl border border-white/10 p-6 mb-6 shadow-xl">
          <p className="text-sm text-slate-400 mb-2">UPI ID</p>
          <p className="text-lg font-mono text-cyan-400 break-all">
            8102346798@ptyes
          </p>
          <div className="mt-4 w-40 h-40 mx-auto bg-white rounded-lg overflow-hidden flex items-center justify-center border border-white/10 p-2">
            <img
              src="/images/gallery/upiId.png"
              alt="UPI QR Code"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="mt-3 text-sm text-slate-400">Priyanshu Kumar</p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center justify-center h-12 px-6 rounded-lg font-medium bg-[var(--bg-secondary)] border border-white/10 text-white hover:border-cyan-500/40 hover:bg-cyan-500/10 transition-all"
        >
          Back to Portfolio
        </Link>
      </div>
    </div>
  );
}
