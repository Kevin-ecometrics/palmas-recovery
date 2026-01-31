"use client";

import { I18nextProvider } from "react-i18next";
import { useEffect } from "react";
import i18n from "./i18n";

const STORAGE_KEY = "appLanguage";

type Props = {
  children: React.ReactNode;
};

export default function I18nProvider({ children }: Props) {
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored !== i18n.language) {
      i18n.changeLanguage(stored);
    }

    const updateLang = (lng: string) => {
      localStorage.setItem(STORAGE_KEY, lng);
      document.documentElement.lang = lng;
      document.cookie = `${STORAGE_KEY}=${lng}; path=/; max-age=31536000`;
    };

    updateLang(i18n.language || "en");
    i18n.on("languageChanged", updateLang);

    return () => {
      i18n.off("languageChanged", updateLang);
    };
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export { STORAGE_KEY };
