import React from "react";
import Logo from "../components/Logo.tsx";
import FruitImage from "../assets/images/fruit.png";
import { Link } from "react-router";

const HomePage = () => {
  return (
    <div className="main main--home">
      <div className="content content--home">
        <Logo withText={true} size="large" />
        <h4>Fresh, organic fruit, delivered right to your doorstep!</h4>
        <p>Our limited stock of fresh fruit is in high demand, so get in quick!</p>
        <img className="homeImage" src={FruitImage} alt="fruit-basket" />
        <Link to="/shop" className="button button--centered">
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
