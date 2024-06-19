import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import ProductLike from "./ProductLike";
import Stars from "./Stars";
import { calculateAverageRating } from "@/utils/helpers";
import ProductRating from "./ProductRating";
import AddToCart from "./AddToCart";

dayjs.extend(relativeTime);

export default function ({ product }) {
  return (
    <div key={product?._id} className="card my-3">
      <div style={{ height: "200px", overflow: "hidden" }}>
        <Image
          src={product?.images?.[0]?.secure_url || "/images/default.jpeg"}
          width={500}
          height={300}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          alt={product?.title}
        />
      </div>
      <div className="card-body">
        <Link href={`/product/${product?.slug}`}>
          <h5 className="card-title">{product?.title}</h5>
        </Link>
        <div
          dangerouslySetInnerHTML={{
            __html:
              product?.description?.length > 160
                ? `${product?.description?.substring(0, 160)}..`
                : product?.description,
          }}
        />
      </div>
      {/* before accessing category and tags, make sure .populate() is
    used in api routes and ref: 'Category' models are imported in `Product`
    model */}
      <div className="card-footer d-flex justify-content-between">
        <small>Category: {product?.category?.name}</small>
        <small>Tags: {product?.tags?.map((t) => t?.name).join(" ")}</small>
      </div>
      <div className="card-footer d-flex justify-content-between">
        <ProductLike product={product} />
        <small>Posted {dayjs(product?.createdAt).fromNow()}</small>
      </div>
      <div className="card-footer">
        {/* <pre>{JSON.stringify(product?.ratings, null, 4)}</pre> */}
        <div className="d-flex justify-content-between align-items-center">
          <small className="text-muted">Brand: {product?.brand}</small>
          <div>
            <small className="text-muted ml-1">Brand: {product?.brand}</small>
            <ProductRating product={product} leaveRating={false} />
          </div>
          <div>
            <AddToCart product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}
