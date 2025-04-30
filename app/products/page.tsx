import { DataTable } from "../_components/ui/data-table";
import { productTableColumn } from "./_components/table-columns";
import { getProducts } from "../_data-access/product/get-products";
import ProductList from "./_components/product-list";
import AddProductButton from "./_components/add-product-button";

const ProductsPage = async () => {
  const products = await getProducts();

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
        <AddProductButton />
      </div>

      {/* TABELA */}
      <ProductList />
      <DataTable
        columns={productTableColumn}
        data={JSON.parse(JSON.stringify(products))}
      />
    </div>
  );
};

export default ProductsPage;
