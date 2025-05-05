import React, { useRef, useState, useEffect } from "react";

const LazyVideo = ({ src, type = "video/mp4", ...props }) => {
  const [isVisible, setIsVisible] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      {...props}
      preload="none"
      src={isVisible ? src : undefined}
    >
      <source src={isVisible ? src : undefined} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default LazyVideo;
