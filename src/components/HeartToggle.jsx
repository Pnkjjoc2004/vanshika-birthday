import { useEffect, useState } from "react";
import "./LoveHeart.css"; // Import the CSS file
import Confetti from "react-confetti";

const LoveHeart = () => {
  const [checked, setChecked] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 200000);

    // Update window size dynamically
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [showConfetti]);

  const drawHeart = (ctx) => {
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.bezierCurveTo(5, -15, 15, -15, 15, -5);
    ctx.bezierCurveTo(15, 5, 5, 10, 0, 15);
    ctx.bezierCurveTo(-5, 10, -15, 5, -15, -5);
    ctx.bezierCurveTo(-15, -15, -5, -15, 0, -5);
    ctx.closePath();
    ctx.fill();
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={150} // Number of particles
          colors={["#ff4d6d", "#ffffff"]} // Red & white colors
          drawShape={(ctx) => drawHeart(ctx)}
        />
      )}
      <div className="love">
        <input
          id="switch"
          type="checkbox"
          checked={checked}
          onChange={() => setChecked(!checked)}
          onClick={() => setShowConfetti(!showConfetti)}
        />
        <label className="love-heart" htmlFor="switch">
          <i className="left"></i>
          <i className="right"></i>
          <i className="bottom"></i>
          <div className="round"></div>
        </label>
        <h4 className="text-center ml-10 text-white text-sm animate-bounce">
          Toggle me
        </h4>
      </div>
    </>
  );
};

export default LoveHeart;
