import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SERVER_URL, SITE_DESCRIPTION, SITE_NAME } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description: `${SITE_DESCRIPTION}`,
  metadataBase: new URL(SERVER_URL),
};

//TODO fix theme issue

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
