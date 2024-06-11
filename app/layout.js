import TopNav from "@/components/nav/TopNav";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { NextAuthProvider } from "@/utils/NextAuthProvider";
import { CategoryProvider } from "@/context/category";
import { TagProvider } from "@/context/tag";
import { ProductProvider } from "@/context/product";

export const metadata = {
  title: "Shop",
  description: "Online Shop",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <NextAuthProvider>
        <CategoryProvider>
          <TagProvider>
            <ProductProvider>
              <body>
                <TopNav />
                <Toaster />
                {children}
              </body>
            </ProductProvider>
          </TagProvider>
        </CategoryProvider>
      </NextAuthProvider>
    </html>
  );
}
