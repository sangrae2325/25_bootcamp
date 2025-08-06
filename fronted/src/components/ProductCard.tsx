import { Product } from "../types";

interface Props {
  product: Product;
  onClick: () => void;
}

export default function ProductCard({ product, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="border rounded p-4 shadow hover:shadow-lg transition cursor-pointer"
      style={{ width: 200 }} // 카드 전체 너비 제한(필요시 조절)
    >
      <div
        style={{
          width: 180,
          height: 180,
          overflow: "hidden",
          margin: "0 auto",
          borderRadius: 8,
        }}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          // className="object-cover w-full h-full" // css로도 가능
        />
      </div>

      <h3 className="font-bold text-lg mt-2 text-center">{product.name}</h3>
      <p className="text-sm text-gray-500 text-center">
        {product.category || "카테고리 없음"}
      </p>
      <p className="text-sm text-gray-400 text-center">
        등록일:{" "}
        {product.createdAt
          ? new Date(product.createdAt).toLocaleDateString()
          : "날짜 없음"}
      </p>
      <p className="mt-1 text-gray-700 text-center">{product.description}</p>
      <p className="mt-2 text-blue-500 font-semibold text-center">
        {product.price.toLocaleString()}원
      </p>
    </div>
  );
}
