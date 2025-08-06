import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, createProduct } from "../api/productApi";
import { Product } from "../types";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

export default function ProductListPage() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // products 데이터 조회
  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const mutation = useMutation<Product, Error, Omit<Product, "id">>({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setShowForm(false);
      alert("상품이 등록되었습니다!");
    },
    onError: (error) => {
      alert("상품 등록 중 오류가 발생했습니다.");
      console.error(error);
    },
  });

  const [showForm, setShowForm] = useState(false);

  const handleCreate = async (newProduct: Omit<Product, "id">) => {
    await mutation.mutateAsync(newProduct);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류가 발생했습니다.</div>;

  return (
    <>
      <div className="flex justify-end p-4">
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          상품 등록하기
        </button>
      </div>

      <div className="p-8 grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/products/${product.id}`)}
          />
        ))}
      </div>

      {showForm && (
        <ProductForm
          onClose={() => setShowForm(false)}
          onSubmit={handleCreate}
        />
      )}
    </>
  );
}
