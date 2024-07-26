import React, { useEffect, useState } from "react";
import "./Order.css";
import moment from "moment";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
// import CurrencyFormat from 'react-currency-format';



const Order = ({ order }) => {
  const amount = order.data.amount / 100
  function currencyFormat(amount) {
    return "$" + amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  return (
    <div className="order">
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format("MMMM D YYYY h:mma")}</p>
      <p className="order-id">
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map((item) => (
        <CheckoutProduct
          key={item.id}
          id={item.id}
          title={item.title}
          image={item.image}
          price={item.price}
          rating={item.rating}
          hiddenButton
        />
      ))}
      <h3 className="order-total">Order Total: {currencyFormat(amount)}</h3>
      {/* <CurrencyFormat
        renderText={(value) => (
          <>
            <h3 className="order-total">Order Total: {value}</h3>
          </>
        )}
        decimalScale={2}
        value={order.data.amount * 100}
        displayType={"text"}
        thousandSeparator={true}
        prefix={"$"}
      /> */}
    </div>
  );
};

export default Order;
