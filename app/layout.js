import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pantry Tracker",
  description: "A pantry inventory management app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry>
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
