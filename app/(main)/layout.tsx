import { Metadata } from "next";

import { Providers } from "@/providers/providers";
import HomeLayout from "@/components/Layouts/HomeLayout";

export const metadata: Metadata = {
  title: "Welcomeeeee to my blog",
  description: "Blog by Kota Cody Enokida using NextJS and Google Firebase",
};

/**
 * Context Wrapper
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactElement;
}) {
  return (
    <Providers>
      <HomeLayout>{children}</HomeLayout>
    </Providers>
  );
}
