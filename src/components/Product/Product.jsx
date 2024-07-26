import React from "react";
import "./Product.css";
import { useAuth } from "../../context/GlobalState";
import star from "../../assets/icons/star.png";

const Product = ({ title, price, image, rating, id }) => {
  const { dispatch } = useAuth();
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: id,
        title: title,
        image: image,
        price: price,
        rating: rating,
      },
    });
  };
  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
      </div>
      <div className="product-rating">
        {Array(rating)
          .fill()
          .map((_, index) => ( // _ means fill all
            <p key={index}>
              <img key={index} src={star} alt="star" />
            </p>
          ))}
      </div>
      <img src={image} alt="product-image" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
};

export default Product;
