import React from "react";

const Loading = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-3 
                    bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 
                    transition-colors">

      {/* Spinner */}
      <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-900 
                      dark:border-gray-700 dark:border-t-white 
                      rounded-full animate-spin" />

      {/* Text */}
      <p className="text-sm">Loading…</p>
    </div>
  );
};

export default Loading;

