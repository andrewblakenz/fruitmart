import React, { useEffect, useState } from "react";
import ImagePlaceholder from "../assets/images/image-placeholder.png";
import { Link } from "react-router";
import Product from "../types/Product";
import CartProduct from "../types/CartProduct";

const ProductLinkWrapper = ({
  pID,
  type,
  children,
}: {
  pID: string;
  type: "full" | "cart" | "preview";
  children: React.JSX.Element;
}) => {
  if (type !== "full") {
    if (type === "cart") {
      return <div className={`product-item ${type === "cart" ? "product-item-cart" : ""}`}>{children}</div>;
    } else {
      return (
        <Link to={`/product?id=${pID}`} className="product-item">
          {children}
        </Link>
      );
    }
  } else {
    return <div className="product-item">{children}</div>;
  }
};

const ProductItem = ({
  product,
  type = "full",
}: {
  product: Product | CartProduct;
  type: "full" | "cart" | "preview";
}) => {
  const [loadingImage, setLoadingImage] = useState<boolean>(true);
  const [imageError, setImageError] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if ((product as Product).image) {
      const fetchImage = async () => {
        try {
          const response = await import(`../assets/images/${(product as Product).image}`);
          setImage(response.default);
        } catch (err) {
          setImageError(err);
        } finally {
          setLoadingImage(false);
        }
      };

      fetchImage();
    }
  }, [product]);

  if (!product) {
    return;
  }

  return (
    <ProductLinkWrapper pID={product.id} type={type}>
      <>
        <div className={`product-item__image-card product-item__image-card--${type}`}>
          {loadingImage || imageError ? (
            <img className="product-item__image-card__image" src={ImagePlaceholder} alt="product-image" />
          ) : (
            <img className="product-item__image-card__image" src={image!} alt="product-image" />
          )}
          {type !== "cart" && (
            <p className={`product-item__image-card__stock-level product-item__image-card__stock-level--${type}`}>
              {(product as Product).currentStock} Left in stock
            </p>
          )}
        </div>
        <h4 className={`product-item__meta product-item__meta--${type}`}>
          {product.plural}
          <span>
            ${product.price.toFixed(2)}
            {type === "cart" && "ea"}
          </span>
        </h4>
        {type === "full" && (
          <>
            <p className="product-item__meta-disclaimer">*price is per {product.singular}</p>
            <p className="product-item__description">{(product as Product).description}</p>
          </>
        )}
      </>
    </ProductLinkWrapper>
  );
};

export default ProductItem;
