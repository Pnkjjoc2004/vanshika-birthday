/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Ballpit from "./Animations/Ballpit/Ballpit";
import { motion } from "framer-motion";
const BalloonRoom = () => {
  const [ballpitCount, setBallpitCount] = useState(170);
  const [textPosition, setTextPosition] = useState(-50); // Start off-screen above
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setBallpitCount(50);
      } else {
        setBallpitCount(130);
      }
    };

    handleResize();

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Show text after 3 seconds delay
    const timer = setTimeout(() => {
      setShowText(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showText) return;

    // Animate the text from top to middle
    let startPosition = -50; // Starting position above viewport
    let targetPosition = 30; // Target position (40% from top - not too much middle)
    let animationFrame;
    let start;

    const animateText = (timestamp) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;

      // Animation duration in milliseconds (2.5 seconds)
      const duration = 2500;

      // Calculate new position with easing
      const easeOutCubic = (progress) =>
        1 - Math.pow(1 - Math.min(progress / duration, 1), 3);
      const newPosition =
        startPosition +
        (targetPosition - startPosition) * easeOutCubic(progress);

      setTextPosition(newPosition);

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animateText);
      }
    };

    // Start the animation
    animationFrame = requestAnimationFrame(animateText);

    // Clean up
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [showText]);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
      }}
      className="max-h-[730px] md:max-h-[582px] md:min-h-[585px] min-h-[725px]"
    >
      <div className="flex justify-between ">
        <Link
          className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
          to={"/"}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
            Home
          </span>
        </Link>
        <div className="flex gap-3">
          <Link
            className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
            to={"/birthday-cake"}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
              <span className="mr-2">🎂</span>
              Cake ceremony
            </span>
          </Link>

          <Link
            className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none"
            to={"/badges"}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
              <span className="mr-2">🎖️</span>
              Your Badges
            </span>
          </Link>

          <Link
            className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
            to={"/gallery"}
          >
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg px-7 text-sm font-medium text-black backdrop-blur-3xl gap-2 undefined border">
              Gallery
            </span>
          </Link>
        </div>
      </div>

      {/* Happy Birthday Text */}
      <div
        style={{
          position: "absolute",
          top: `${textPosition}%`,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          width: "100%",
          textAlign: "center",
          transition: "opacity 0.5s ease",
          opacity: showText ? 1 : 0,
        }}
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold tracking-wide uppercase"
          style={{
            color: "#FFD700", // Gold color
            WebkitTextStroke: "1px rgba(0, 0, 0, 0.2)", // Light outline
            background: "linear-gradient(to right, #FFD700, #FF6347)", // Gradient effect
            backgroundClip: "text", // Clip background to text
            textFillColor: "transparent", // Makes text transparent to show gradient
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)", // Adds subtle shadow for depth
          }}
          initial={{ opacity: 0, y: 30 }} // Start off-screen with reduced opacity
          animate={{ opacity: 1, y: 0 }} // End position with full opacity
          transition={{ duration: 1.2, ease: "easeOut" }} // Smooth animation
        >
          Happy Birthday Yashika!
        </motion.h1>
        <p className="text-sm font-semibold text-[#333333] mt-3">
          Wishing you a day full of smiles and laughter. May this year bring you
          all the happiness you deserve.
        </p>
      </div>

      <Ballpit
        count={ballpitCount}
        gravity={0.5}
        friction={0.9975}
        wallBounce={0.95}
        followCursor={false}
      />
    </div>
  );
};

export default BalloonRoom;
