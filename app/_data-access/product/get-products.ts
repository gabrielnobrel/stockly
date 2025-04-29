import { db } from "@/app/_lib/prisma";
import { Product } from "@/app/generated/prisma";
import { unstable_cache } from "next/cache";
import { cache } from "react";

export const getProducts = async (): Promise<Product[]> => {
  console.log("Fetching products from database...");
  return await db.product.findMany({});
};

export const cachedGetProducts = cache(getProducts);
