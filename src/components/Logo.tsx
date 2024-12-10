import React from "react";
import LogoIcon from "../assets/images/logo.png";

const Logo = ({ withText = true, size = "small" }: { withText: boolean; size: string }) => {
  return (
    <div className={`logo logo-${size}`}>
      <img src={LogoIcon} alt="logo" />
      {withText && (
        <h1 className="logoText">
          <span>Fruit</span>Mart
        </h1>
      )}
    </div>
  );
};

export default Logo;
