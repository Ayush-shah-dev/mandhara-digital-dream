import logo from "@/assets/herolog.png";

/** Animated golden emblem ring that draws itself, wrapping the Mandhara mark. */
export function Emblem({
  size = 160,
  className,
  mark = true,
}: {
  size?: number;
  className?: string;
  mark?: boolean;
}) {
  return (
    <div
      className={`relative grid place-items-center ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 200 200"
        className="spin-slow absolute inset-0 h-full w-full text-glow"
        aria-hidden="true"
      >
        <circle
          cx="100"
          cy="100"
          r="92"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeDasharray="2 6"
          opacity="0.7"
        />
        <circle
          cx="100"
          cy="100"
          r="80"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeDasharray="580"
          strokeDashoffset="580"
          style={{ animation: "draw 2.6s cubic-bezier(.16,1,.3,1) forwards" }}
        />
      </svg>
      <div
        className="pointer-events-none absolute h-[76%] w-[76%] rounded-full"
        style={{
          background: "radial-gradient(ellipse, rgba(248,245,240,.34) 0%, rgba(184,145,70,.18) 38%, transparent 72%)",
          filter: "blur(12px)",
        }}
        aria-hidden="true"
      />
      {mark && (
        <img
          src={logo}
          alt="Mandhara emblem"
          className="relative z-10 h-[128%] w-[128%] object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,.2)]"
          loading="lazy"
        />
      )}
    </div>
  );
}

export const logoUrl = logo;
