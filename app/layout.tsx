import { Metadata } from "next";

import "@/styles/globals.scss";
import { JetBrains_Mono } from "next/font/google";

export const metadata: Metadata = {
  title: "Welcomeeeee to my blog",
  description: "Blog by Kota Cody Enokida using NextJS and Google Firebase",
};

const jetBrains_Mono = JetBrains_Mono({ subsets: ["latin"] });

/**
 * Context Wrapper
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <html lang="en" className={jetBrains_Mono.className}>
      {children}
    </html>
  );
}
