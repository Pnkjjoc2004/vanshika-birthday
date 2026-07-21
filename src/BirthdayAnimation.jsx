import { useEffect, useState } from "react";
import Confetti from "react-confetti";

import "./BirthdayAnimation.css";
import { Link } from "react-router-dom";


const BirthdayAnimation = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 80000);

    // Update window size dynamically
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(135deg,_#fff7ed_0%,_#ffe4e6_45%,_#fdf2f8_100%)] text-slate-800">
      {showConfetti && (
        <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            numberOfPieces={160}
            recycle={false}
            style={{ overflow: "hidden" }}
          />
        </div>
      )}

      <div className="relative z-20 flex justify-start px-4 pt-4">
        <Link
          className="relative inline-flex h-12 active:scale-95 transition overflow-hidden rounded-lg p-[1px] focus:outline-none"
          to={"/balloon-room"}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#f472b6_0%,#fb7185_50%,#f59e0b_100%)]"></span>
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-white px-7 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-3xl gap-2">
            Back
          </span>
        </Link>
      </div>

      <div className="container relative flex min-h-[calc(100vh-80px)] flex-col items-center justify-start pb-10 pt-6 sm:pt-10">
        <div className="relative z-10 mb-6 text-center">
          <h2 className="birthdayText fade-in one">
            Blow the candles, hover near the face
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-600 sm:text-base">
            A soft and sweet birthday moment to celebrate with joy.
          </p>
        </div>

        <div className="backg relative mx-auto">
          <div className="table"></div>
          <div className="girl">
            <div className="hair1">
              <div className="hair2">
                <div className="face">
                  <div className="eyel">
                    <div className="eyeball1">
                      <div className="dot1"></div>
                      <div className="dot2"></div>
                    </div>
                  </div>
                  <div className="eyer">
                    <div className="eyeball2">
                      <div className="dot3"></div>
                      <div className="dot4"></div>
                    </div>
                  </div>
                  <div className="mouth"></div>
                  <div className="dress"></div>
                  <div className="neck"></div>
                </div>
                <div className="belt">
                  <div className="belt1"></div>
                </div>
                <div className="earl"></div>
                <div className="earr"></div>
              </div>
            </div>
            <div className="candle-row">
              <div className="candle">
                <div className="flame">
                  <div className="flame1"></div>
                </div>
              </div>
              <div className="candle">
                <div className="flame">
                  <div className="flame1"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="cake">
            <div className="strip1"></div>
            <div className="cake1">
              <div className="strip2"></div>
              <div className="d1"></div>
              <div className="d2"></div>
              <div className="d3"></div>
              <div className="d4"></div>
              <div className="d5"></div>
              <div className="d6"></div>
              <div className="d7"></div>
              <div className="drip">
                <div className="d1"></div>
                <div className="d2"></div>
                <div className="d3"></div>
                <div className="d4"></div>
                <div className="d5"></div>
                <div className="d6"></div>
                <div className="d7"></div>
                <div className="d8"></div>
                <div className="d9"></div>
              </div>
              <div className="c1"></div>
              <div className="c2"></div>
              <div className="c3"></div>
              <div className="c4"></div>
              <div className="c5"></div>
              <div className="c6"></div>
              <div className="c7"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirthdayAnimation;
