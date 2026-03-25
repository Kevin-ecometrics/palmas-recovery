"use client";

import React from "react";
import { useTranslation } from "react-i18next";

import Link from "next/link";
const NotFound: React.FC = () => {
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
      <Link
        href="/"
        className="bg-wine text-white font-semibold py-3 px-6 rounded-lg hover:from-hover cursor-pointer hover:to-principal transition-all duration-200 transform hover:scale-[1.05]"
      >
        {t("notFound.cta")}
      </Link>
    </div>
  );
};

export default NotFound;
