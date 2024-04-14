import TopNav from "@/components/nav/TopNav";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { NextAuthProvider } from "@/utils/NextAuthProvider";

export const metadata = {
  title: "Shop",
  description: "Online Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <NextAuthProvider>
        <body>
          <TopNav />
          <Toaster />
          {children}
        </body>
      </NextAuthProvider>
    </html>
  );
}
