// // import React, { useState } from 'react';

// // const CustomCarousel = ({ images = [] }) => {
// //   const [index, setIndex] = useState(0);

// //   if (images.length === 0) {
// //     return (
// //       <div>
// //         <img
// //           src="https://via.placeholder.com/300?text=No+Image"
// //           className="img-fluid"
// //           alt="No Product"
// //           style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
// //         />
// //       </div>
// //     );
// //   }

// //   const handlePrev = () => {
// //     setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
// //   };

// //   const handleNext = () => {
// //     setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
// //   };

// //   return (
// //     <div>
// //       <img
// //         src={images[index]}
// //         className="img-fluid"
// //         alt="Main Product"
// //         style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
// //         onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=No+Image')}
// //       />
// //       {images.length > 1 && (
// //         <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
// //           <button
// //             onClick={handlePrev}
// //             style={{
// //               background: 'rgba(0,0,0,0.5)',
// //               color: 'white',
// //               border: 'none',
// //               padding: '10px',
// //               cursor: 'pointer',
// //             }}
// //           >
// //             <i className="bi bi-arrow-left-short"></i>
// //           </button>
// //           <div style={{ display: 'flex', overflow: 'hidden', width: '100%', justifyContent: 'center' }}>
// //             {images.map((img, i) => (
// //               <img
// //                 key={i}
// //                 src={img}
// //                 alt={`Thumbnail ${i}`}
// //                 style={{
// //                   width: '80px',
// //                   height: '80px',
// //                   objectFit: 'cover',
// //                   margin: '0 5px',
// //                   border: i === index ? '2px solid #000' : 'none',
// //                   cursor: 'pointer',
// //                 }}
// //                 onClick={() => setIndex(i)}
// //                 onError={(e) => (e.target.src = 'https://via.placeholder.com/80?text=No+Image')}
// //               />
// //             ))}
// //           </div>
// //           <button
// //             onClick={handleNext}
// //             style={{
// //               background: 'rgba(0,0,0,0.5)',
// //               color: 'white',
// //               border: 'none',
// //               padding: '10px',
// //               cursor: 'pointer',
// //             }}
// //           >
// //             <i className="bi bi-arrow-right-short"></i>
// //           </button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default CustomCarousel;


// import React, { useState } from 'react';

// const CustomCarousel = ({ images = [] }) => {
//   const [index, setIndex] = useState(0);

//   if (images.length === 0) {
//     return (
//       <div>
//         <img
//           src=" "
//           className="img-fluid"
//           alt="No Product"
//           style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
//         />
//       </div>
//     );
//   }

//   const handlePrev = () => {
//     setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
//   };

//   const visibleThumbnails = images.slice(
//     Math.max(0, index - 2),
//     Math.min(images.length, index + 3)
//   );

//   return (
//     <div>
//       {/* Main Image */}
//       <img
//         src={product.productImages[index]}
//         className="img-fluid"
//         alt="Main Product"
//         style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
//         onError={(e) => (e.target.src = 'https://via.placeholder.com/300?text=No+Image')}
//       />

//       {/* Thumbnails with Navigation */}
//       {product.productImage.length > 1 && (
//         <div style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
//           {/* Left Arrow */}
//           <button
//             onClick={handlePrev}
//             style={{
//               background: 'rgba(0,0,0,0.5)',
//               color: 'white',
//               border: 'none',
//               padding: '10px',
//               cursor: 'pointer',
//             }}
//           >
//             <i className="bi bi-arrow-left-short"></i>
//           </button>

//           {/* Thumbnails */}
//           <div
//             style={{
//               display: 'flex',
//               overflow: 'hidden',
//               width: '100%',
//               justifyContent: 'center',
//             }}
//           >
//             {visibleThumbnails.map((img, i) => (
//               <img
//                 key={i}
//                 src={img}
//                 alt={`Thumbnail ${i}`}
//                 style={{
//                   width: '80px',
//                   height: '80px',
//                   objectFit: 'cover',
//                   margin: '0 5px',
//                   border: images.indexOf(img) === index ? '2px solid #000' : 'none',
//                   cursor: 'pointer',
//                 }}
//                 onClick={() => setIndex(images.indexOf(img))}
//                 onError={(e) => (e.target.src = 'https://via.placeholder.com/80?text=No+Image')}
//               />
//             ))}
//           </div>

//           {/* Right Arrow */}
//           <button
//             onClick={handleNext}
//             style={{
//               background: 'rgba(0,0,0,0.5)',
//               color: 'white',
//               border: 'none',
//               padding: '10px',
//               cursor: 'pointer',
//             }}
//           >
//             <i className="bi bi-arrow-right-short"></i>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomCarousel;