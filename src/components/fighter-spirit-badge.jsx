import { useEffect, useRef } from "react";

export function FighterSpiritBadge() {
  const heartRef = useRef(null);

  useEffect(() => {
    // Animate heart contrail
    if (heartRef.current) {
      const animate = () => {
        const time = Date.now() / 1000;
        const dashOffset = (time * 5) % 20;
        if (heartRef.current) {
          heartRef.current.style.strokeDashoffset = `${dashOffset}`;
        }
        requestAnimationFrame(animate);
      };

      const animation = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animation);
    }
  }, []);

  return (
    <div className="w-64 h-64 relative flex items-center justify-center">
      {/* Enhanced background with pulsing effect */}
      <div
        className="absolute w-56 h-56 bg-gradient-to-b from-red-600 to-red-800 animate-pulse-slow"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        {/* Glow effect */}
        <div
          className="absolute inset-0 bg-red-500 opacity-30 blur-md"
          style={{
            clipPath:
              "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          }}
        ></div>
      </div>

      {/* Inner shield with enhanced depth */}
      <div
        className="absolute w-48 h-48 bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
          boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
        }}
      >
        {/* Dynamic background pattern */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-full w-1 bg-white"
              style={{
                left: `${10 * i}%`,
                transform: `rotate(${45 + i * 5}deg)`,
                transformOrigin: "center",
              }}
            />
          ))}
        </div>

        {/* Stars at top with enhanced glow */}
        <div className="absolute top-2 w-full flex justify-center">
          <div className="flex space-x-3">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="text-yellow-400 text-base"
                style={{
                  animation: `twinkle ${1 + i * 0.2}s infinite alternate ${
                    i * 0.3
                  }s`,
                  textShadow: "0 0 5px rgba(250, 204, 21, 0.7)",
                }}
              >
                ★
              </div>
            ))}
          </div>
        </div>

        {/* Crossed Jets with Heart */}
        <div className="relative">
          <svg viewBox="0 0 60 60" width="100" height="90">
            {/* Heart contrail with animation */}
            <path
              ref={heartRef}
              d="M30 40C30 40 10 20 10 12C10 5 25 5 30 20C35 5 50 5 50 12C50 20 30 40 30 40Z"
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="2"
              strokeDasharray="2,2"
              className="opacity-80"
              style={{
                filter: "drop-shadow(0 0 3px rgba(255, 107, 107, 0.7))",
              }}
            />

            {/* Glowing heart center */}
            <path
              d="M30 40C30 40 10 20 10 12C10 5 25 5 30 20C35 5 50 5 50 12C50 20 30 40 30 40Z"
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="0.5"
              className="opacity-50"
            />

            {/* Jets - increased size with enhanced details */}
            <g transform="rotate(45, 30, 20)">
              <path d="M22 20L15 12L15 8L20 12L22 20Z" fill="#D1D5DB" />
              <path d="M38 20L45 12L45 8L40 12L38 20Z" fill="#D1D5DB" />
              <rect x="27" y="5" width="6" height="20" fill="#D1D5DB" />

              {/* Added details */}
              <rect x="28" y="7" width="4" height="16" fill="#F3F4F6" />
              <rect x="29" y="10" width="2" height="10" fill="#A7F3FF" />

              {/* Engine glow */}
              <circle
                cx="30"
                cy="25"
                r="1"
                fill="#FF6B6B"
                className="animate-pulse"
              />
            </g>

            {/* Another jet in opposite direction */}
            <g transform="rotate(-45, 30, 20)">
              <path d="M22 20L15 12L15 8L20 12L22 20Z" fill="#D1D5DB" />
              <path d="M38 20L45 12L45 8L40 12L38 20Z" fill="#D1D5DB" />
              <rect x="27" y="5" width="6" height="20" fill="#D1D5DB" />

              {/* Added details */}
              <rect x="28" y="7" width="4" height="16" fill="#F3F4F6" />
              <rect x="29" y="10" width="2" height="10" fill="#A7F3FF" />

              {/* Engine glow */}
              <circle
                cx="30"
                cy="25"
                r="1"
                fill="#FF6B6B"
                className="animate-pulse"
              />
            </g>
          </svg>
        </div>

        {/* Enhanced banner with metallic effect */}
        <div className="absolute bottom-4 w-full px-2">
          <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 text-center py-2 text-sm font-bold text-black relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-30"></div>
            <span
              className="relative z-10"
              style={{ textShadow: "0px 1px 1px rgba(0,0,0,0.3)" }}
            >
              FIGHTER SPIRIT
            </span>
          </div>
        </div>
      </div>

      {/* Enhanced stripes effect with animation */}
      <div
        className="absolute w-48 h-48 overflow-hidden"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      >
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute h-3 bg-red-500 opacity-30"
            style={{
              top: `${25 + i * 15}%`,
              left: 0,
              right: 0,
              animation: `slide ${3 + i * 0.5}s infinite alternate ${i * 0.2}s`,
              transform: `skewY(${5 - i * 2}deg)`,
            }}
          />
        ))}
      </div>

      {/* Outer border glow */}
      <div
        className="absolute w-56 h-56 border-2 border-red-400 opacity-50"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
      ></div>

      {/* Sparkle effects */}
      <div className="absolute w-full h-full pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              top: `${20 + Math.random() * 60}%`,
              left: `${20 + Math.random() * 60}%`,
              animation: `sparkle ${
                1 + Math.random()
              }s infinite alternate ${Math.random()}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
