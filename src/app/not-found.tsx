"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const NotFound: React.FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-bold text-principal mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-slate-800 mb-6">
        {t("notFound.title")}
      </h2>
      <p className="text-slate-600 mb-8 max-w-lg">
        {t("notFound.description")}
      </p>
      <button
        onClick={() => router.push("/")}
        className="bg-gradient-to-r from-principal to-secundario text-white font-semibold py-3 px-6 rounded-lg hover:from-hover cursor-pointer hover:to-principal transition-all duration-200 transform hover:scale-[1.05]"
      >
        {t("notFound.cta")}
      </button>
    </div>
  );
};

export default NotFound;
