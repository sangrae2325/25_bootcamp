import { useState } from "react";
import { createOrder } from "../api/orderApi";
import { Product } from "../types";
import "./OrderModal.css"; // 👈 스타일 추가

interface Props {
  userId: number;
  product: Product;
  onClose: () => void;
}

export default function OrderModal({ userId, product, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);

  const handleOrder = async () => {
    await createOrder({
      userId,
      items: [{ productId: product.id, quantity }],
    });
    alert("구매 완료!");
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2 className="modal-title">구매: {product.name}</h2>
        <p>가격: {product.price.toLocaleString()}원</p>
        <input
          type="number"
          value={quantity}
          min={1}
          max={product.stock}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <div className="modal-footer">
          <button className="modal-button confirm" onClick={handleOrder}>
            구매하기
          </button>
          <button className="modal-button cancel" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
