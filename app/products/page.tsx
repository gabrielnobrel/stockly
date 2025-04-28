import { PlusIcon } from "lucide-react";
import { Button } from "../_components/ui/button";
import { DataTable } from "../_components/ui/data-table";
import { productTableColumn } from "./_components/table-columns";
import ProductList from "./_components/product-list";
// import { getProducts } from "../_data-access/product/get-products";

const ProductsPage = async () => {
  // const products = await getProducts();
  const response = await fetch("http://localhost:3000/api/products", {
    method: "GET",
  });

  const { products } = await response.json();

  return (
    <div className="m-8 w-full space-y-8 rounded-lg bg-white p-8">
      {/* ESQUERDA */}
      <div className="flex w-full items-center justify-between">
        <div className="space-y-i">
          <span className="text-xs font-semibold text-slate-500">
            Gestão de Produtos
          </span>
          <h2 className="text-xl font-semibold">Products</h2>
        </div>

        <Button className="gap-2">
          <PlusIcon size={20} />
          Novo Produto
        </Button>
      </div>

      {/* TABELA */}
      <ProductList />
      {/* <DataTable
        columns={productTableColumn}
        data={JSON.parse(JSON.stringify(products))}
      /> */}
    </div>
  );
};

export default ProductsPage;
