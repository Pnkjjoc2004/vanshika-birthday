/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

export default function FighterJet({
  color = "#4A5568",
  size = 200,
  rotation = 0,
}) {
  const [afterburner, setAfterburner] = useState(false);

  // Toggle afterburner effect every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setAfterburner((prev) => !prev);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <div
        className="transition-transform duration-300"
        style={{
          transform: `rotate(${rotation}deg)`,
          width: `${size}px`,
          height: `${size * 0.6}px`,
        }}
      >
        <svg viewBox="0 0 200 120" width="100%" height="100%">
          {/* Afterburner effect */}
          {afterburner && (
            <>
              <ellipse
                cx="5"
                cy="60"
                rx="15"
                ry="10"
                fill="orange"
                className="animate-pulse opacity-70"
              />
              <ellipse
                cx="-5"
                cy="60"
                rx="20"
                ry="14"
                fill="#FF4500"
                className="animate-pulse opacity-50"
              />
            </>
          )}

          {/* Contrail/exhaust */}
          <path
            d="M5 60H-40"
            stroke="white"
            strokeWidth="3"
            strokeDasharray="4,6"
            className="opacity-60"
          />
          <path
            d="M-5 60H-60"
            stroke="white"
            strokeWidth="2"
            strokeDasharray="3,8"
            className="opacity-40"
          />

          {/* Tail fin */}
          <path d="M40 25L30 10L45 30L30 30L40 25Z" fill={color} />

          {/* Rear stabilizers */}
          <path d="M40 60L25 75L45 65L40 60Z" fill={color} />
          <path d="M40 60L25 45L45 55L40 60Z" fill={color} />

          {/* Main body */}
          <path d="M40 60L150 50L140 70L40 60Z" fill={color} />
          <path d="M40 60L150 70L140 50L40 60Z" fill={color} />
          <path d="M140 50L170 55L170 65L140 70Z" fill={color} />

          {/* Wings */}
          <path d="M90 60L70 30L95 35L110 60L95 85L70 90L90 60Z" fill={color} />

          {/* Cockpit */}
          <ellipse cx="130" cy="60" rx="15" ry="8" fill="#87CEEB" />
          <ellipse
            cx="133"
            cy="60"
            rx="10"
            ry="6"
            fill="#ADD8E6"
            opacity="0.7"
          />

          {/* Nose cone */}
          <path d="M150 60L190 57L190 63L150 60Z" fill={color} />

          {/* Weapons/fuel pods */}
          <rect x="80" y="35" width="15" height="5" rx="2" fill="#2D3748" />
          <rect x="80" y="80" width="15" height="5" rx="2" fill="#2D3748" />

          {/* Detail lines */}
          <path d="M60 60L140 60" stroke="#2D3748" strokeWidth="0.5" />
          <path d="M130 55L140 55" stroke="#2D3748" strokeWidth="0.5" />
          <path d="M130 65L140 65" stroke="#2D3748" strokeWidth="0.5" />

          {/* Highlights */}
          <path
            d="M130 52L150 55"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.6"
          />
          <path
            d="M90 45L110 47"
            stroke="white"
            strokeWidth="0.5"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Shadow effect */}
      <div
        className="absolute top-3 -z-10 opacity-20 blur-md"
        style={{
          transform: `rotate(${rotation}deg) scaleY(0.3)`,
          width: `${size}px`,
          height: `${size * 0.6}px`,
          left: `${size * 0.05}px`,
        }}
      >
        <svg viewBox="0 0 200 120" width="100%" height="100%">
          <path d="M40 60L150 50L140 70L40 60Z" fill="black" />
          <path d="M90 60L70 30L95 35L110 60L95 85L70 90L90 60Z" fill="black" />
          <path d="M140 50L170 55L170 65L140 70Z" fill="black" />
        </svg>
      </div>
    </div>
  );
}
