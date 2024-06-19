import Pagination from "@/components/product/Pagination";
import ProductCard from "@/components/product/ProductCard";

export const metadata = {
  title: "Next Ecommerce",
  description: "Find the latest in fashion, electronics and more",
};

async function getProducts(searchParams) {
  const searchQuery = new URLSearchParams({
    page: searchParams?.page || 1,
  }).toString();
  const response = await fetch(
    `${process.env.API}/product?
  ${searchQuery}`,
    {
      method: "GET",
      next: { revalidate: 1 },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const data = await response.json();
  return data;
}
export default async function Home({ searchParams }) {
  // console.log("searchParams => ", searchParams);
  const { products, currentPage, totalPages } = await getProducts(searchParams);

  return (
    <div>
      <h1
        className="d-flex justify-content-center align-items-center vh-
  100 text-uppercase"
      >
        Latest Products
      </h1>
      <div className="row">
        {products?.map((product) => (
          <ProductCard product={product} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pathname="/"
      />
      ;
    </div>
  );
}
