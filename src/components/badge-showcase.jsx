/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export function BadgeShowcase({
  badges,
  activeIndex,
  setActiveIndex,
  isAutoplay,
  setIsAutoplay,
}) {
  const nextBadge = () => {
    setActiveIndex((activeIndex + 1) % badges.length);
  };

  const prevBadge = () => {
    setActiveIndex((activeIndex - 1 + badges.length) % badges.length);
  };

  const toggleAutoplay = () => {
    setIsAutoplay(!isAutoplay);
  };

  useEffect(() => {
    if (!isAutoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % badges.length);
    }, 6000); // 6 seconds for smoother timing

    return () => clearInterval(interval);
  }, [isAutoplay, badges.length, setActiveIndex, activeIndex]); // <-- added activeIndex here

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        {/* Badge display area with reflective surface */}
        <div className="relative w-full max-w-md aspect-square">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-gray-800 to-black opacity-50 blur-md transform scale-95" />

          <div className="relative z-10 w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="transform-gpu"
              >
                {badges[activeIndex].component}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Reflective surface */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-gray-900 to-transparent opacity-80 transform scale-x-90 blur-sm" />
        </div>

        {/* Badge information */}
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <motion.div
                  className={`h-1 w-24 rounded bg-gradient-to-r ${badges[activeIndex].color}`}
                  initial={{ width: 0 }}
                  animate={{ width: "6rem" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <h2 className="text-3xl md:text-4xl font-bold">
                  {badges[activeIndex].title}
                </h2>
                <p className="text-lg text-gray-300">
                  {badges[activeIndex].description}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-3">
                  {badges.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === activeIndex
                          ? `bg-gradient-to-r ${badges[index].color} scale-125`
                          : "bg-gray-600"
                      }`}
                      aria-label={`View badge ${index + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={prevBadge}
                    className="flex items-center justify-center rounded-full h-10 w-10 border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <span className="sr-only">Previous badge</span>
                  </button>

                  <button
                    size="icon"
                    onClick={toggleAutoplay}
                    className="flex items-center justify-center rounded-full h-10 w-10 border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"
                  >
                    {isAutoplay ? (
                      <Pause className="h-5 w-5" />
                    ) : (
                      <Play className="h-5 w-5" />
                    )}
                    <span className="sr-only">
                      {isAutoplay ? "Pause autoplay" : "Start autoplay"}
                    </span>
                  </button>

                  <button
                    size="icon"
                    onClick={nextBadge}
                    className="flex items-center justify-center rounded-full h-10 w-10 border-gray-700 bg-gray-800/50 hover:bg-gray-700/50"
                  >
                    <ChevronRight className="h-5 w-5" />
                    <span className="sr-only">Next badge</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
