import { NextResponse } from "next/server";
import dbConnect from "@/utils/dbConnect";
import Category from "@/models/category";
import slugify from "slugify";

//Adding new Category:
export async function POST(req) {
  const body = await req.json();

  await dbConnect();

  try {
    const { name } = body;
    const category = await Category.create({
      name,
      slug: slugify(name),
    });

    return NextResponse.json(category);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        err: err.message,
      },
      { status: 500 }
    );
  }
}

//Listing all Categories
export async function GET(req) {
  await dbConnect();

  try {
    const categories = await Category.find({});

    return NextResponse.json(categories);
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
