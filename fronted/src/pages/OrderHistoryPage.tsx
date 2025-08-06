import { useQuery } from "@tanstack/react-query";
import { fetchOrderHistory } from "../api/orderApi";
import { Order } from "../types";

const USER_ID = 1;

export default function OrderHistoryPage() {
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useQuery<Order[], Error>({
    queryKey: ["orders", USER_ID],
    queryFn: () => fetchOrderHistory(USER_ID),
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>주문 내역을 불러오는 중 오류가 발생했습니다.</div>;

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">주문 내역</h2>
      {orders.map((order) => (
        <div key={order.id} className="mb-6 border-b pb-4">
          <p>주문번호: {order.id}</p>
          <p>주문일: {new Date(order.createdAt).toLocaleString()}</p>
          <ul>
            {order.items.map((item, idx) => (
              <li key={idx}>
                {item.product.name} - {item.quantity}개 (
                {item.price.toLocaleString()}원)
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
