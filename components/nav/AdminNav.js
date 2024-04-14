import Link from "next/link";
export default function AdminNav() {
  return (
    <>
      <nav className="flex flex-row p-2 shadow justify-center ">
        <Link className="p-2" href="/dashboard/admin">
          Admin
        </Link>
        <Link className="p-2" href="/dashboard/admin/product/create">
          Create Product
        </Link>
      </nav>
    </>
  );
}
