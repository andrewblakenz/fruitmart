import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import ProductItem from "../components/ProductItem.tsx";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { increaseQuantity, decreaseQuantity } from "../store/cart/cartSlice.ts";
import { modifyStock } from "../store/catalogue/catalogueSlice.ts";
import Product from "../types/Product.ts";

interface CartTotals {
  quantity: number;
  totalPrice: number;
}

const CartPage = () => {
  const [cartTotals, setCartTotals] = useState<CartTotals>({ quantity: 0, totalPrice: 0 });

  const products = useSelector((state: RootState) => state.catalogueReducer.catalogue);
  const cartItems = useSelector((state: RootState) => state.cartReducer.cart);
  const dispatch = useDispatch();

  const handleIncrease = (pID: string) => {
    let currProduct = products.find((p) => p.id === pID) as Product;
    if (currProduct.currentStock >= 1) {
      dispatch(modifyStock({ mod: "decrease", quantity: 1, productID: pID }));
      dispatch(increaseQuantity({ id: pID }));
    } else {
      toast.error(`Sorry, your cart already contains all our available ${currProduct.plural}!`);
    }
  };
  const handleDecrease = (pID: string) => {
    let currProduct = products.find((p) => p.id === pID) as Product;
    if (currProduct.currentStock < currProduct.baseStock) {
      dispatch(modifyStock({ mod: "increase", quantity: 1, productID: pID }));
      dispatch(decreaseQuantity({ id: pID }));
    } else {
      toast.error(`There are no more ${currProduct.plural} in your cart to remove!`);
    }
  };

  useEffect(() => {
    let quantityArray = [] as number[];
    let priceArray = [] as number[];

    cartItems.forEach((item) => {
      quantityArray.push(item.inCart || 0);
      priceArray.push(item.inCart || 0 * +item.price);
    });

    const totalQuantity = quantityArray.reduce((prevSum, x) => prevSum + x, 0);
    const totalPrice = priceArray.reduce((prevSum, x) => prevSum + x, 0);

    setCartTotals({ quantity: totalQuantity, totalPrice: totalPrice });
  }, [cartItems]);

  return (
    <div className="main">
      <div className="content content--has-header">
        <div className="cart-heading">
          <h4 className="cart-heading__text">Cart</h4>
          <Link className="cart-heading__close-icon" to={"/shop"}>
            X
          </Link>
        </div>

        {cartItems && cartItems.length >= 1 ? (
          <>
            <p className="cart-totals-heading">Total</p>
            <div className="cart-list">
              {cartItems.map((product) => {
                return (
                  <div className="cart-item">
                    <ProductItem product={product} type={"cart"} />
                    <div className="product__quantity-selector">
                      <div
                        className="product__quantity-selector__button product__quantity-selector__button--left cart__quantity-selector__button"
                        onClick={() => handleDecrease(product.id)}
                      >
                        <p>-</p>
                      </div>
                      <input
                        className="product__quantity-selector__input cart__quantity-selector__input"
                        type="number"
                        value={product.inCart}
                      />
                      <div
                        className="product__quantity-selector__button product__quantity-selector__button--right cart__quantity-selector__button"
                        onClick={() => handleIncrease(product.id)}
                      >
                        <p>+</p>
                      </div>
                    </div>
                    <p className="cart-item__total">${(product.inCart! * +product.price).toFixed(2)}</p>
                  </div>
                );
              })}
            </div>
            <p className="cart-footer-total">
              Total for {cartTotals.quantity} {cartTotals.quantity === 1 ? "item" : "items"}:{" "}
              <span>${cartTotals.totalPrice.toFixed(2)}</span>
            </p>
            <div className="button" onClick={() => toast.success("Congratulations on your theoretical purchase!")}>
              Check Out
            </div>
          </>
        ) : (
          <h4 className="nothing-here-text">
            Uh oh, looks like you have forgotten to fill your basket! <br />
            <br /> Please follow the link below to continue shopping!
          </h4>
        )}
        <Link className="button button--secondary" to={"/shop"}>
          Continue Shopping
        </Link>
        <p className="cart-disclaimer">
          Please note, as our stock is in high demand, you have 5 minutes from adding an item to the cart to make
          purchase, or your cart will be emptied. Thank you for understanding.
        </p>
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

export default CartPage;
