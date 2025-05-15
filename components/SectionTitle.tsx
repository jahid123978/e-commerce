// import React from 'react';
// import { FaCircleChevronRight } from "react-icons/fa6";
// const SectionTitle = ({ title, path }: { title: string; path: string }) => {
//   return (
//     <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 py-12 sm:py-16 overflow-hidden">
//       {/* Decorative background elements */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-noise opacity-10 mix-blend-soft-light" />
//         <div className="absolute left-1/2 top-0 h-[200%] w-[120%] -translate-x-1/2 bg-gradient-radial from-white/10 via-transparent to-transparent" />
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//         {/* Animated breadcrumb path */}
//         <div className="flex items-center justify-center space-x-2 text-sm sm:text-base text-white/90 mb-3">
//           {path.split('|').map((part, index, arr) => (
//             <React.Fragment key={index}>
//               <span className="hover:text-white/100 transition-colors duration-200">
//                 {part.trim()}
//               </span>
//               {index !== arr.length - 1 && (
//                 <FaCircleChevronRight className="h-4 w-4 text-white/70" />
//               )}
//             </React.Fragment>
//           ))}
//         </div>

//         {/* Animated title */}
//         <h1 className="text-2xl sm:text-2xl lg:text-2xl font-bold tracking-tight text-white mb-2 animate-fade-in-up">
//           {title}
//         </h1>

//         {/* Decorative underline */}
//         <div className="mt-6 mx-auto w-24 h-1 bg-white/30 rounded-full overflow-hidden">
//           <div className="w-full h-full bg-white origin-left animate-scale-x" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SectionTitle;


import React from 'react';
import { FaCircleChevronRight } from "react-icons/fa6";

const SectionTitle = ({ title, path }: { title: string; path: string }) => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 py-7 sm:py-7 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-noise opacity-15 mix-blend-soft-light" />
        <div className="absolute left-1/2 top-0 h-[200%] w-[120%] -translate-x-1/2 bg-gradient-radial from-purple-400/20 via-transparent to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Animated breadcrumb path */}
        <div className="flex items-center justify-center space-x-2 text-sm sm:text-base text-white/90 mb-3">
          {path.split('|').map((part, index, arr) => (
            <React.Fragment key={index}>
              <span className="hover:text-white/100 transition-colors duration-200 hover:scale-105 inline-block">
                {part.trim()}
              </span>
              {index !== arr.length - 1 && (
                <FaCircleChevronRight className="h-4 w-4 text-white/70 ml-2" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Animated title */}
        <h1 className="text-2xl sm:text-2xl lg:text-2xl font-bold tracking-tight text-white mb-2 animate-fade-in-up">
          {title}
        </h1>

        {/* Decorative underline */}
        <div className="mt-6 mx-auto w-24 h-1.5 bg-white/30 rounded-full overflow-hidden">
          <div className="w-full h-full bg-white origin-left animate-scale-x" />
        </div>
      </div>
    </div>
  );
};

export default SectionTitle;