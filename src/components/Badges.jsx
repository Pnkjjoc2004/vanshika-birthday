import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SkyQueenBadge } from "./sky-queen-badge";
import { FighterSpiritBadge } from "./fighter-spirit-badge";
import { WingsOfGloryBadge } from "./wings-of-glory-badge";
import { BirthdaySquadronBadge } from "./birthday-squadron-badge";
import { BadgeShowcase } from "./badge-showcase";
import FighterJet from "./fighter-jet";
import { AerialFormation } from "./aerial-formation";
import { Link } from "react-router-dom";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  const badges = [
    {
      component: <SkyQueenBadge />,
      title: "Sky Queen",
      description:
        "Queen of the skies —jet-setting through birthday skies like it’s her runway.",
      color: "from-blue-600 to-cyan-400",
    },
    {
      component: <FighterSpiritBadge />,
      title: "Fighter Spirit",
      description:
        "Built for speed and sparkle — Yashika dodges bad vibes like a fighter jet in Top Gun. (Top gun movie hai)",
      color: "from-red-600 to-rose-400",
    },
    {
      component: <WingsOfGloryBadge />,
      title: "Wings of Glory",
      description:
        "No pilot license (yet), but her energy? Straight-up sonic boom. Always flying high.(kaddu energy hai he nhi)",
      color: "from-amber-500 to-yellow-300",
    },
    {
      component: <BirthdaySquadronBadge />,
      title: "20th Birthday",
      description:
        "20 years of being her amazing self — now boarding for the best year yet! (age bhul gya )",
      color: "from-purple-600 to-fuchsia-400",
    },
  ];

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % badges.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoplay, badges.length]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      <Link
        className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none z-50"
        to={"/"}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
          Home
        </span>
      </Link>
      <AerialFormation className="opacity-20 pointer-events-none" />
      {/* Animated background elements */}
      <div className="fixed inset-0">
        {/* Stars background */}
        <div className="absolute w-full h-full opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3,
                animation: `twinkle ${
                  Math.random() * 5 + 3
                }s infinite alternate ${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>

        {/* Fighter jets flying across */}
        <div className="absolute w-full h-full overflow-hidden pointer-events-none">
          {/* Fighter jet 1 - top area */}
          <div
            className="absolute animate-jet-fly-1"
            style={{ top: "15%", left: "-10%" }}
          >
            <FighterJet color="#8BAAFF" size={60} rotation={15} />
          </div>

          {/* Fighter jet 2 - middle area */}
          <div
            className="absolute animate-jet-fly-2"
            style={{ top: "40%", left: "-15%" }}
          >
            <FighterJet color="#A7F3FF" size={80} rotation={0} />
          </div>

          {/* Fighter jet 3 - bottom area */}
          <div
            className="absolute animate-jet-fly-3"
            style={{ top: "75%", left: "-5%" }}
          >
            <FighterJet color="#D1D5DB" size={50} rotation={-10} />
          </div>

          {/* Fighter jet 4 - random position */}
          <div
            className="absolute animate-jet-fly-4"
            style={{ top: "60%", left: "-20%" }}
          >
            <FighterJet color="#FFD700" size={40} rotation={5} />
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10  pb-6 text-center">
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-tighter"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Badges
          </span>
        </motion.h1>
      </header>

      {/* Main showcase */}
      <section className="relative z-10 py-8">
        <BadgeShowcase
          badges={badges}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          isAutoplay={isAutoplay}
          setIsAutoplay={setIsAutoplay}
        />
      </section>

      {/* Footer with animated contrail */}
      <footer className="relative z-10 py-8 mt-12 text-center">
        <div className="relative h-20 mb-6">
          <motion.div
            className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white to-transparent"
            initial={{ width: 0, x: "-50%" }}
            animate={{ width: "80%", x: "10%" }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-6 h-6 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full fill-white">
              <path d="M12,0L7,10h10L12,0z M12,11c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,11,12,11z M12,16c-1.1,0-2,0.9-2,2v4h4v-4C14,16.9,13.1,16,12,16z" />
            </svg>
          </motion.div>
        </div>
        <p className="text-sm text-gray-400">
          © 2025 Yashika Badges Collection
        </p>
      </footer>
    </main>
  );
}
