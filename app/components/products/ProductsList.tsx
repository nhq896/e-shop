"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { pageNum } from "@/actions/getProducts";

interface ProductsListProps {
  products: any[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
  const [page, setPage] = useState(1);
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {products.slice(0, page * pageNum).map((product: any) => {
          return <ProductCard key={product.id} data={product} />;
        })}
      </div>
      {page * pageNum <= products.length && (
        <div className="w-full flex justify-center mt-6 p-2">
          <button
            onClick={() => {
              setPage(page + 1);
            }}
            className="px-4 py-2 rounded-full text-lg bg-slate-700 text-slate-100 animate-bounce transition hover:bg-slate-600 shadow-md shadow-slate-200"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
};

export default ProductsList;
