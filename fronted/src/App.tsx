import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductListPage from "./pages/ProductListPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/orders" element={<OrderHistoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
