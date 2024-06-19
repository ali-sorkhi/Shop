import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductImage from "@/components/product/ProductImage";
import ProductLike from "@/components/product/ProductLike";
import ProductRating from "@/components/product/ProductRating";
import UserReviews from "@/components/product/UserReviews";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";

dayjs.extend(relativeTime);
async function getProducts(slug) {
  try {
    const response = await fetch(`${process.env.API}/product/${slug}`, {
      method: "GET",
      next: { revalidate: 1 },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch products`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
export default async function ProductViewPage({ params }) {
  const { product, relatedProducts } = await getProducts(params.slug);
  return (
    <div className="container mb-5">
      <div className="row">
        <div className="col-lg-8 mb-4">
          <div className="card">
            {/* images and preview modal */}
            <ProductImage product={product} />
            {/* card body */}
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <div className="card-text">
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.description.replace(/\./g, "<br/>"),
                  }}
                ></div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <small className="text-muted">
                Category:{" "}
                <Link href={`/category/${product.category.name}`}>
                  {" "}
                  {product.category.name}
                </Link>
              </small>
              <small className="text-muted">
                Tags:{" "}
                {product.tags.map((tag) => (
                  <Link href={`/tag/${tag.name}`}>{tag.name} </Link>
                ))}
              </small>
            </div>
            <div className="card-footer d-flex justify-content-between">
              <ProductLike product={product} />
              <div className="card-footer text-center">
                <ProductRating product={product} />
              </div>{" "}
              <small className="text-muted">
                Added {dayjs(product.createdAt).fromNow()}
              </small>
            </div>
          </div>
        </div>
        <div className="col-lg-4">Add to cart / wishlist</div>
      </div>
      <div className="row">
        <div className="col my-5">
          <p className="lead">Related products</p>
        </div>
      </div>
      <div className="row">
        <div className="col my-5">
          <UserReviews reviews={product?.ratings} />
        </div>
      </div>
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <p className="lead text-center my-5">Other products you may like</p>
          <div className="row">
            {relatedProducts?.map((product) => (
              <div className="col-lg-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
