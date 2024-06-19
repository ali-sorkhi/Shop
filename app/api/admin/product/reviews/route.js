import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Product from "@/models/product";
import queryString from "query-string";
export async function GET(req) {
  await dbConnect();
  const searchParams = queryString.parseUrl(req.url).query;
  const { page } = searchParams || {};
  const pageSize = 6; // Number of reviews per page
  try {
    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * pageSize;
    // Count all ratings, not just documents
    const allRatings = await Product.aggregate([
      {
        $unwind: "$ratings",
      },
    ]);
    const totalReviews = allRatings.length;
    const reviews = await Product.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $unwind: "$ratings",
      },
      {
        $project: {
          _id: 0,
          product: {
            title: 1,
            slug: 1,
            images: { $arrayElemAt: ["$images", 0] },
          },
          rating: "$ratings.rating",
          comment: "$ratings.comment",
          postedBy: "$ratings.postedBy",
        },
      },
    ])
      .skip(skip)
      .limit(pageSize);
    return NextResponse.json(
      {
        reviews,
        currentPage,
        totalPages: Math.ceil(totalReviews / pageSize),
      },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: "Server error. Please try again.",
      },
      { status: 500 }
    );
  }
}
