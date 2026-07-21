import { useState, useEffect } from "react";
import "../components/HomePageCss.css";
import Stepper, { Step } from "./Animations/Stepper/Stepper";
import Navbar from "./Navbar";
import MobilePopup from "./MobilePopup";

// The actual reveal date. Change the year/month/day here if the date moves.
const REVEAL_DATE = new Date("2026-07-22T00:00:00");

const getTimeRemaining = () => {
  const total = REVEAL_DATE.getTime() - Date.now();
  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    total,
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
};

const HomePage = () => {
  const [isRevealed, setIsRevealed] = useState(
    () => Date.now() >= REVEAL_DATE.getTime(),
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobilePopup, setShowMobilePopup] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  // Check if device is mobile
  useEffect(() => {
    const checkDevice = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setShowMobilePopup(mobile);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Keep the countdown ticking until the reveal date arrives.
  useEffect(() => {
    if (isRevealed) return;

    const interval = window.setInterval(() => {
      const nextTime = getTimeRemaining();
      setTimeRemaining(nextTime);

      if (nextTime.total <= 0) {
        setIsRevealed(true);
      }
    }, 1000);

    return () => window.clearInterval(interval);
  }, [isRevealed]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div
        className="h-dvh flex flex-col items-center justify-center gap-4"
        style={{
          background:
            "radial-gradient(ellipse at top, rgba(251,146,180,0.22), transparent 45%), linear-gradient(160deg, #1a0510 0%, #2b0a1f 35%, #170611 65%, #0c0308 100%)",
        }}
      >
        <span
          className="text-3xl text-rose-300/80"
          style={{ animation: "pulse 1.1s ease-in-out infinite" }}
        >
          ❤
        </span>
        <p
          className="text-lg italic text-pink-100/70"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Loading something special…
        </p>
      </div>
    );
  }

  const renderMainContent = () => {
    if (!isRevealed) {
      return (
        <div
          className="flex flex-col items-center justify-center h-full text-center p-4"
          style={{
            background:
              "radial-gradient(ellipse at top, rgba(251,146,180,0.22), transparent 45%), linear-gradient(160deg, #1a0510 0%, #2b0a1f 35%, #170611 65%, #0c0308 100%)",
          }}
        >
          <p className="text-xs uppercase tracking-[0.4em] text-pink-200/70 mb-2">
            Almost there
          </p>
          <h1
            className="text-3xl md:text-4xl italic text-white/95 font-semibold mb-8"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            This surprise will be revealed on July 22nd
          </h1>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_0_60px_rgba(251,146,180,0.12)]">
            <h2
              className="text-lg text-pink-100/80 italic mb-5"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Counting down to the surprise
            </h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-rose-400/10 to-amber-300/10 p-3 w-24">
                <div className="text-3xl text-white font-semibold">
                  {timeRemaining.days}
                </div>
                <div className="text-xs uppercase tracking-widest text-pink-200/60">
                  Days
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-rose-400/10 to-amber-300/10 p-3 w-24">
                <div className="text-3xl text-white font-semibold">
                  {timeRemaining.hours}
                </div>
                <div className="text-xs uppercase tracking-widest text-pink-200/60">
                  Hours
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-rose-400/10 to-amber-300/10 p-3 w-24">
                <div className="text-3xl text-white font-semibold">
                  {timeRemaining.minutes}
                </div>
                <div className="text-xs uppercase tracking-widest text-pink-200/60">
                  Minutes
                </div>
              </div>
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-rose-400/10 to-amber-300/10 p-3 w-24">
                <div className="text-3xl text-white font-semibold">
                  {timeRemaining.seconds}
                </div>
                <div className="text-xs uppercase tracking-widest text-pink-200/60">
                  Seconds
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Original content to show on July 22nd
    return (
      <Stepper
        initialStep={1}
        onStepChange={(step) => {
          console.log(step);
        }}
        onFinalStepCompleted={() => console.log("All steps completed!")}
        backButtonText="Previous"
        nextButtonText="Continue"
      >
        <Step>
          <h2 className="text-xl text-white font-bold">
            Hey Shubhangi!!🌟 It&apos;s your special day.
          </h2>
        </Step>
        <Step>
          <h2 className="text-lg text-white font-bold ">
            I&apos;ve prepared something magical just for you.
          </h2>
          <img
            style={{
              height: "100px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center -70px",
              borderRadius: "15px",
              marginTop: "1em",
            }}
            src="https://www.purrfectcatgifts.co.uk/cdn/shop/collections/Funny_Cat_Cards_640x640.png?v=1663150894"
          />
        </Step>
        <Step>
          <h2 className="text-xl text-white font-bold">
            Before you begin, i want to say you are the best girl i have ever
            met...
          </h2>
        </Step>
        <Step>
          <h2 className="text-xl text-white font-bold">Final Step</h2>
          <p className="text-lg text-white font-bold">You made it!</p>
        </Step>
      </Stepper>
    );
  };

  return (
    <div className="h-dvh overflow-y-hidden customBackground">
      {isRevealed && <Navbar />}
      {renderMainContent()}

      {/* Mobile popup */}
      {showMobilePopup && (
        <MobilePopup onClose={() => setShowMobilePopup(false)} />
      )}
    </div>
  );
};

export default HomePage;
