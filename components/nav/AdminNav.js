import Link from "next/link";
export default function AdminNav() {
  return (
    <>
      <nav className="flex flex-row p-2 shadow justify-center ">
        <Link className="p-2" href="/dashboard/admin">
          Admin
        </Link>
        <Link className="p-2" href="/dashboard/admin/category">
          Categories
        </Link>
        <Link className="p-2" href="/dashboard/admin/tag">
          Tags
        </Link>
        <Link className="p-2" href="/dashboard/admin/product">
          Add Product
        </Link>
        <Link className="p-2" href="/dashboard/admin/products">
          Products
        </Link>
        <Link className="p-2" href="/dashboard/admin/orders">
          Orders
        </Link>
        <Link className="p-2" href="/dashboard/admin/product/reviews">
          Reviews
        </Link>
      </nav>
    </>
  );
}
