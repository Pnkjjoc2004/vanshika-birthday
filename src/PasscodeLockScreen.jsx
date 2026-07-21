import { useState } from "react";

const MAX_DIGITS = 4;

export default function PasscodeLockScreen({ onComplete, correctCode }) {
  const [code, setCode] = useState([]);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");

  const errors = [
    "Oops! Wrong code, my love. Try again 💕",
    "Not quite right… just like you're not quite mine yet? 😘",
    "Aww, you missed it. Guess you'll have to kiss me for a hint 💋",
    "Nope! Are you even thinking about me? 😤💖",
    "Wrong password, right person. Try again, baby 🥰",
    "Even my heart skips a beat when you get it right. Try again! 💓",
    "That's not it… but you're still my favorite person 💗",
    "Error 404: Correct code not found. Maybe a hug will help? 🤗",
  ];

  const handleDigit = (digit) => {
    if (code.length >= MAX_DIGITS) return;
    const next = [...code, digit];
    setCode(next);
    setError("");
    if (next.length === MAX_DIGITS) {
      if (next.join("") === correctCode) {
        if (onComplete) onComplete(next.join(""));
      } else {
        setShake(true);
        setError(errors[Math.floor(Math.random() * errors.length)]);
        setTimeout(() => { setShake(false); setCode([]); }, 600);
      }
    }
  };

  const handleClear = () => setCode([]);

  const handleBackspace = () => setCode((prev) => prev.slice(0, -1));

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  return (
    <div style={styles.body}>
      <div style={styles.screen} className={shake ? "shake" : ""}>
        <svg
          style={styles.sheetMusic}
          viewBox="0 0 230 160"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#f3e6d8" strokeWidth="1">
            <line x1="0" y1="30" x2="230" y2="18" />
            <line x1="0" y1="42" x2="230" y2="30" />
            <line x1="0" y1="54" x2="230" y2="42" />
            <line x1="0" y1="66" x2="230" y2="54" />
            <line x1="0" y1="78" x2="230" y2="66" />
          </g>
          <g stroke="#f3e6d8" strokeWidth="1">
            <line x1="0" y1="95" x2="230" y2="83" />
            <line x1="0" y1="107" x2="230" y2="95" />
            <line x1="0" y1="119" x2="230" y2="107" />
            <line x1="0" y1="131" x2="230" y2="119" />
            <line x1="0" y1="143" x2="230" y2="131" />
          </g>
          <g fill="#f3e6d8">
            <ellipse
              cx="35"
              cy="70"
              rx="6"
              ry="4.5"
              transform="rotate(-15 35 70)"
            />
            <rect x="40" y="35" width="2" height="35" />
            <ellipse
              cx="75"
              cy="60"
              rx="6"
              ry="4.5"
              transform="rotate(-15 75 60)"
            />
            <rect x="80" y="25" width="2" height="35" />
            <ellipse
              cx="115"
              cy="112"
              rx="6"
              ry="4.5"
              transform="rotate(-15 115 112)"
            />
            <rect x="120" y="77" width="2" height="35" />
            <ellipse
              cx="160"
              cy="100"
              rx="6"
              ry="4.5"
              transform="rotate(-15 160 100)"
            />
            <rect x="165" y="65" width="2" height="35" />
            <ellipse
              cx="195"
              cy="130"
              rx="6"
              ry="4.5"
              transform="rotate(-15 195 130)"
            />
            <rect x="200" y="95" width="2" height="35" />
          </g>
        </svg>

        <div style={styles.foldShadow} />

        <div style={styles.heartWrap}>
          <svg
            style={styles.heartPhoto}
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <clipPath id="heartClip">
                <path
                  d="M110 200
                     C 20 145, 5 95, 30 60
                     C 50 30, 90 30, 110 65
                     C 130 30, 170 30, 190 60
                     C 215 95, 200 145, 110 200 Z"
                />
              </clipPath>
            </defs>

            <path
              d="M110 208
                 C 14 150, -3 96, 24 58
                 C 46 25, 92 24, 110 62
                 C 128 24, 174 25, 196 58
                 C 223 96, 206 150, 110 208 Z"
              fill="#f3e6d8"
              opacity="0.5"
            />

            <g clipPath="url(#heartClip)">
              <rect x="10" y="20" width="200" height="200" fill="#bfe3ea" />
              <path
                d="M10 100 Q 60 70 110 95 T 210 90 V 220 H 10 Z"
                fill="#e8f4f6"
              />

              <g transform="translate(75,95)">
                <ellipse cx="0" cy="30" rx="30" ry="34" fill="#2b2b2b" />
                <ellipse cx="0" cy="34" rx="18" ry="24" fill="#e9e4d8" />
                <circle cx="0" cy="-8" r="22" fill="#2b2b2b" />
                <ellipse cx="0" cy="-4" rx="13" ry="15" fill="#e9e4d8" />
                <circle cx="-7" cy="-12" r="2.6" fill="#111" />
                <circle cx="7" cy="-12" r="2.6" fill="#111" />
                <path d="M-4 -4 Q0 0 4 -4 Q0 -1 -4 -4 Z" fill="#e8a23a" />
                <ellipse
                  cx="-24"
                  cy="18"
                  rx="8"
                  ry="14"
                  fill="#2b2b2b"
                  transform="rotate(-25 -24 18)"
                />
                <ellipse
                  cx="24"
                  cy="18"
                  rx="8"
                  ry="14"
                  fill="#2b2b2b"
                  transform="rotate(25 24 18)"
                />
                <ellipse cx="-11" cy="62" rx="7" ry="4" fill="#e8a23a" />
                <ellipse cx="11" cy="62" rx="7" ry="4" fill="#e8a23a" />
              </g>

              <g transform="translate(128,120)">
                <path
                  d="M0 40 L-4 0"
                  stroke="#3f8f4f"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M0 40 L8 5"
                  stroke="#3f8f4f"
                  strokeWidth="3"
                  fill="none"
                />
                <path
                  d="M0 40 L14 12"
                  stroke="#3f8f4f"
                  strokeWidth="3"
                  fill="none"
                />
                <ellipse
                  cx="-4"
                  cy="-4"
                  rx="9"
                  ry="14"
                  fill="#f3b6cd"
                  transform="rotate(-10 -4 -4)"
                />
                <ellipse
                  cx="8"
                  cy="1"
                  rx="9"
                  ry="14"
                  fill="#f591b8"
                  transform="rotate(8 8 1)"
                />
                <ellipse
                  cx="15"
                  cy="8"
                  rx="9"
                  ry="14"
                  fill="#f3b6cd"
                  transform="rotate(20 15 8)"
                />
                <rect
                  x="-12"
                  y="35"
                  width="32"
                  height="10"
                  rx="2"
                  fill="#f3e6d8"
                />
              </g>
            </g>

            <path
              d="M110 208
                 C 14 150, -3 96, 24 58
                 C 46 25, 92 24, 110 62
                 C 128 24, 174 25, 196 58
                 C 223 96, 206 150, 110 208 Z"
              fill="none"
              stroke="#f3e6d8"
              strokeWidth="10"
              strokeDasharray="1 7.5"
              strokeLinecap="round"
            />
          </svg>

          <svg
            style={styles.ribbon}
            viewBox="0 0 60 50"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 22 C10 5 0 10 5 25 C10 38 25 30 30 22Z"
              fill="#e2432f"
            />
            <path
              d="M30 22 C50 5 60 10 55 25 C50 38 35 30 30 22Z"
              fill="#c8331f"
            />
            <circle cx="30" cy="22" r="6" fill="#e2432f" />
            <path
              d="M27 27 L18 46 L27 42 L30 48 L33 42 L42 46 Z"
              fill="#c8331f"
            />
          </svg>
        </div>

        <div style={styles.panel}>
          <div style={styles.title}>Enter a passcode</div>
          <div style={styles.hint}>Hint: both of our birthdays</div>

          <div style={styles.boxRow}>
            {Array.from({ length: MAX_DIGITS }).map((_, i) => (
              <div
                key={i}
                style={i < code.length ? styles.boxFilled : styles.boxEmpty}
              >
                {i < code.length ? "\u2022" : ""}
              </div>
            ))}
          </div>

          {error && <div style={styles.error}>{error}</div>}

          <div style={styles.keypad}>
            {keys.map((k) => (
              <button
                key={k}
                onClick={() => {
                  if (k === "*") handleClear();
                  else if (k === "#") handleBackspace();
                  else handleDigit(k);
                }}
                style={k === "*" || k === "#" ? styles.keySymbol : styles.key}
                aria-label={
                  k === "*" ? "Clear" : k === "#" ? "Backspace" : `Digit ${k}`
                }
              >
                {k}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  body: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "24px 0",
    fontFamily: "'Poppins', sans-serif",
  },
  screen: {
    position: "relative",
    width: 720,
    maxWidth: "100%",
    height: 520,
    background:
      "linear-gradient(135deg, #7c1f2b 0%, #6b1a26 55%, #5e1620 100%)",
    borderRadius: 6,
    overflow: "hidden",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    display: "flex",
    alignItems: "center",
  },
  sheetMusic: {
    position: "absolute",
    left: -10,
    bottom: -18,
    width: 345,
    height: 240,
    opacity: 0.55,
    pointerEvents: "none",
  },
  foldShadow: {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(115deg, transparent 46%, rgba(0,0,0,0.28) 50%, transparent 54%)",
    pointerEvents: "none",
  },
  heartWrap: {
    position: "relative",
    width: 315,
    height: 315,
    marginLeft: 39,
    flexShrink: 0,
    filter: "drop-shadow(0 10px 18px rgba(0,0,0,0.45))",
  },
  heartPhoto: {
    width: "100%",
    height: "100%",
  },
  ribbon: {
    position: "absolute",
    top: -33,
    right: 27,
    width: 81,
    height: 69,
  },
  panel: {
    position: "relative",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "27px 33px 21px",
    zIndex: 2,
  },
  title: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
    fontWeight: 500,
    color: "#f3e6d8",
    fontSize: 28,
    marginBottom: 18,
    letterSpacing: 0.3,
  },
  error: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 13,
    color: "#f9a8a8",
    marginBottom: 12,
    textAlign: "center",
    maxWidth: 240,
    lineHeight: 1.4,
    fontStyle: "italic",
  },
  hint: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 13,
    color: "#f3e6d8",
    opacity: 0.7,
    marginBottom: 14,
    fontStyle: "italic",
  },
  boxRow: {
    display: "flex",
    gap: 12,
    marginBottom: 24,
  },
  boxFilled: {
    width: 45,
    height: 45,
    borderRadius: 9,
    background: "#f3e6d8",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 27,
    fontWeight: 600,
    color: "#a8632f",
  },
  boxEmpty: {
    width: 45,
    height: 45,
    borderRadius: 9,
    background: "transparent",
    border: "2px solid #f3e6d8",
  },
  keypad: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 60px)",
    gap: "14px 18px",
  },
  key: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    border: "none",
    background: "#f3e6d8",
    color: "#8a3d33",
    fontSize: 22,
    fontWeight: 600,
    fontFamily: "'Poppins', sans-serif",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  keySymbol: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    border: "none",
    background: "#f3e6d8",
    color: "#8a3d33",
    fontSize: 24,
    fontWeight: 400,
    fontFamily: "'Poppins', sans-serif",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};
