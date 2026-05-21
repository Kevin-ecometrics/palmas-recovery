import type { Metadata } from "next";
import HomePage from "../components/HomePage";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.palmasrecovery.com/",
  },
};

export default function Page() {
  return <HomePage />;
}
