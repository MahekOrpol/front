import React, { useState } from 'react';
import './index.css';
import { FaRegPlayCircle } from "react-icons/fa";

const RingSizeInfoBox = () => {
  const [open, setOpen] = useState(false);

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
       <div className="video-content" onClick={(e) => e.stopPropagation()}>     
          <span className="close-btn" onClick={() => setOpen(false)}>&times;</span>
            <video autoPlay className="video-player">
              <source src="/videos/ring-size.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
};

export default RingSizeInfoBox;
