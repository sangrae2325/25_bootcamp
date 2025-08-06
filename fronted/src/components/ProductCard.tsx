import { Product } from "../types";

type Props = {
  product: Product;
  onClick: () => void; // ✅ 필수 onClick prop
};

export default function ProductCard({ product, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        border: "1px solid #ccc",
        padding: "1rem",
        margin: "0.5rem",
        width: "200px",
        cursor: "pointer",
      }}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
      />
      <h3>{product.name}</h3>
      <p>{product.price.toLocaleString()}원</p>
    </div>
  );
}
