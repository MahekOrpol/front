// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import "./ring.css";

// const stoneShapes = [
//   { id: 1, src: require("../../Images/pear.png"), alt: "Round" },
//   { id: 2, src: require("../../Images/sdcdcdx.png"), alt: "Princess" },
//   { id: 3, src: require("../../Images/xdfvdfcvdfx.png"), alt: "Pear" },
//   { id: 4, src: require("../../Images/fvdfvdfvd.png"), alt: "Oval" },
//   { id: 5, src: require("../../Images/dfevdvdvfv.png"), alt: "Marquise" },
// ];

// const Ring = () => {
//   const [angle, setAngle] = useState(0);

//   const rotateSlider = (direction) => {
//     setAngle(angle + direction * (380 / stoneShapes.length));
//   };

//   return (
//     <div className="ring-section">
//       <div className="slider-container">
//         <motion.div
//           className="circle"
//           animate={{ rotate: angle }}
//           transition={{ duration: 0.8, ease: "easeInOut" }}
//         >
//           {stoneShapes.map((shape, index) => {
//             const rotationAngle = (index * 360) / stoneShapes.length;
//             return (
//               <motion.div
//                 key={shape.id}
//                 className="stone"
//                 style={{
//                   transform: `rotate(${rotationAngle}deg) translate(100px) rotate(-${rotationAngle}deg)`,
//                 }}
//               >
//                 <img src={shape.src} alt={shape.alt} />
//               </motion.div>
//             );
//           })}
//         </motion.div>

//         <button onClick={() => rotateSlider(-1)}>◀</button>
//         <button onClick={() => rotateSlider(1)}>▶</button>
//       </div>
//     </div>
//   );
// };

// export default Ring;
