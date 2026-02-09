"use client";

import React from "react";

interface LoadingScreenProps {
  message?: string;
  fullScreen?: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "LOADING...", 
  fullScreen = true 
}) => {
  return (
    <div className={`
      ${fullScreen ? "min-h-screen w-full" : "h-full w-full py-10"} 
      bg-[#09141A] flex flex-col items-center justify-center text-white italic
    `}>
      <div className="relative flex items-center justify-center mb-4">
        <div className="w-12 h-12 border-4 border-[#D4B785]/20 border-t-[#D4B785] rounded-full animate-spin"></div>
        
        <div className="absolute w-2 h-2 bg-[#D4B785] rounded-full animate-ping"></div>
      </div>

      <p className="text-sm tracking-[0.2em] text-[#D4B785] animate-pulse uppercase font-medium">
        {message}
      </p>
    </div>
  );
};

export default LoadingScreen;