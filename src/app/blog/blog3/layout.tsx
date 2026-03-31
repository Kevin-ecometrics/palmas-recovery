import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Recovery House vs hotel: 3 Reasons professional care is Crucial ",
  description:
    "Your recovery space is part of your treatment. It’s not just about where you’ll sleep.Discover why true recovery requires medical expertise and supervision.",
  keywords: ["Recovery", "medical care", "professional care"],
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
