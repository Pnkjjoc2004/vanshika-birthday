import { useEffect, useRef } from "react";

export function WingsOfGloryBadge() {
  const contrailRef = useRef(null);
  const cloudsRef = useRef(null);

  useEffect(() => {
    // Animate contrail
    if (contrailRef.current) {
      const animate = () => {
        const time = Date.now() / 1000;
        const dashOffset = (time * 2) % 20;
        if (contrailRef.current) {
          contrailRef.current.style.strokeDashoffset = `${dashOffset}`;
        }
        requestAnimationFrame(animate);
      };

      const animation = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animation);
    }

    // Animate clouds
    if (cloudsRef.current) {
      const animate = () => {
        const time = Date.now() / 1000;
        const x = Math.sin(time * 0.5) * 10;
        if (cloudsRef.current) {
          cloudsRef.current.setAttribute("transform", `translate(${x}, 0)`);
        }
        requestAnimationFrame(animate);
      };

      const animation = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animation);
    }
  }, []);

  return (
    <div className="w-64 h-64 relative flex items-center justify-center">
      <div className="absolute w-56 h-56 rounded-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-400 to-amber-500 animate-spin-slow opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-blue-500 opacity-40"></div>
        <div className="absolute inset-0 bg-yellow-400 opacity-20 blur-xl rounded-full"></div>
      </div>

      <div className="absolute w-48 h-48 rounded-full bg-gradient-to-b from-blue-900 to-indigo-900 border-4 border-blue-300 flex items-center justify-center overflow-hidden">
        <div className="absolute w-full h-full">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 h-full w-2 bg-gradient-to-t from-transparent to-yellow-300 opacity-60"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
                animation: `pulse ${1 + (i % 3) * 0.2}s infinite alternate ${
                  i * 0.1
                }s`,
              }}
            />
          ))}
        </div>

        <div className="absolute w-full" style={{ top: "60%" }}>
          <svg width="100%" height="20" viewBox="0 0 100 20">
            <path
              ref={cloudsRef}
              d="M0 10C10 5 20 15 30 10C40 5 50 15 60 10C70 5 80 15 90 10C100 5 110 10 110 10V20H0V10Z"
              fill="white"
              opacity="0.8"
            />
            <path
              d="M-10 15C0 10 10 20 20 15C30 10 40 20 50 15C60 10 70 20 80 15C90 10 100 15 100 15V20H-10V15Z"
              fill="white"
              opacity="0.5"
            />
          </svg>
        </div>

        <div className="relative z-10">
          <svg viewBox="0 0 60 60" width="100" height="100">
            <path
              ref={contrailRef}
              d="M30 55C30 55 31 48 30 40C29 35 30 30 30 30"
              stroke="white"
              strokeWidth="2"
              strokeDasharray="3,3"
              className="opacity-80"
            />
            <path
              d="M30 55C30 55 31 48 30 40C29 35 30 30 30 30"
              stroke="white"
              strokeWidth="0.5"
              className="opacity-40 blur-sm"
            />
            <path d="M30 5L50 30H10L30 5Z" fill="#E5E7EB" />
            <path d="M25 30L18 22L22 15L30 30L25 30Z" fill="#D1D5DB" />
            <path d="M35 30L42 22L38 15L30 30L35 30Z" fill="#D1D5DB" />
            <rect x="27" y="5" width="6" height="30" fill="#F3F4F6" />
            <path d="M27 30V40H33V30H27Z" fill="#D1D5DB" />
            <path d="M30 33L24 45H36L30 33Z" fill="#F3F4F6" />
            <ellipse cx="30" cy="12" rx="3" ry="5" fill="#60A5FA" />
            <ellipse cx="30" cy="12" rx="2" ry="3" fill="#93C5FD" />
            <path d="M30 5L34 10L26 10L30 5Z" fill="white" opacity="0.7" />
            <path d="M22 22L26 27L18 27L22 22Z" fill="white" opacity="0.5" />
            <path d="M38 22L34 27L42 27L38 22Z" fill="white" opacity="0.5" />
            <circle
              cx="30"
              cy="45"
              r="1"
              fill="#FCD34D"
              className="animate-pulse"
            />
          </svg>
        </div>
      </div>

      <div className="absolute w-full h-full flex items-center justify-center">
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <g className="animate-pulse">
            <path
              d="M30 50C22 35 15 30 8 35C20 42 25 48 30 50Z"
              stroke="#FFD700"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M30 50C22 65 15 70 8 65C20 58 25 52 30 50Z"
              stroke="#FFD700"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M32 35C24 20 17 15 10 20C22 27 27 33 32 35Z"
              stroke="#FFD700"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M32 65C24 80 17 85 10 80C22 73 27 67 32 65Z"
              stroke="#FFD700"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M30 50C22 35 15 30 8 35C20 42 25 48 30 50Z"
              stroke="#FFF"
              strokeWidth="1"
              opacity="0.6"
              filter="blur(1px)"
            />
            <path
              d="M30 50C22 65 15 70 8 65C20 58 25 52 30 50Z"
              stroke="#FFF"
              strokeWidth="1"
              opacity="0.6"
              filter="blur(1px)"
            />
          </g>
          <g className="animate-pulse animation-delay-300">
            <path
              d="M70 50C78 35 85 30 92 35C80 42 75 48 70 50Z"
              stroke="#FFD700"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M70 50C78 65 85 70 92 65C80 58 75 52 70 50Z"
              stroke="#FFD700"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M68 35C76 20 83 15 90 20C78 27 73 33 68 35Z"
              stroke="#FFD700"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M68 65C76 80 83 85 90 80C78 73 73 67 68 65Z"
              stroke="#FFD700"
              fill="none"
              strokeWidth="2"
            />
            <path
              d="M70 50C78 35 85 30 92 35C80 42 75 48 70 50Z"
              stroke="#FFF"
              strokeWidth="1"
              opacity="0.6"
              filter="blur(1px)"
            />
            <path
              d="M70 50C78 65 85 70 92 65C80 58 75 52 70 50Z"
              stroke="#FFF"
              strokeWidth="1"
              opacity="0.6"
              filter="blur(1px)"
            />
          </g>
        </svg>
      </div>

      <div className="absolute w-full h-full pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `sparkle ${
                1 + Math.random()
              }s infinite alternate ${Math.random()}s`,
              boxShadow: "0 0 3px 1px rgba(255, 255, 255, 0.7)",
            }}
          />
        ))}
      </div>

      <div className="absolute -bottom-2 w-full text-center">
        <div className="bg-gradient-to-r from-amber-600 to-amber-500 text-xs font-bold text-white py-1 px-3 rounded-full inline-block">
          WINGS OF GLORY
        </div>
      </div>
    </div>
  );
}
