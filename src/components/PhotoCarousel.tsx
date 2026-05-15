"use client";

import React from "react";

interface PhotoCarouselProps {
  photos: string[];
}

export default function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (!photos || photos.length === 0) {
    return (
      <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center">
        <p className="text-gray-500">No photos available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Main Image */}
      <div className="relative rounded-2xl overflow-hidden bg-gray-100">
        <img
          src={photos[currentIndex]}
          alt={`Restaurant photo ${currentIndex + 1}`}
          className="w-full h-64 md:h-96 object-cover"
         />
        {photos.length > 1 && (
           <>
             {/* Previous Button */}
             <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
              aria-label="Previous photo"
             >
               <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
               </svg>
             </button>

             {/* Next Button */}
             <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
              aria-label="Next photo"
             >
               <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
               </svg>
             </button>
           </>
         )}

         {/* Photo Counter */}
         {photos.length > 1 && (
           <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
             {currentIndex + 1} / {photos.length}
           </div>
         )}
       </div>

       {/* Thumbnail Strip */}
       {photos.length > 1 && (
         <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
           {photos.map((photo, index) => (
             <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === index
                   ? "border-emerald-600 ring-2 ring-emerald-300"
                   : "border-gray-200 hover:border-emerald-400"
               }`}
             >
               <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-20 h-20 md:w-24 md:h-24 object-cover"
               />
             </button>
           ))}
         </div>
       )}
     </div>
   );
}
