import React, { useEffect, useState } from "react";
import "./Checkout.css";
import checkoutImage from "../../assets/checkoutAd.jpg";
import { useAuth } from "../../context/GlobalState";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import Subtotal from "../Subtotal/Subtotal";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const { user, basket } = useAuth();
  const navigate = useNavigate()
  // const [total, setTotal] = useState(0)
  // useEffect(() => {
  //   const newTotal = basket.reduce((accumulator, item) => accumulator + item.price, 0);
  //   setTotal(newTotal);
  // }, [basket]);
  // console.log(total);
  // const numberOfItems = basket.length
  return (
    <div className="checkout">
      <div className="checkout-left">
        <img className="checkout-ad" src={checkoutImage} alt="ad" />
        <div className="basket-warning">
          <h3>Hello, {user?.email}</h3>
          <h2 className="checkout-title">Your shopping Basket</h2>
          {basket.length > 0 ? (
            basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))
          ) : (
            <button onClick={() => navigate("/")}>
              You have no items in your basket.To buy one or more
              items,click"Add to basket".
            </button>
          )}
        </div>
      </div>
      <div className="checkout-right">
          <Subtotal/>
      </div>
    </div>
  );
};

export default Checkout;
