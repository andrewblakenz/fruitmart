import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import AppHeader from "../components/AppHeader.tsx";
//import MenuBar from "../components/MenuBar";
import ProductItem from "../components/ProductItem.tsx";
import { useSearchParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Product from "../types/Product";
import CartProduct from "../types/CartProduct";
import { RootState } from "../store/store";
import { addToCart } from "../store/cart/cartSlice.ts";
import { modifyStock } from "../store/catalogue/catalogueSlice.ts";

const ProductPage = () => {
  const [quantity, setQuantity] = useState<number>(1);
  const products = useSelector((state: RootState) => state.catalogueReducer.catalogue);

  const dispatch = useDispatch();

  let [searchParams] = useSearchParams();
  const [product, setProduct] = useState<Product>();

  const productID = searchParams.get("id");

  useEffect(() => {
    if (productID && products) {
      let newProduct = products.find((p) => p.id === productID) as Product;
      setProduct(newProduct);
      if (newProduct.currentStock < 1) {
        setQuantity(0);
      }
    }
  }, [productID, products]);

  const onAddToCart = (product: Product, quantity: number) => {
    let newCartProduct = {
      id: product.id,
      plural: product.plural,
      price: product.price,
      singular: product.singular,
      baseStock: product.baseStock,
    } as CartProduct;
    if (quantity < 1) {
      toast.error("Please select a quantity greater than zero to add to your cart");
      return;
    }
    if (product.currentStock >= 1) {
      dispatch(modifyStock({ mod: "decrease", quantity: quantity, productID: product.id }));
      dispatch(addToCart({ product: newCartProduct, quantity: quantity }));
      //alert("Added to cart");
      toast.success(`${product.singular} added to cart`);
    } else {
      toast.error(`Sorry, there are no more ${product.plural} in stock!`);
    }
  };

  const handleQuantityIncrease = () => {
    let currQuantity = quantity;
    if (currQuantity < product!.currentStock) {
      setQuantity(currQuantity + 1);
    } else {
      toast.error(`You have reached the maximum amount of ${product?.plural} for this order.`);
    }
  };

  const handleQuantityDecrease = () => {
    let currQuantity = quantity;
    if (currQuantity >= 1) {
      setQuantity(currQuantity - 1);
    } else {
      toast.error(`You cannot reduce the qauntity below zero!`);
    }
  };

  if (!product) {
    return;
  }

  return (
    <div className="main">
      <AppHeader hasReturn={true} />
      <div className="content content--has-header">{product && <ProductItem product={product} type={"full"} />}</div>
      <div className="product-footer">
        <div className="product__quantity-selector">
          <div
            className="product__quantity-selector__button product__quantity-selector__button--left"
            onClick={() => handleQuantityDecrease()}
          >
            <p>-</p>
          </div>
          <input className="product__quantity-selector__input" type="number" value={quantity} />
          <div
            className="product__quantity-selector__button product__quantity-selector__button--right"
            onClick={() => handleQuantityIncrease()}
          >
            <p>+</p>
          </div>
        </div>
        <div className="button" onClick={() => onAddToCart(product, quantity)}>
          Add to cart
        </div>
      </div>
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 3000,
        }}
      />
    </div>
  );
};

export default ProductPage;
