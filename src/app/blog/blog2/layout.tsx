import { Metadata } from "next";

export const metadata: Metadata = {
  title: "The ideal weather for plastic surgery & smooth recovery in Tijuana? ",
  description:
    "Why autumn is the golden season for your surgery and post-op care. In this blog, we provide an in-depth look at the seasonal benefits for each procedure.",
  keywords: ["Recovery", "procedures", "season", "healing", "tijuana"],
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
