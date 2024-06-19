import TopNav from "@/components/nav/TopNav";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { NextAuthProvider } from "@/utils/NextAuthProvider";
import { CategoryProvider } from "@/context/category";
import { TagProvider } from "@/context/tag";
import { ProductProvider } from "@/context/product";
import { CartProvider } from "@/context/cart";

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <NextAuthProvider>
        <CategoryProvider>
          <TagProvider>
            <ProductProvider>
              <CartProvider>
                <body>
                  <TopNav />
                  <Toaster />
                  {children}
                </body>
              </CartProvider>
            </ProductProvider>
          </TagProvider>
        </CategoryProvider>
      </NextAuthProvider>
    </html>
  );
}
