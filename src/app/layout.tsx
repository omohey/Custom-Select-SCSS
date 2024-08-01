import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "SCSS Select",
  description: "Using SCSS for select component",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body >

        {children}
      </body>
    </html>
  );
}
