import { useEffect, useRef } from "react";

export function SkyQueenBadge() {
  const wingRef = useRef(null);

  useEffect(() => {
    if (!wingRef.current) return;

    const wings = wingRef.current.querySelectorAll("path");

    const animate = () => {
      const time = Date.now() / 1000;
      wings.forEach((wing, i) => {
        const offset = i === 0 ? 0 : Math.PI;
        const y = Math.sin(time * 2 + offset) * 2;
        wing.setAttribute("transform", `translate(0, ${y})`);
      });
      requestAnimationFrame(animate);
    };

    const animation = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="w-64 h-64 relative flex items-center justify-center">
      {/* Animated colorful background with enhanced glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-cyan-300 animate-pulse">
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-50 blur-md"></div>
      </div>

      {/* Badge body */}
      <div className="absolute inset-2 rounded-full bg-blue-600 flex items-center justify-center overflow-hidden">
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute h-full w-2 bg-white opacity-20"
                style={{
                  left: `${12.5 * i + 6}%`,
                  transform: "rotate(45deg)",
                  transformOrigin: "center",
                }}
              />
            ))}
          </div>
        </div>

        {/* Animated stars in background */}
        <div className="absolute inset-0">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-white text-xs"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `twinkle ${
                  Math.random() * 3 + 2
                }s infinite alternate ${Math.random() * 2}s`,
                transform: `scale(${Math.random() * 0.5 + 0.5})`,
              }}
            >
              ★
            </div>
          ))}
        </div>

        <div className="relative z-10 w-48 h-48 rounded-full bg-gradient-to-b from-blue-900 to-blue-700 flex items-center justify-center border-4 border-blue-300">
          {/* Jet and Crown - Made bigger with enhanced details */}
          <div className="relative">
            <svg
              viewBox="0 0 60 60"
              width="100"
              height="100"
              className="fill-current text-blue-200"
            >
              {/* Crown with glow */}
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              <g filter="url(#glow)">
                <path d="M30 10L37 20H23L30 10Z" />
                <path d="M23 20H37V23H23V20Z" />
              </g>

              {/* Jet with enhanced details */}
              <path d="M30 50L23 32L17 26L30 32L37 26L30 50Z" />
              <path d="M26 24H34L30 45L26 24Z" />

              {/* Added details to make it more visible */}
              <path d="M30 26L27 23L33 23L30 26Z" fill="#A7F3FF" />
              <path d="M27 32L33 32L30 40L27 32Z" fill="#A7F3FF" />

              {/* Contrail effect */}
              <path
                d="M30 50 L30 55"
                stroke="#A7F3FF"
                strokeWidth="0.5"
                strokeDasharray="1,1"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Wings with enhanced animation */}
      <div
        ref={wingRef}
        className="absolute w-full h-full flex items-center justify-center"
      >
        {/* Left Wing */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="absolute"
        >
          <path
            d="M50 50C35 43 20 43 5 48C20 53 35 54 50 50Z"
            fill="#60A5FA"
            className="opacity-90"
          />
          <path
            d="M50 50C35 43 20 43 5 48C20 53 35 54 50 50Z"
            fill="url(#leftWingGradient)"
            className="opacity-50"
          />
          <defs>
            <linearGradient
              id="leftWingGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>

        {/* Right Wing */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          className="absolute"
        >
          <path
            d="M50 50C65 43 80 43 95 48C80 53 65 54 50 50Z"
            fill="#60A5FA"
            className="opacity-90"
          />
          <path
            d="M50 50C65 43 80 43 95 48C80 53 65 54 50 50Z"
            fill="url(#rightWingGradient)"
            className="opacity-50"
          />
          <defs>
            <linearGradient
              id="rightWingGradient"
              x1="100%"
              y1="0%"
              x2="0%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Outer ring with text and enhanced glow */}
      <div className="absolute w-full h-full rounded-full flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border-2 border-blue-300 opacity-50"></div>
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <defs>
            <path
              id="circle"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
            />
            <filter id="textGlow">
              <feGaussianBlur stdDeviation="1" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <text className="fill-white font-bold" filter="url(#textGlow)">
            <textPath xlinkHref="#circle" startOffset="0%">
              • SKY QUEEN • YASHIKA SQUADRON •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Sparkle effects */}
      <div className="absolute w-full h-full pointer-events-none">
        {[...Array(4)].map((_, i) => (
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
