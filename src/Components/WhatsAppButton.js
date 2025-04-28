// // components/WhatsAppButton.jsx
// import React from "react";
// import { useLocation } from "react-router-dom";

// const WhatsAppButton = () => {
//   const location = useLocation();
//   const phoneNumber = "919081139039";
//   // const phoneNumber = "919099975424";
//   const currentUrl =
//     typeof window !== "undefined"
//       ? `${window.location.origin}${location.pathname}${location.search}`
//       : `https://yourdomain.com${location.pathname}${location.search}`;

//   const message = `${currentUrl} \n Hey! I need help with something.`;
//   const encodedMessage = encodeURIComponent(message);

//   return (
//     <a
//       href={`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`}
//       className="whatsapp-float"
//       target="_blank"
//       rel="noopener noreferrer"
//     >
//       <img
//         src='/Images/whatsapp_3670051.png'
//         alt="WhatsApp"
//         style={{
//           width: "55px",
//           height: "55px",
//           borderRadius: "50px",
//           padding: "7px",
//         }}
//         className="whatsappIcon-mobile"
//       />
//     </a>
//   );
// };

// export default WhatsAppButton;
