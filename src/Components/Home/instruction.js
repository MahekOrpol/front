import React from 'react';
import './index.css'; // Create a CSS file for additional styling if needed

const instructions = [
  { img: require('../../Images/material.png'), text: 'AVOID WATER / MOISTURE' },
  { img: require('../../Images/oeeofiw.png'), text: 'REMOVE BEFORE SLEEPING' },
  { img: require('../../Images/fragrance_6211860.png'), text: 'AVOID PERFUME / LOTION' },
  { img: require('../../Images/box_14309182 (1).png'), text: 'STORE IN AN AIR TIGHTBOX' },
  { img: require('../../Images/Frame 1.png'), text: 'REMOVE BEFORE EXERCISE'},
  { img: require('../../Images/wash_7040452.png'), text: 'USE SOFT / DRY FABRIC TO CLEAN' }
];

const Instruction = () => {
  return (
    <div className='container mt-4'>
      <div className='row justify-content-center '>
        {instructions.map((item, index) => (
          <div key={index} className='col-6 col-sm-4 col-md-3 col-lg-2 d-flex flex-column align-items-center gap-2 instruction-item'>
            <img src={item.img} alt={item.text} width={100} />
            <div className='instruction_tagline text-center'>{item.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instruction;
