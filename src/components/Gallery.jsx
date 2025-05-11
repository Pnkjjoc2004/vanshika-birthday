import { useEffect, useRef, useState } from "react";
import RollingGallery from "./Animations/Gallery/RollingGallery";

import { Link } from "react-router-dom";
import Video1 from "../assets/backgroudVideo.mp4";
import Image1 from "../assets/image1.jpg";
import Image2 from "../assets/image2.jpg";
import Image4 from "../assets/image4.jpg";
import Image5 from "../assets/image5.jpg";
import Image7 from "../assets/image7.png";
import Song from "../assets/memory.mp3";
import Video3 from "../assets/video3.mp4";
import Video6 from "../assets/video6.mp4";

const IMGS = [
  { type: "video", url: Video1, autoplay: true, controls: false },
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
  const [isPlaying, setIsPlaying] = useState(true); // true by default
  const audioRef = useRef(new Audio(Song));

  useEffect(() => {
    // Set up audio properties
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;

    const playBackgroundMusic = async () => {
      try {
        await audioRef.current.play();
      } catch (error) {
        console.error("Background music autoplay failed:", error);
      }
    };

    playBackgroundMusic();

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    };
  }, []);

  // Play or pause when `isPlaying` changes
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
    <>
      <div className="relative">
        {/* Play/Pause button */}
        <button
          onClick={() => setIsPlaying((prev) => !prev)}
          className="fixed top-4 right-4 z-50 bg-black bg-opacity-60 text-white p-2 rounded-full hover:bg-opacity-80 transition-all"
        >
          {isPlaying ? (
            // Pause icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <rect x="6" y="4" width="4" height="16"></rect>
              <rect x="14" y="4" width="4" height="16"></rect>
            </svg>
          ) : (
            // Play icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
            >
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          )}
        </button>

        {/* Home button */}
        <div className="flex items-start ml-4">
          <Link
            className="relative inline-flex h-12 active:scale-95 transistion overflow-hidden rounded-lg p-[1px] focus:outline-none"
            to={"/balloon-room"}
          >
            <span className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#e7029a_0%,#f472b6_50%,#bd5fff_100%)]"></span>
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-7 text-sm font-medium text-white backdrop-blur-3xl gap-2">
              Back
            </span>
          </Link>
        </div>

        {/* Headings */}
        <h2 className="text-center text-white text-lg mt-4">
          Hover over the image/video to pause <br />
          <span className="bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent text-[17px]">
            I miss you
          </span>{" "}
          Apni memories kuch hai he nhi
          <br />
          <span className="text-amber-50 text-sm">
            Me to timewaste hu na tere liye.
          </span>
        </h2>

        {/* Gallery */}
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
