import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../api/productApi";
import { Product } from "../types";
import { useState } from "react";
import OrderModal from "../components/OrderModal";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const productId = id ? parseInt(id) : null;

  const [showModal, setShowModal] = useState(false);

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery<Product, Error>({
    queryKey: ["product", productId],
    queryFn: () => {
      if (!productId) return Promise.reject("상품 ID가 없습니다.");
      return fetchProductById(productId);
    },
    enabled: !!productId,
  });

  // 실제 로그인 유저 ID로 바꿔주세요
  const userId = 1;

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !product)
    return <div>상품 정보를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{
          width: "256px",
          height: "256px",
          objectFit: "cover",
          borderRadius: "8px",
          marginBottom: "1.5rem",
        }}
      />
      <h2
        style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}
      >
        {product.name}
      </h2>
      <p style={{ marginBottom: "0.5rem" }}>{product.description}</p>
      <p style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
        {product.price.toLocaleString()}원
      </p>
      <p style={{ color: "#666" }}>재고: {product.stock}</p>

      <button
        onClick={() => setShowModal(true)}
        style={{
          marginTop: "1.5rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#22c55e",
          color: "white",
          borderRadius: 4,
          border: "none",
          cursor: "pointer",
        }}
      >
        구매하기
      </button>

      {showModal && (
        <OrderModal
          userId={userId}
          product={product}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
