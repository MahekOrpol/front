import React from 'react'

const Instruction = () => {
  return (
    <div className='pt-4 w-100 container'> 
    <div className='d-flex justify-content-between'>
      <div className='d-flex align-items-center flex-column gap-2 instruction'>
        <img src={require('../../Images/material.png')} width={100}/>
        <div className='instruction_tagline'>
          AVOID WATER / MOISTURE
        </div>
      </div>
      <div className='d-flex align-items-center flex-column gap-2 instruction'>
        <img src={require('../../Images/oeeofiw.png')} width={100}/>
        <div className='instruction_tagline'>
          REMOVE BEFORE SLEEPING
        </div>
      </div>
      <div className='d-flex align-items-center flex-column gap-2 instruction'>
        <img src={require('../../Images/fragrance_6211860.png')} width={100}/>
        <div className='instruction_tagline'>
          AVOID PERFUME / LOTION
        </div>
      </div>
      <div className='d-flex align-items-center flex-column gap-2 instruction'>
        <img src={require('../../Images/box_14309182 (1).png')} width={100}/>
        <div className='instruction_tagline'>
          USE SOFT / DRY FABRIC TO CLEAN
        </div>
      </div>
      <div className='d-flex align-items-center flex-column gap-2 instruction'>
        <img src={require('../../Images/man_14431703.png')} width={83}/>
        <div className='instruction_tagline'>
          REMOVE BEFORE EXERCISE
        </div>
      </div>
           <div className='d-flex align-items-center flex-column gap-2 instruction'>
      <img src={require('../../Images/wash_7040452.png')} width={100}/>
        <div className='instruction_tagline'>
          REMOVE BEFORE EXERCISE
        </div>
      </div>
    </div>
    </div>
  )
}

export default Instruction
