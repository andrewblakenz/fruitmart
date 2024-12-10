import { createSlice } from "@reduxjs/toolkit";
import Product from "../../types/Product";

export interface CatalogueState {
  catalogue: Product[];
}

const catalogueSlice = createSlice({
  name: "catalogue",
  initialState: { catalogue: [] } as CatalogueState,
  reducers: {
    populateCatalogue: (state, action) => {
      state.catalogue = action.payload;
    },
    modifyStock: (state, action) => {
      const product = state.catalogue.find((product) => product.id === action.payload.productID);
      if (product) {
        let quantity = action.payload.quantity || 0;
        if (action.payload.mod === "increase") {
          if (product.currentStock !== undefined) {
            if (product.currentStock < product.baseStock && product.currentStock + quantity <= product.baseStock) {
              product.currentStock = product.currentStock + quantity;
            }
          }
        } else if (action.payload.mod === "decrease") {
          if (product.currentStock !== undefined) {
            if (product.currentStock >= 1) {
              product.currentStock = product.currentStock - action.payload.quantity;
              if (product.currentStock < 0) {
                product.currentStock = 0;
              }
            }
          }
        }
      }
    },
  },
});

export const { populateCatalogue, modifyStock } = catalogueSlice.actions;

export const catalogueReducer = catalogueSlice.reducer;
