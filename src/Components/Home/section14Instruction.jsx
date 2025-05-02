import React from "react";

const instructions = [
  { img: "/Images/material.png", text: "AVOID WATER / MOISTURE" },
  { img: "/Images/Frame 1597883978.png", text: "AVOID PERFUME / LOTION" },
  { img: "/Images/oeeofiw.png", text: "REMOVE BEFORE SLEEPING" },
  { img: "/Images/box_14309182 (1).png", text: "STORE IN AN AIR TIGHTBOX" },
  { img: "/Images/Frame 1.png", text: "REMOVE BEFORE EXERCISE" },
  {
    img: "/Images/Frame 1597883980.png",
    text: "USE SOFT / DRY FABRIC TO CLEAN",
  },
];

const Section13Instruction = () => {
  return (
    <div className="heder_sec_main d-flex flex-column align-items-center dscdsc_inst">
      <span className="category_name">Instructions</span>
      <p className="category_txt">Store it Soft, Shine it Often</p>
      <img
        loading="eager"
        fetchpriority="high"
        src="/Images/Groupimg.png"
        alt="Decorative"
        className="home_tag_img"
      />
      <div className="container mt-2 mt-sm-4">
        <div className="row justify-content-center ">
          {instructions.map((item, index) => (
            <div
              key={index}
              className="col-6 col-sm-4 col-md-3 col-lg-2 d-flex flex-column align-items-center gap-2 instruction-item p-0"
            >
              <img src={item.img} alt={item.text} width={100} />
              <div className="instruction_tagline text-center">{item.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Section13Instruction;
