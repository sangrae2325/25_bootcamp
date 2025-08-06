import React, { useState } from "react";
import { Product } from "../types";

interface Props {
  onClose: () => void;
  onSubmit: (product: Omit<Product, "id">) => Promise<void>;
}

export default function ProductForm({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
    imageUrl: "",
    category: "",
  });

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <form
        className="bg-white p-6 rounded shadow-md max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl mb-4">상품 등록</h2>
        <input
          name="name"
          placeholder="상품명"
          value={form.name}
          onChange={onChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          name="price"
          type="number"
          placeholder="가격"
          value={form.price}
          onChange={onChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          name="stock"
          type="number"
          placeholder="재고"
          value={form.stock}
          onChange={onChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <textarea
          name="description"
          placeholder="설명"
          value={form.description}
          onChange={onChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          name="imageUrl"
          placeholder="이미지 URL"
          value={form.imageUrl}
          onChange={onChange}
          required
          className="border p-2 mb-2 w-full"
        />
        <input
          name="category"
          placeholder="카테고리"
          value={form.category}
          onChange={onChange}
          className="border p-2 mb-4 w-full"
        />
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="border px-4 py-2 rounded"
          >
            닫기
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
}
