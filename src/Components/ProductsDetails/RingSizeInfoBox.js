import React, { useEffect, useState } from 'react';
import './index.css';
import { FaRegPlayCircle } from "react-icons/fa";

const RingSizeInfoBox = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const body = document.body;

    if (open) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }

    return () => {
      body.classList.remove("no-scroll");
    };
  }, [open]);

  return (
    <>
      <div className="ring-size-box w-100 mt-3" onClick={() => setOpen(true)}>
        <div className="arrow-up" />
        <div className="ring-size-content">
          <span className="ring-size-text">Not sure about your ring size?</span>
          <button className="learn-how-btn">
            LEARN HOW <FaRegPlayCircle  size={24} className='play-icon'/>
          </button>
        </div>
      </div>

      {/* Video Modal */}
      {open && (
       <div className="video-modal" onClick={() => setOpen(false)}>
        <div className="px-2">
       <div className="video-content" onClick={(e) => e.stopPropagation()}>     
          <span className="close-btn" onClick={() => setOpen(false)}>&times;</span>
            <video autoPlay className="video-player">
              <source src="/videos/ring-size.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default RingSizeInfoBox;
