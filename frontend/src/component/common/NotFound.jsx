import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4 
                    bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 
                    transition-colors px-6">

      <h1 className="text-7xl font-bold text-gray-900 dark:text-white transition-colors">
        404
      </h1>

      <p className="text-lg text-gray-600 dark:text-gray-300 transition-colors">
        Page not found
      </p>

      <Link
        to="/"
        className="mt-4 text-blue-600 dark:text-blue-400 hover:underline text-sm transition-colors"
      >
        Go back home
      </Link>
    </div>
  );
}
