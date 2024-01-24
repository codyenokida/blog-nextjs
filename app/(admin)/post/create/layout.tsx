export const metadata = {
  title: "Create a Post :D",
  description: "Post Generation for Kota Cody Enokida blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
