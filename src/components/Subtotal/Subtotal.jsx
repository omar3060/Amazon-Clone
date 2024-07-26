import React, { useEffect, useState } from "react";
import "./Subtotal.css";
import { useAuth } from "../../context/GlobalState";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Subtotal = () => {
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [disable, setDisable] = useState(true)
  const { basket } = useAuth();
  useEffect(() => {
    const newTotal = basket.reduce(
      (accumolator, item) => accumolator + item.price,
      0
    );
    setTotal(newTotal);
  }, [basket]);
  const numberOfItems = basket.length;
  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }
  
  useEffect(()=>{
    setDisable(numberOfItems === 0)
  },[basket])
  return (
    <>
      <div className="subtotal"></div>
      <div className="info">
        <p className="total">
          Subtotal ({numberOfItems} items): <strong>{currencyFormat(total)}</strong>
        </p>

        <small>
          <input type="checkbox" name="" id="check" />
          <label htmlFor="check">This order contains a gift</label>
        </small>
      </div>
      <button disabled = {disable} className="proceed" onClick={() => navigate("/payment")}>
        Proceed to Checkout
      </button>
    </>
  );
};

export default Subtotal;
