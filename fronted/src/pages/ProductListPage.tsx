import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProducts, createProduct } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { Product } from "../types";

export default function ProductListPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const mutation = useMutation({
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

  const handleCreateProduct = async (newProduct: Omit<Product, "id">) => {
    mutation.mutate(newProduct);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !products)
    return <div>상품 정보를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div style={{ padding: "1rem" }}>
      <button onClick={() => setShowForm(true)}>상품 등록</button>

      {showForm && (
        <ProductForm
          onSubmit={handleCreateProduct}
          onClose={() => setShowForm(false)} // 여기서 onCancel 대신 onClose 사용
        />
      )}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          marginTop: "1rem",
        }}
      >
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => navigate(`/products/${product.id}`)}
          />
        ))}
      </div>
    </div>
  );
}
