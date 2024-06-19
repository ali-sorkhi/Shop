import Link from "next/link";
import UserNAv from "@/components/nav/UserNav";
export default function UserLayout({ children }) {
  return (
    <>
      <UserNAv />
      {children}
    </>
  );
}
