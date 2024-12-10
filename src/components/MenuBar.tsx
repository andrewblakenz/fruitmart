import React from "react";
import HomeSolidIcon from "./icons/HomeSolidIcon";
import ShopSolidIcon from "./icons/ShopSolidIcon";
import BasketSolidIcon from "./icons/BasketSolidIcon";
import { Link } from "react-router";

const MenuBar = ({ active = "shop" }: { active: string }) => {
  return (
    <div className="menubar">
      <Link to="/" className={`menubar__item ${active === "home" ? "menubar__item--active" : ""}`}>
        <HomeSolidIcon />
        <span>Home</span>
      </Link>
      <Link to="/shop" className={`menubar__item ${active === "shop" ? "menubar__item--active" : ""}`}>
        <ShopSolidIcon />
        <span>Shop</span>
      </Link>
      <Link to="/cart" className={`menubar__item ${active === "cart" ? "menubar__item--active" : ""}`}>
        <BasketSolidIcon />
        <span>Cart</span>
      </Link>
    </div>
  );
};

export default MenuBar;
