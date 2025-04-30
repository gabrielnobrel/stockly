import "server-only";

import { db } from "@/app/_lib/prisma";
import { Product } from "@/app/generated/prisma";

// Pegar os produtos do banco de dados
export const getProducts = async (): Promise<Product[]> => {
  return await db.product.findMany({});
};
