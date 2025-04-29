import { db } from "@/app/_lib/prisma";

// *Apenas para referência

export async function GET() {
  const products = await db.product.findMany({});

  return Response.json(
    { products },
    {
      status: 200,
    },
  );
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log("Corpo da requisição:", body);

  const { name, price, stock } = body;

  await db.product.create({
    data: {
      name,
      price,
      stock,
    },
  });

  return Response.json(
    { message: "Produto criado com sucesso!" },
    { status: 201 },
  );
}
