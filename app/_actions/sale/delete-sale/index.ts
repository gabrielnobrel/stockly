"use server";

import { actionClient } from "@/app/_lib/safe-action";
import { deleteSaleSchema } from "./schema";
import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteSale = actionClient
  .schema(deleteSaleSchema)
  .action(async ({ parsedInput: { id } }) => {
    try {
      // Busca a venda com seus itens para usar infos depois (quantidade)
      const sale = await db.sale.findUnique({
        where: { id },
        include: { saleProducts: true },
      });

      if (!sale) {
        throw new Error("Venda não encontrada");
      }

      // Executa em transação: primeiro remove saleProducts, depois remove a sale,
      // e por fim repõe o estoque a partir dos dados já carregados em `sale`.
      await db.$transaction(async (trx) => {
        await trx.saleProduct.deleteMany({
          where: { saleId: id },
        });

        await trx.sale.delete({
          where: { id },
        });

        // Repor o estoque com base nas linhas que carregamos antes
        for (const product of sale.saleProducts) {
          await trx.product.update({
            where: { id: product.productId },
            data: {
              stock: {
                increment: product.quantity,
              },
            },
          });
        }
      });

      // Revalida as rotas relevantes
      // revalidatePath("/sales");
      // revalidatePath("/products");
      revalidatePath("/", "layout");
    } catch (error) {
      console.error("Erro ao deletar venda:", error);
      // relança para que o client/useAction receba onError
      throw error;
    }
  });
