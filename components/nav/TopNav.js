"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ThreeDots } from "react-loader-spinner";

export default function TopNav() {
  const { data, status, loading } = useSession();

  return (
    <nav className="flex flex-row justify-between p-2 shadow bg-white ">
      <Link href="/">Home</Link>
      {status === "authenticated" ? (
        <div className="flex flex-row gap-4">
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
