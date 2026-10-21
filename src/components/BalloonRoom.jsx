/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ballpit from "./Animations/Ballpit/Ballpit";
import { motion } from "framer-motion";
import LetterPopup from "../LetterPopup";
import PasscodeLockScreen from "../PasscodeLockScreen";

const NAME = "Vanshika";
const SUBTITLE =
  "Wishing you a day full of smiles and laughter. May this year bring you all the happiness you deserve.";

// Split into words so each one can reveal on its own beat.
const TITLE_WORDS = `Happy Birthday ${NAME}!`.split(" ");

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const BalloonRoom = () => {
  const [ballpitCount, setBallpitCount] = useState(170);
  const [showText, setShowText] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setBallpitCount(50);
      } else {
        setBallpitCount(130);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const popupTimer = setTimeout(() => setShowPopup(true), 8000);
    const timer = setTimeout(() => setShowText(true), 800);
    return () => {
      clearTimeout(popupTimer);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative w-full h-screen min-h-[650px] overflow-hidden bg-[radial-gradient(ellipse_at_top,_rgba(251,146,180,0.22),_transparent_45%),radial-gradient(ellipse_at_bottom,_rgba(212,163,115,0.16),_transparent_50%),linear-gradient(160deg,_#1a0510_0%,_#2b0a1f_35%,_#170611_65%,_#0c0308_100%)]">
      {showPopup && (
        <LetterPopup
          onYes={() => {
            setShowPopup(false);
            setShowPasscode(true);
          }}
          onNo={() => setShowPopup(false)}
        />
      )}

      {showPasscode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-pink-950/80 backdrop-blur-sm">
          <PasscodeLockScreen
            correctCode="0521"
            onComplete={() => {
              setShowPasscode(false);
              setShowLetter(true);
            }}
          />
        </div>
      )}

      {showLetter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative mx-auto w-full max-w-xl animate-[fadeIn_0.8s_ease-out]">
            {/* Close button */}
            <button
              onClick={() => setShowLetter(false)}
              className="absolute -right-2 -top-2 sm:-right-3 sm:-top-3 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-white text-lg text-slate-400 shadow-md transition hover:text-slate-600 hover:scale-105"
            >
              ✕
            </button>

            {/* Wax seal decoration */}
            <div className="absolute -left-4 top-10 z-20 hidden sm:block pointer-events-none">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-700 shadow-lg">
                <span className="text-xl font-serif text-white/90">V</span>
              </div>
              <div className="mx-auto mt-1 h-8 w-0.5 bg-gradient-to-b from-red-600 to-transparent" />
            </div>

            {/* Envelope flap shadow */}
            <div className="absolute -top-2 left-4 right-4 h-6 rounded-t-lg bg-amber-100/80 shadow-inner" />

            <div
              className="relative rounded-sm bg-white p-0 shadow-2xl max-h-[85vh] overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#fbcfe8_transparent]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(transparent, transparent 27px, #f0e6d3 27px, #f0e6d3 28px)",
                backgroundSize: "100% 28px",
                lineHeight: "28px",
                paddingTop: 0,
              }}
            >
              {/* Letter header with romantic border */}
              <div className="border-b-2 border-dotted border-pink-200 px-6 sm:px-10 pb-2 pt-6 text-center">
                <div className="mb-1 text-3xl">💖</div>
                <h3
                  className="text-2xl sm:text-3xl font-bold text-rose-700"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  To the Love of My Life
                </h3>
              </div>

              {/* Letter body with stationery lines */}
              <div
                className="px-6 sm:px-10 pb-6 pt-3"
                style={{ fontFamily: "'Caveat', 'Brush Script MT', cursive" }}
              >
                <div className="space-y-1 text-lg sm:text-[19px] leading-[28px] text-amber-900">
                  <p className="indent-6 sm:indent-8">
                    Happy Happy Birthday to the most special person in my life.
                  </p>

                  <p className="indent-6 sm:indent-8">
                    I wanted to tell you how incredibly special you are to me.
                    Jabse aap meri life mein aaye ho, everything feels more
                    beautiful. I never felt this much love and care for anyone
                    before. Mujh jaise awara ko control krne k lie thankuu. 🥹❤️
                    Aapse itna pyaar hai ki kabhi kabhi words bhi kam pad jaate
                    hain. Aap meri smile, meri happiest place ho, aur aapka vo
                    thora sa kalesh toh cherry on top hai. 😂❤️🫶🏻
                  </p>

                  <p className="indent-6 sm:indent-8">
                    I don't just want you in my happiest moments, I want you in
                    every version of my life — in my chaos, my silence, my
                    struggles, and all the little moments in between. Bas aise
                    hi hamesha mere saath rehna, kyunki mera dil ab ghar jaisa
                    feel karta hai toh sirf aapke paas. ❤️‍🩹💗
                  </p>

                  <div className="pt-2 text-center leading-[30px]">
                    <p>
                      मेरे सबसे खूबसूरत एहसास हो तुम
                      <br />
                      कभी सोचो कितने ख़ास हो तुम
                      <br />
                      रह जा बनके मेरी तुझको ही चाहू मैं सदा
                      <br />
                      इक दूजे से ना हो हम जुदा
                      <br />
                      मेरी बनोगी क्या? ❤️🥹
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-pink-100 pt-3 text-right">
                  <p
                    className="text-lg sm:text-xl font-semibold text-rose-600"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Forever yours,
                  </p>
                  <p
                    className="text-base sm:text-lg text-rose-400"
                    style={{
                      fontFamily: "'Caveat', 'Brush Script MT', cursive",
                    }}
                  >
                    Pinki 🐨{" "}
                  </p>
                </div>
              </div>
            </div>

            {/* Envelope bottom edge */}
            <div className="absolute -bottom-2 left-4 right-4 h-4 rounded-b-lg bg-amber-100/60 shadow-md" />
          </div>
        </div>
      )}

      {/* Ambient romantic glow, matches the rest of the experience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(244,114,182,0.14),_transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(5,2,4,0.55)_100%)]" />

      {/* Nav */}
      <div className="relative z-20 flex justify-between px-4 pt-4">
        <Link
          className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none"
          to={"/"}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#d4af7a_100%)]"></span>
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#170611] px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
            Home
          </span>
        </Link>
        <div className="flex gap-3">
          <Link
            className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none"
            to={"/birthday-cake"}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#d4af7a_100%)]"></span>
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-[#170611] px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
              <span className="mr-2">🎂</span>
              Cake ceremony
            </span>
          </Link>

          <Link
            className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none"
            to={"/gallery"}
          >
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg border border-white/15 bg-white/5 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
              Gallery
            </span>
          </Link>
        </div>
      </div>

      {/* Happy Birthday Text */}
      {showText && (
        <div
          className="absolute left-1/2 top-[26%] z-10 w-full -translate-x-1/2 px-4 text-center md:top-[30%]"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          <motion.div
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {TITLE_WORDS.map((word, i) => (
              <motion.span
                key={i}
                variants={wordVariant}
                className="text-4xl md:text-6xl font-semibold italic tracking-wide"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background:
                    "linear-gradient(to right, #f9c9dd, #fb92b4, #d4af7a)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  textShadow: "0 2px 18px rgba(244,114,182,0.35)",
                  marginBottom: "2px",
                }}
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.p
            className="mx-auto mt-4 max-w-md text-base italic text-pink-100/80 md:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }}
          >
            {SUBTITLE}
          </motion.p>

          <motion.div
            className="mt-4 flex items-center justify-center gap-3 text-red-300/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-red-300/50" />
            <motion.span
              className="inline-flex items-center justify-center text-[1.35rem] drop-shadow-[0_0_10px_rgba(244,114,182,0.45)] sm:text-[1.6rem]"
              animate={{
                scale: [1, 1.18, 1],
                y: [0, -4, 0],
                rotate: [0, -6, 0, 6, 0],
                opacity: [0.85, 1, 0.9],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              ❤
            </motion.span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-rose-300/50" />
          </motion.div>
        </div>
      )}

      {/* Ballpit fills the whole section */}
      <div className="absolute inset-0 z-0">
        <Ballpit
          count={ballpitCount}
          gravity={0.5}
          friction={0.9975}
          wallBounce={0.95}
          followCursor={false}
        />
      </div>
    </div>
  );
};

export default BalloonRoom;
