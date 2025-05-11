import { useEffect, useRef, useState } from "react";
import Confetti from "react-confetti";
import BirthdaySong from "./assets/Birthday-audio.mp3";
import Meme from "./assets/meme.mp4";

import "./BirthdayAnimation.css";
import { Link } from "react-router-dom";

const BirthdayAnimation = () => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isPlaying, setIsPlaying] = useState(true);
  const [audio] = useState(new Audio(BirthdaySong));
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Stop confetti after 15 seconds
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 15000);

    // Update window size dynamically
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);

    // Auto-play audio when component loads
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Audio autoplay failed:", error);
        setIsPlaying(false);
      }
    };

    playAudio();

    // Handle audio ended event
    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
      audio.removeEventListener("ended", () => setIsPlaying(false));
      audio.pause();
    };
  }, [audio]);

  // Effect to handle video playback when dialog opens
  useEffect(() => {
    if (showVideoPlayer && videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current.play();
          setIsVideoPlaying(true);
        } catch (error) {
          console.error("Video autoplay failed:", error);
          setIsVideoPlaying(false);
        }
      };

      playVideo();
    }
  }, [showVideoPlayer]);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleVideoPlayer = () => {
    setShowVideoPlayer(!showVideoPlayer);
    if (!showVideoPlayer) {
      // Pause audio when opening video
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  const closeVideoPlayer = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsVideoPlaying(false);
    }
    setShowVideoPlayer(false);
  };

  // Handle clicks outside the video dialog to close it
  const handleOverlayClick = (e) => {
    if (e.target.className === "video-overlay") {
      closeVideoPlayer();
    }
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={200}
        />
      )}
      <Link
        className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
        to={"/balloon-room"}
      >
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
          Back
        </span>
      </Link>

      <div className="container h-screen">
        <div className="backg">
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
        <h2 className="birthdayText fade-in one">
          Blow the candles, hover near the face
        </h2>

        {/* Audio Player - Bottom Right */}
        <div className="media-player">
          <button onClick={togglePlay} className="play-button">
            {isPlaying ? "❚❚" : "▶"}
          </button>
          <div className="song-title">Birthday Song</div>
        </div>

        {/* Video Player Trigger - Bottom Left */}
        <div className="video-trigger" onClick={toggleVideoPlayer}>
          <div className="video-icon">▶️</div>
          <div className="video-text">Birthday Video</div>
        </div>

        {/* Video Player Dialog */}
        {showVideoPlayer && (
          <div className="video-overlay" onClick={handleOverlayClick}>
            <div className="video-dialog">
              <div className="video-header">
                <h3>Happy Birthday Video</h3>
                <button className="close-button" onClick={closeVideoPlayer}>
                  ×
                </button>
              </div>
              <div className="video-container">
                <video
                  ref={videoRef}
                  src={Meme}
                  poster="/api/placeholder/640/360"
                  onClick={toggleVideo}
                  className="video-player"
                />
                <div className="video-controls">
                  <button onClick={toggleVideo} className="video-play-button">
                    {isVideoPlaying ? "❚❚" : "▶"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BirthdayAnimation;
