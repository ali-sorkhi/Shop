import Link from "next/link";
export default function UserNAv() {
  return (
    <>
      <nav className="flex flex-row p-2 shadow justify-center ">
        <Link className="p-2" href="/dashboard/user">
          User
        </Link>
        <Link className="p-2" href="/dashboard/user/orders">
          Orders
        </Link>
        <Link className="p-2" href="/dashboard/user/product/reviews">
          Reviews
        </Link>
      </nav>
    </>
  );
}
