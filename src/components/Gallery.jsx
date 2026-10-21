import { useEffect, useRef, useState } from "react";
import RollingGallery from "./Animations/Gallery/RollingGallery";

import { Link } from "react-router-dom";
import Song from "../assets/memory.mp3";
import Video1 from "../assets/vanshika/5ed8908e-b326-4b07-8dc5-84368316dd5a.MP4";
import Video2 from "../assets/vanshika/43ef4380-0ec1-496b-aead-e099146d688c.MP4";
import Video3 from "../assets/vanshika/123da3f3-d685-4665-87a6-bbbbf1263eaf.MP4";
import { galleryItems } from "../data/galleryImages";

const IMGS = [
  { type: "video", url: Video1, autoplay: true, controls: false },
  ...galleryItems.slice(0, 5).map((img) => ({ type: "image", url: img.src })),
  { type: "video", url: Video2, autoplay: true, controls: false },
  ...galleryItems.slice(5, 15).map((img) => ({ type: "image", url: img.src })),
  { type: "video", url: Video3, autoplay: true, controls: false },
  ...galleryItems.slice(15).map((img) => ({ type: "image", url: img.src })),
];

// A short line that fades in beneath the title. Swap this for your own words.
const LOVE_NOTE = "Every picture here is a reason I fell for you again.";

// Simple deterministic scatter so petals don't clump or look random-random.
const PETALS = Array.from({ length: 16 }).map((_, i) => ({
  id: i,
  left: (i * 31) % 100,
  delay: (i * 1.1) % 10,
  duration: 11 + ((i * 5) % 8),
  size: 20 + ((i * 6) % 20),
  drift: (i % 2 === 0 ? 1 : -1) * (20 + (i % 3) * 15),
}));

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showNote, setShowNote] = useState(false);
  const audioRef = useRef(new Audio(Song));

  // Load romantic display fonts once.
  useEffect(() => {
    const id = "romantic-fonts-link";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,500&family=Playfair+Display:ital,wght@0,600;1,600&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  useEffect(() => {
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    const playBackgroundMusic = async () => {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Background music autoplay failed:", error);
      }
    };

    const startAudioOnInteraction = () => {
      playBackgroundMusic();
      document.removeEventListener("click", startAudioOnInteraction);
      document.removeEventListener("touchstart", startAudioOnInteraction);
    };

    playBackgroundMusic();
    document.addEventListener("click", startAudioOnInteraction);
    document.addEventListener("touchstart", startAudioOnInteraction);

    const timer = setTimeout(() => {
      setLoading(false);
      setTimeout(() => setShowNote(true), 350);
    }, 2000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", startAudioOnInteraction);
      document.removeEventListener("touchstart", startAudioOnInteraction);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play().catch((err) => {
        console.error("Play failed:", err);
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <div
      className="min-h-screen overflow-x-hidden overflow-y-auto bg-[radial-gradient(ellipse_at_top,_rgba(251,146,180,0.22),_transparent_45%),radial-gradient(ellipse_at_bottom,_rgba(212,163,115,0.16),_transparent_50%),linear-gradient(160deg,_#1a0510_0%,_#2b0a1f_35%,_#170611_65%,_#0c0308_100%)] text-white pb-8"
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
    >
      {/* Ambient romantic keyframes */}
      <style>{`
        @keyframes floatPetal {
          0% { transform: translateY(110vh) translateX(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.95; }
          90% { opacity: 0.85; }
          100% { transform: translateY(-10vh) translateX(var(--drift)) rotate(340deg); opacity: 0; }
        }
        @keyframes gentlePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Soft romantic ambience */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(244,114,182,0.16),_transparent_45%)] pointer-events-none" />
      <div className="fixed inset-0 bg-gradient-to-b from-amber-200/5 via-transparent to-pink-500/10 pointer-events-none" />

      {/* Floating petals */}
      <div className="fixed inset-0 z-[6] pointer-events-none overflow-hidden">
        {PETALS.map((p) => (
          <span
            key={p.id}
            className="absolute"
            style={{
              left: `${p.left}%`,
              bottom: 0,
              fontSize: `${p.size}px`,
              color: "rgba(251,146,180,0.95)",
              filter:
                "drop-shadow(0 0 10px rgba(244,114,182,0.85)) drop-shadow(0 0 18px rgba(244,114,182,0.4))",
              animation: `floatPetal ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              "--drift": `${p.drift}px`,
            }}
          >
            ❤
          </span>
        ))}
      </div>

      {/* Top bar */}
      <div className="relative z-20 flex items-center justify-between px-3 sm:px-5 py-3 sm:py-5">
        <Link
          to={"/balloon-room"}
          className="text-xs sm:text-sm tracking-wide text-pink-200/80 transition-colors hover:text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          ← Back
        </Link>

        <div className="flex items-center gap-1.5 sm:gap-2 rounded-full border border-white/10 bg-white/5 px-3 sm:px-4 py-1 sm:py-1.5 backdrop-blur-md">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-pink-200/80">
            Our love story
          </span>
        </div>

        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="group relative rounded-full border border-white/10 bg-white/5 p-2 sm:p-2.5 text-pink-100/80 transition-colors hover:text-white"
          title={isPlaying ? "Pause" : "Play"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="sm:w-[18px] sm:h-[18px]"
            viewBox="0 0 24 24"
            fill={isPlaying ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.6"
            style={
              isPlaying
                ? { animation: "gentlePulse 1.8s ease-in-out infinite" }
                : undefined
            }
          >
            <path d="M12 21s-7.2-4.6-10-9.3C.4 8.4 1.8 4.8 5.2 4.1 7.5 3.6 9.9 4.7 12 7c2.1-2.3 4.5-3.4 6.8-2.9 3.4.7 4.8 4.3 3.2 7.6C19.2 16.4 12 21 12 21z" />
          </svg>
        </button>
      </div>

      {/* Gallery */}
      <div className="relative z-10 flex min-h-[calc(100vh-80px)] flex-col items-center justify-center px-2 pb-6">
        <div className="mb-3 sm:mb-5 text-center">
          <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.4em] text-pink-200/70">
            Sweet memories
          </p>
          <h2
            className="mt-1 sm:mt-2 text-xl italic text-white/95 sm:text-4xl px-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A little glimpse of my cutie 🫶🏻
          </h2>
          <div className="mx-auto mt-2 sm:mt-3 flex items-center justify-center gap-3 text-rose-300/60">
            <span className="h-px w-8 sm:w-10 bg-gradient-to-r from-transparent to-rose-300/50" />
            <span className="text-xs">❤</span>
            <span className="h-px w-8 sm:w-10 bg-gradient-to-l from-transparent to-rose-300/50" />
          </div>
          {showNote && (
            <p
              className="mx-auto mt-2 sm:mt-3 max-w-xs sm:max-w-md text-xs sm:text-sm italic text-pink-100/70 sm:text-base px-2"
              style={{ animation: "fadeUp 0.8s ease-out forwards" }}
            >
              {LOVE_NOTE}
            </p>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center gap-4">
            <span
              className="text-3xl text-rose-300/80"
              style={{ animation: "gentlePulse 1.1s ease-in-out infinite" }}
            >
              ❤
            </span>
          </div>
        ) : (
          <div className="relative w-full max-w-6xl rounded-[2rem] border border-white/10 bg-white/5 p-3 shadow-[0_0_80px_rgba(244,114,182,0.12)] backdrop-blur-xl sm:p-4">
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-pink-400/10 via-transparent to-amber-300/10" />
            <div className="relative">
              <RollingGallery
                autoplay={true}
                pauseOnHover={true}
                content={IMGS}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;


