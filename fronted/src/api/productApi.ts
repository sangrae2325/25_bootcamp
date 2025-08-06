import axios from "axios";
import { Product } from "../types";

const API_BASE = "http://localhost:8080/products";

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await axios.get(API_BASE);
  return res.data;
};

export const fetchProductById = async (id: number): Promise<Product> => {
  const res = await axios.get(`${API_BASE}/${id}`);
  return res.data;
};

// createProduct 인자 타입을 Omit<Product, "id">로 맞춤
export const createProduct = async (
  product: Omit<Product, "id">
): Promise<Product> => {
  const res = await axios.post(API_BASE, product);
  return res.data;
};

// 기존 import, API_BASE, fetchProducts 등은 그대로 유지

// 검색
export const searchProducts = async (keyword: string): Promise<Product[]> => {
  const res = await axios.get(`${API_BASE}/search`, { params: { keyword } });
  return res.data;
};

// 정렬
export const fetchProductsSorted = async (
  sortBy: string
): Promise<Product[]> => {
  const res = await axios.get(`${API_BASE}/sort`, { params: { sortBy } });
  return res.data;
};
