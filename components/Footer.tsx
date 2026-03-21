
export default function Footer() {
  return (
    <footer className="relative py-12 px-6 md:px-12 bg-[#1a1a1a] border-t border-white/5">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -bottom-20 left-0 right-0 h-40 bg-gradient-to-t from-electric-blue/3 to-transparent" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center">
          <div className="text-center">
            <p className="text-[#f5f3ee] font-bold text-lg tracking-tight">
              Atharva Sarnaik
            </p>
            <p className="text-gray-400 text-sm mt-1">
              © 2026 — All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
