import logo from "@/assets/mandhara-logo.png.asset.json";

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
        className="spin-slow absolute inset-0 h-full w-full text-accent"
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
      {mark && (
        <img
          src={logo.url}
          alt="Mandhara emblem"
          className="relative h-[64%] w-[64%] object-contain"
          loading="lazy"
        />
      )}
    </div>
  );
}

export const logoUrl = logo.url;
