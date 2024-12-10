import React, { useState, useEffect } from "react";
import Logo from "./Logo.tsx";
import ReturnIcon from "./icons/ReturnIcon";
import BasketOutlineIcon from "./icons/BasketOutlineIcon";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const AppHeader = ({ hasReturn = false }: { hasReturn: boolean }) => {
  const [cartTotal, setCartTotal] = useState<number>(0);

  const cartItems = useSelector((state: RootState) => state.cartReducer.cart);
  useEffect(() => {
    let quantityArray = [] as number[];

    cartItems.forEach((item) => {
      quantityArray.push(item.inCart || 0);
    });

    const totalQuantity = quantityArray.reduce((prevSum, x) => prevSum + x, 0);

    setCartTotal(totalQuantity);
  }, [cartItems]);

  return (
    <div className="app-header">
      {hasReturn && (
        <Link to={"/shop"}>
          <ReturnIcon />
        </Link>
      )}
      <Logo withText={true} size="small" />

      <Link className="appbar__basket" to={"/cart"}>
        {cartTotal >= 1 && <p className="appbar__basket__quantity">{cartTotal}</p>}
        <BasketOutlineIcon />
      </Link>
    </div>
  );
};

export default AppHeader;
