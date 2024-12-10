import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { populateCatalogue } from "../store/catalogue/catalogueSlice.ts";

import AppHeader from "../components/AppHeader.tsx";
import MenuBar from "../components/MenuBar.tsx";
import ProductItem from "../components/ProductItem.tsx";
import Product from "../types/Product.ts";
import data from "../data.json";

const ShopPage = () => {
  const [filterActive, setFilterActive] = useState<boolean>(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>();
  const products = useSelector((state: RootState) => state.catalogueReducer.catalogue);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products.length) {
      dispatch(populateCatalogue(data.products));
    }
    // eslint-disable-next-line
  }, [data]);

  useEffect(() => {
    if (products) {
      if (filterActive) {
        setFilteredProducts(products.filter((p) => p.currentStock >= 1));
      } else {
        setFilteredProducts(products);
      }
    }
  }, [products, filterActive]);

  return (
    <div className="main">
      <AppHeader hasReturn={false} />
      <div className="content content--has-header content--has-footer">
        <h5 className="shop-heading">
          Fresh, organic fruit,
          <br /> delivered right to your doorstep!
        </h5>

        <div className="filterbar">
          <div
            className={`filterbar__item ${!filterActive ? "filterbar__item--active" : ""}`}
            onClick={() => setFilterActive(false)}
          >
            <p>All Fruit</p>
          </div>
          <div
            className={`filterbar__item ${filterActive ? "filterbar__item--active" : ""}`}
            onClick={() => setFilterActive(true)}
          >
            <p>In Stock</p>
          </div>
        </div>
        {filteredProducts && filteredProducts.length >= 1 ? (
          <div className="product-archive">
            {filteredProducts.map((product) => {
              return <ProductItem product={product} type={"preview"} />;
            })}
          </div>
        ) : (
          <h4 className="nothing-here-text">
            Uh oh, looks like our fruit reserves have run dry! <br />
            <br /> Please check back later to see our new stock!
          </h4>
        )}
      </div>
      <MenuBar active="shop" />
    </div>
  );
};

export default ShopPage;
