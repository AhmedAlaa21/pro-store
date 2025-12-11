"use server";
import prisma from "../prisma";
import { convertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../constants";

// Get Latest Products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedData = data.map((product) => ({
    ...product,
    // Prisma Decimal -> string for compatibility with TProduct
    price: product.price.toString(),
    rating: Number(product.rating),
  }));

  return convertToPlainObject(formattedData);
}
