import { useEffect, useRef } from "react";

export function BirthdaySquadronBadge() {
  const orbitRef = useRef(null);
  const confettiRef = useRef(null);

  useEffect(() => {
    // Animate orbit
    if (orbitRef.current) {
      const animate = () => {
        const time = Date.now() / 1000;
        const rotation = (time * 20) % 360;
        if (orbitRef.current) {
          orbitRef.current.setAttribute(
            "transform",
            `rotate(${rotation}, 60, 60)`
          );
        }
        requestAnimationFrame(animate);
      };

      const animation = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animation);
    }

    // Add dynamic confetti
    if (confettiRef.current) {
      const container = confettiRef.current;
      const colors = ["#FF3366", "#33CCFF", "#FFCC00", "#66FF66", "#FF66FF"];

      const createConfetti = () => {
        const confetti = document.createElement("div");
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];

        confetti.style.position = "absolute";
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.borderRadius = Math.random() > 0.5 ? "50%" : "0";
        confetti.style.top = `${Math.random() * 100}%`;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confetti.style.opacity = "0";

        container.appendChild(confetti);

        // Animate
        const startTime = Date.now();
        const duration = Math.random() * 2000 + 1000;
        const startY = Number.parseFloat(confetti.style.top);

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = elapsed / duration;

          if (progress < 1) {
            confetti.style.opacity =
              progress < 0.2
                ? `${progress * 5}`
                : progress > 0.8
                ? `${(1 - progress) * 5}`
                : "1";
            confetti.style.top = `${startY - progress * 50}%`;
            requestAnimationFrame(animate);
          } else {
            container.removeChild(confetti);
          }
        };

        requestAnimationFrame(animate);
      };

      // Create confetti periodically
      const interval = setInterval(() => {
        for (let i = 0; i < 3; i++) {
          createConfetti();
        }
      }, 300);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="w-64 h-64 relative flex items-center justify-center">
      {/* Enhanced main circular badge background with rotation */}
      <div className="absolute w-56 h-56 rounded-full bg-gradient-to-br from-fuchsia-600 via-violet-600 to-indigo-700 animate-spin-slow">
        {/* Enhanced decorative outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-yellow-400 opacity-80"></div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-fuchsia-500 opacity-30 blur-md"></div>
      </div>

      {/* Inner badge content with enhanced depth */}
      <div className="absolute w-48 h-48 rounded-full bg-gradient-to-br from-purple-900 to-indigo-900 flex items-center justify-center overflow-hidden">
        {/* Enhanced celebration lights - rotating beams */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 h-full w-1 opacity-40"
              style={{
                background: `linear-gradient(to top, transparent, ${
                  ["#FF3366", "#33CCFF", "#FFCC00", "#66FF66", "#FF66FF"][i % 5]
                })`,
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              }}
            ></div>
          ))}
        </div>

        {/* Enhanced animated confetti particles */}
        <div ref={confettiRef} className="absolute inset-0 overflow-hidden">
          {/* Dynamic confetti will be added here via JS */}
        </div>

        {/* Enhanced center content with cake and aircraft */}
        <div className="relative z-10 w-40 h-40 flex items-center justify-center">
          <svg viewBox="0 0 120 120" width="120" height="120">
            {/* Enhanced celebration cake base with glow */}
            <filter id="cakeGlow">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>

            <g className="cake-group" filter="url(#cakeGlow)">
              {/* Bottom tier with enhanced details */}
              <rect
                x="30"
                y="85"
                width="60"
                height="15"
                rx="2"
                fill="#FF6B8B"
              />
              <rect x="30" y="82" width="60" height="5" rx="2" fill="#FFAEC9" />

              {/* Frosting drips */}
              {[...Array(6)].map((_, i) => (
                <path
                  key={i}
                  d={`M${35 + i * 10} 85 Q${35 + i * 10} 90, ${
                    33 + i * 10
                  } 90 Q${35 + i * 10} 90, ${37 + i * 10} 90`}
                  fill="#FFAEC9"
                />
              ))}

              {/* Middle tier with enhanced details */}
              <rect
                x="35"
                y="70"
                width="50"
                height="12"
                rx="2"
                fill="#66A1FF"
              />
              <rect x="35" y="67" width="50" height="5" rx="2" fill="#99C6FF" />

              {/* Frosting drips */}
              {[...Array(5)].map((_, i) => (
                <path
                  key={i}
                  d={`M${40 + i * 10} 70 Q${40 + i * 10} 75, ${
                    38 + i * 10
                  } 75 Q${40 + i * 10} 75, ${42 + i * 10} 75`}
                  fill="#99C6FF"
                />
              ))}

              {/* Top tier with enhanced details */}
              <rect
                x="45"
                y="55"
                width="30"
                height="12"
                rx="2"
                fill="#FFD54F"
              />
              <rect x="45" y="52" width="30" height="5" rx="2" fill="#FFECB3" />

              {/* Frosting drips */}
              {[...Array(3)].map((_, i) => (
                <path
                  key={i}
                  d={`M${50 + i * 10} 55 Q${50 + i * 10} 60, ${
                    48 + i * 10
                  } 60 Q${50 + i * 10} 60, ${52 + i * 10} 60`}
                  fill="#FFECB3"
                />
              ))}

              {/* Enhanced cake decorations */}
              {[...Array(5)].map((_, i) => (
                <circle key={i} cx={40 + i * 10} cy="85" r="2" fill="#FFFFFF" />
              ))}
              {[...Array(4)].map((_, i) => (
                <circle key={i} cx={42 + i * 12} cy="70" r="2" fill="#FFFFFF" />
              ))}

              {/* Enhanced candles */}
              <rect x="50" y="40" width="4" height="15" fill="#E0E0E0" />
              <rect x="66" y="40" width="4" height="15" fill="#E0E0E0" />

              {/* Enhanced flames with animation */}
              <path
                d="M52 36C52 36 49 40 52 40C55 40 52 36 52 36Z"
                fill="#FFCC00"
              />
              <path
                d="M52 36C52 36 49 40 52 40C55 40 52 36 52 36Z"
                fill="#FFFFFF"
                opacity="0.5"
              />

              <path
                d="M68 36C68 36 65 40 68 40C71 40 68 36 68 36Z"
                fill="#FFCC00"
              />
              <path
                d="M68 36C68 36 65 40 68 40C71 40 68 36 68 36Z"
                fill="#FFFFFF"
                opacity="0.5"
              />
            </g>

            {/* Enhanced flying aircraft formation around cake */}
            <g ref={orbitRef} className="aircraft-formation">
              {/* Lead aircraft with enhanced details */}
              <g transform="translate(60, 25)">
                <path d="M0 0L5 -8L-5 -8L0 0Z" fill="white" />
                <rect x="-1" y="-8" width="2" height="5" fill="white" />
                <path
                  d="M0 0Q0 -15 0 -20"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeDasharray="1,1"
                />

                {/* Cockpit highlight */}
                <circle cx="0" cy="-6" r="0.5" fill="#33CCFF" />
              </g>

              {/* Wingman 1 with enhanced details */}
              <g transform="translate(85, 45) rotate(45)">
                <path d="M0 0L4 -6L-4 -6L0 0Z" fill="white" />
                <rect x="-1" y="-6" width="2" height="4" fill="white" />
                <path
                  d="M0 0Q-5 -10 -10 -15"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeDasharray="1,1"
                />

                {/* Cockpit highlight */}
                <circle cx="0" cy="-4" r="0.5" fill="#33CCFF" />
              </g>

              {/* Wingman 2 with enhanced details */}
              <g transform="translate(35, 45) rotate(-45)">
                <path d="M0 0L4 -6L-4 -6L0 0Z" fill="white" />
                <rect x="-1" y="-6" width="2" height="4" fill="white" />
                <path
                  d="M0 0Q5 -10 10 -15"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                  strokeDasharray="1,1"
                />

                {/* Cockpit highlight */}
                <circle cx="0" cy="-4" r="0.5" fill="#33CCFF" />
              </g>

              {/* Enhanced smoke trails forming "20" */}
              <path
                d="M40 30C35 30 35 35 40 35C45 35 45 40 40 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="1,1"
              />
              <path
                d="M75 30L75 40M70 30L80 30M70 40L80 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
                strokeDasharray="1,1"
              />
            </g>

            {/* Enhanced hearts burst effect with animation */}
            <g>
              {[...Array(8)].map((_, i) => (
                <path
                  key={i}
                  d={`M${60 + 30 * Math.cos((i * Math.PI) / 4)} ${
                    60 + 30 * Math.sin((i * Math.PI) / 4)
                  }C${60 + 30 * Math.cos((i * Math.PI) / 4) - 5} ${
                    60 + 30 * Math.sin((i * Math.PI) / 4) - 10
                  } ${60 + 30 * Math.cos((i * Math.PI) / 4) - 10} ${
                    60 + 30 * Math.sin((i * Math.PI) / 4)
                  } ${60 + 30 * Math.cos((i * Math.PI) / 4)} ${
                    60 + 30 * Math.sin((i * Math.PI) / 4) + 5
                  }C${60 + 30 * Math.cos((i * Math.PI) / 4) + 10} ${
                    60 + 30 * Math.sin((i * Math.PI) / 4)
                  } ${60 + 30 * Math.cos((i * Math.PI) / 4) + 5} ${
                    60 + 30 * Math.sin((i * Math.PI) / 4) - 10
                  } ${60 + 30 * Math.cos((i * Math.PI) / 4)} ${
                    60 + 30 * Math.sin((i * Math.PI) / 4)
                  }`}
                  fill="#FF6666"
                  opacity={0.6 - (i % 2) * 0.2}
                />
              ))}
            </g>
          </svg>
        </div>
      </div>

      {/* Badge text ring with enhanced visibility */}
      <div className="absolute w-64 h-64 flex items-center justify-center">
        <div className="relative w-full h-full">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <defs>
              {/* Arc path: start at left center (20,100), sweep clockwise to right center (180,100) */}
              <path
                id="badgeTextPath"
                d="M20,100 A80,80 0 0,1 180,100"
                fill="none"
                stroke="none"
              />
              <filter
                id="textGlow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient
                id="textGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="50%" stopColor="#FFDD00" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
            <text
              className="font-bold"
              fontSize="18"
              fill="url(#textGradient)"
              filter="url(#textGlow)"
              letterSpacing="2"
            >
              <textPath href="#badgeTextPath" startOffset="0%" textLength="320">
                ★20th BIRTHDAY★...
              </textPath>
            </text>
          </svg>
        </div>
      </div>

      {/* Enhanced sparkle effects */}
      <div className="absolute w-full h-full pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              boxShadow: "0 0 3px 1px rgba(255, 255, 255, 0.7)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
