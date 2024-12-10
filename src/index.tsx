import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { Provider } from "react-redux";
import { HomePage, ShopPage, CartPage, ProductPage } from "./routes/routeHandler.ts";
import store from "./store/store.ts";
import "./style.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="product" element={<ProductPage />} />
          <Route path="cart" element={<CartPage />} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
