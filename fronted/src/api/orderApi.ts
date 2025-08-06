import axios from "axios";
import { OrderRequest, Order } from "../types";

const API_BASE = "http://localhost:8080/orders";

export const createOrder = async (
  orderRequest: OrderRequest
): Promise<Order> => {
  const res = await axios.post(API_BASE, orderRequest);
  return res.data;
};

export const fetchOrderHistory = async (userId: number): Promise<Order[]> => {
  const res = await axios.get(`${API_BASE}/user/${userId}`);
  return res.data;
};
