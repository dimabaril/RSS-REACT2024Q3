import type { Metadata } from "next";

import { ThemeProvider } from "../contexts/ThemeContext";
import "../index.scss";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <ThemeProvider>
        <html lang="en">
          <body>
            <div id="__next">{children}</div>
          </body>
        </html>
      </ThemeProvider>
    </StoreProvider>
  );
}
