"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ThreeDots } from "react-loader-spinner";
import { useProduct } from "@/context/product";
import { BsFillCartCheckFill } from "react-icons/bs";

export default function TopNav() {
  const { data, status, loading } = useSession();
  const {
    productSearchQuery,
    setProductSearchQuery,
    fetchProductSearchResults,
  } = useProduct();

  return (
    <nav className="flex flex-row justify-between p-2 shadow bg-white ">
      <Link href="/">Home</Link>
      <Link href="/shop">Shop</Link>
      <form
        className="d-flex mx-2"
        role="search"
        onSubmit={fetchProductSearchResults}
      >
        <input
          className="form-control"
          type="search"
          placeholder="Search products"
          aria-label="Search"
          onChange={(e) => setProductSearchQuery(e.target.value)}
          value={productSearchQuery}
        />
        <button className="btn" type="submit" style={{ borderRadius: "20px" }}>
          &#128270;
        </button>
      </form>
      {status === "authenticated" ? (
        <div className="flex flex-row gap-4">
          <Link className="nav-link text-danger" href="/cart">
            <BsFillCartCheckFill size={25} />
          </Link>
          <Link
            href={`/dashboard/${
              data?.user?.role === "admin" ? "admin" : "user"
            }`}
          >
            {data?.user?.name}
          </Link>

          <a
            className="cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Logout
          </a>
        </div>
      ) : status === "loading" ? (
        <div className="mr-5 mt-1">
          <ThreeDots
            visible={true}
            height="20"
            width="50"
            color="#90e0ef"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="flex flex-row gap-4">
          <Link href="/login">login</Link>
          <Link href="/register">register</Link>
        </div>
      )}
    </nav>
  );
}
