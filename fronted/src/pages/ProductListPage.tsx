import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts,
  createProduct,
  searchProducts,
  fetchProductsSorted,
} from "../api/productApi";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import { Product } from "../types";

export default function ProductListPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  // 검색 input에 입력 중인 값
  const [inputValue, setInputValue] = useState("");
  // 실제 쿼리용 검색어 (엔터 시에만 변경)
  const [searchKeyword, setSearchKeyword] = useState("");
  const [sortBy, setSortBy] = useState("");

  // 정렬 선택 시 검색어 초기화
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
    setSearchKeyword(""); // 검색 초기화 (정렬과 검색 충돌 방지)
    setInputValue(""); // input도 초기화
  };

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[], Error>({
    queryKey: ["products", searchKeyword, sortBy],
    queryFn: () => {
      if (searchKeyword) return searchProducts(searchKeyword);
      if (sortBy) return fetchProductsSorted(sortBy);
      return fetchProducts();
    },
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

  // 검색 input에서 엔터 감지하면 검색어 업데이트
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSearchKeyword(inputValue.trim());
      setSortBy(""); // 검색 시 정렬 초기화(선택사항)
    }
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !products)
    return <div>상품 정보를 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div style={{ padding: "1rem" }}>
      {/* 구매내역 보기 버튼 추가 */}
      <button
        onClick={() => navigate("/orders")}
        style={{
          backgroundColor: "#2563eb",
          color: "white",
          padding: "0.5rem 1rem",
          borderRadius: "0.375rem",
          marginBottom: "1rem",
          cursor: "pointer",
          border: "none",
        }}
      >
        구매내역 보기
      </button>

      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem",
          width: "100%",
          maxWidth: 400,
        }}
      />

      <select
        value={sortBy}
        onChange={handleSortChange}
        style={{ marginBottom: "1rem", padding: "0.5rem" }}
      >
        <option value="">정렬 기준 선택</option>
        <option value="price_asc">가격 낮은 순</option>
        <option value="price_desc">가격 높은 순</option>
        <option value="newest">최신 등록순</option>
        <option value="oldest">오래된 순</option>
      </select>

      <button onClick={() => setShowForm(true)}>상품 등록</button>

      {showForm && (
        <ProductForm
          onSubmit={handleCreateProduct}
          onClose={() => setShowForm(false)}
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
