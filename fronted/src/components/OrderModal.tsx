import { useState } from "react";
import { createOrder } from "../api/orderApi";
import { Product } from "../types";
import "./OrderModal.css";

interface Props {
  userId: number;
  product: Product;
  onClose: () => void;
}

export default function OrderModal({ userId, product, onClose }: Props) {
  const [quantity, setQuantity] = useState(1);

  const handleOrder = async () => {
    try {
      await createOrder({
        userId,
        items: [{ productId: product.id, quantity }],
      });
      alert("구매 완료!");
      onClose();
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.error) {
        alert(`주문 실패: ${error.response.data.error}`);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
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
