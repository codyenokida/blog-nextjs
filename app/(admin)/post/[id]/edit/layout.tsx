export const metadata = {
  title: "Edit a Post!",
  description: "Post Editting from Kota Cody Enokida",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <body>{children}</body>;
}
