/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";

const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  content = [],
}) => {
  const galleryContent = content;

  const [isScreenSizeSm, setIsScreenSizeSm] = useState(
    window.innerWidth <= 640,
  );
  useEffect(() => {
    const handleResize = () => setIsScreenSizeSm(window.innerWidth <= 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // The actual square size of each card
  const cardSize = isScreenSizeSm ? 160 : 220;
  const cardGap = isScreenSizeSm ? 20 : 32;

  const faceCount = galleryContent.length || 1;
  const faceWidth = cardSize + cardGap;

  // Radius of the circle each card sits on, spaced evenly by faceWidth.
  const radius = faceWidth / (2 * Math.tan(Math.PI / faceCount));

  // KEY FIX: perspective must scale with radius, or the 3D transform turns
  // into a fisheye/zoom effect instead of a gentle curved wall. A fixed
  // 1200px perspective only looks right for a small radius; with many
  // items (large radius) it has to grow to match, roughly 2.5-3x radius.
  const perspective = Math.max(1200, radius * 2.6);

  const cylinderWidth = Math.max(radius * 2 * Math.PI, faceWidth * faceCount);

  const dragFactor = 0.05;
  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const transform = useTransform(
    rotation,
    (val) => `rotate3d(0,1,0,${val}deg)`,
  );

  const startInfiniteSpin = (startAngle) => {
    controls.start({
      rotateY: [startAngle, startAngle - 360],
      transition: {
        duration: 80,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  useEffect(() => {
    if (autoplay) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    } else {
      controls.stop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay]);

  const handleUpdate = (latest) => {
    if (typeof latest.rotateY === "number") {
      rotation.set(latest.rotateY);
    }
  };

  const handleDrag = (_, info) => {
    controls.stop();
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    const finalAngle = rotation.get() + info.velocity.x * dragFactor;
    rotation.set(finalAngle);

    if (autoplay) {
      startInfiniteSpin(finalAngle);
    }
  };

  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      controls.stop();
    }
  };
  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      const currentAngle = rotation.get();
      startInfiniteSpin(currentAngle);
    }
  };

  const renderMediaItem = (item, index) => {
    const mediaStyle = {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
      display: "block",
    };

    const commonClasses =
      "pointer-events-none rounded-[1.2rem] border border-pink-200/30 bg-gradient-to-br from-white/20 via-rose-100/15 to-amber-100/20 shadow-[0_20px_60px_-20px_rgba(236,72,153,0.45)] ring-1 ring-white/10 backdrop-blur-md transition-all duration-500 ease-out group-hover:scale-105 group-hover:border-pink-300/70 group-hover:shadow-[0_0_35px_-8px_rgba(244,114,182,0.55)]";

    if (!item.type || item.type === "image") {
      return (
        <img
          src={item.url || item}
          alt={`gallery-item-${index}`}
          className={commonClasses}
          style={mediaStyle}
          draggable={false}
        />
      );
    }

    if (item.type === "video") {
      return (
        <video
          src={item.url}
          muted={item.muted ?? true}
          loop
          autoPlay={item.autoplay ?? true}
          controls={item.controls ?? false}
          className={commonClasses}
          style={mediaStyle}
          draggable={false}
        />
      );
    }

    return (
      <div
        className={`${commonClasses} flex items-center justify-center bg-gray-800`}
        style={mediaStyle}
      >
        <span className="text-white text-center">Unsupported Media</span>
      </div>
    );
  };

  return (
    <div className="relative mx-auto my-auto h-[420px] w-full overflow-hidden">
      <div className="absolute inset-x-0 top-1/2 h-40 -translate-y-1/2 rounded-full bg-pink-500/10 blur-3xl" />

      <div
        className="flex h-full items-center justify-center"
        style={{
          perspective: `${perspective}px`,
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          drag="x"
          dragElastic={0}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          animate={controls}
          onUpdate={handleUpdate}
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          className="flex min-h-[200px] cursor-grab active:cursor-grabbing items-center justify-center"
        >
          {galleryContent.map((item, i) => (
            <div
              key={i}
              className="group absolute flex items-center justify-center [backface-visibility:hidden]"
              style={{
                width: `${cardSize}px`,
                height: `${cardSize}px`,
                transform: `rotateY(${
                  (360 / faceCount) * i
                }deg) translateZ(${radius}px)`,
              }}
            >
              {renderMediaItem(item, i)}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default RollingGallery;
