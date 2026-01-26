"use client";

import React from "react";
import { useRouter } from "next/navigation";

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-principal mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6">
        Page Not Found
      </h2>
      <p className="text-slate-600 mb-8 max-w-lg">
        Sorry, the page you are looking for does not exist. It might have been
        removed or the URL is incorrect.
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-gradient-to-r from-principal to-secundario text-white font-semibold py-3 px-6 rounded-lg hover:from-hover cursor-pointer hover:to-principal transition-all duration-200 transform hover:scale-[1.05]"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
