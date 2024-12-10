import { configureStore } from "@reduxjs/toolkit";
import { CartState, cartReducer } from "./cart/cartSlice.ts";
import { CatalogueState, catalogueReducer } from "./catalogue/catalogueSlice.ts";

type StoredState = {
  cartReducer: CartState;
  catalogueReducer: CatalogueState;
};

const clearStateMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === "cart/addToCart") {
    setTimeout(() => {
      const state = (store.getState() as RootState).cartReducer;
      let cartItems = state.cart;
      cartItems.forEach((item) => {
        let inCart = item.inCart;
        store.dispatch({
          type: "catalogue/modifyStock",
          payload: { mod: "increase", quantity: inCart, productID: item.id },
        });
      });
      store.dispatch({ type: "cart/clearCart" });
    }, 5 * 60 * 1000);
  }

  return result;
};

const saveCartToLocalStorage = (key, state) => {
  const data = {
    value: state,
    expiry: Date.now() + 5 * 60 * 1000,
  };
  localStorage.setItem(key, JSON.stringify(data));
};

const loadCartFromLocalStorage = (key): StoredState | undefined => {
  const data = localStorage.getItem(key);
  if (!data) return undefined;

  const parsedData = JSON.parse(data);
  if (Date.now() > parsedData.expiry) {
    localStorage.removeItem(key);
    return undefined;
  }
  return parsedData.value;
};

const preloadedState = loadCartFromLocalStorage("fruitMartCart");

const store = configureStore({
  reducer: { cartReducer, catalogueReducer },
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(clearStateMiddleware),
});

store.subscribe(() => {
  saveCartToLocalStorage("fruitMartCart", store.getState());
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
