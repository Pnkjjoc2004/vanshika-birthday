import { useState, useEffect, useRef } from "react";
import RollingGallery from "./Animations/Gallery/RollingGallery";
import Image1 from "../assets/image1.jpg";
import Image2 from "../assets/image2.jpg";
import Video3 from "../assets/video3.mp4";
import Image4 from "../assets/image4.jpg";
import Image5 from "../assets/image5.jpg";
import Video6 from "../assets/video6.mp4";
import Image7 from "../assets/image7.png";
import { Link } from "react-router-dom";
import Song from "../assets/memory.mp3";

const IMGS = [
  { type: "image", url: Image1 },
  { type: "image", url: Image2 },
  { type: "video", url: Video3, autoplay: true, controls: false },
  { type: "image", url: Image4 },
  { type: "image", url: Image5 },
  { type: "video", url: Video6, autoplay: true, controls: false },
  { type: "image", url: Image7 },
];

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(new Audio(Song));

  useEffect(() => {
    // Set up audio properties
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    // Play audio when component mounts
    const playBackgroundMusic = async () => {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Background music autoplay failed:", error);
      }
    };

    playBackgroundMusic();

    // Simulating a delay before the gallery starts
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust delay as needed

    return () => {
      clearTimeout(timer);
      // Clean up audio when component unmounts
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  // Handle mute/unmute toggle
  useEffect(() => {
    audioRef.current.muted = isMuted;
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((prevState) => !prevState);
  };

  return (
    <>
      <div className="relative">
        {/* Mute button - top right corner */}
        <button
          onClick={toggleMute}
          className="fixed top-4 right-4 z-50 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition-all"
        >
          {isMuted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
              <line x1="23" y1="9" x2="17" y2="15"></line>
              <line x1="17" y1="9" x2="23" y2="15"></line>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            </svg>
          )}
        </button>

        <div className="flex items-start ml-4">
          <Link
            className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
            to={"/"}
          >
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2 undefined">
              Home
            </span>
          </Link>
        </div>
        <h2 className="text-center text-white text-lg">
          Hover over the image/video to pause <br />
          <span>
            {" "}
            <span className="bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent text-[17px]">
              I miss you
            </span>{" "}
            Apni memories kuch hai he nhi
          </span>
          <br />
          <span className="text-amber-50 text-sm">
            Me to timewaste hu na tere liye.
          </span>
        </h2>

        <div className="bg-black flex justify-center items-center mt-10 md:mt-3 h-[500px] relative">
          {loading ? (
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-16 h-16 border-4 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <RollingGallery
              autoplay={true}
              pauseOnHover={true}
              content={IMGS}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Gallery;
