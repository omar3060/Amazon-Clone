import React, { useEffect, useState } from "react";
import "./Payment.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/GlobalState";
import CheckoutProduct from "../CheckoutProduct/CheckoutProduct";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Payment = () => {
  const { user, basket, dispatch } = useAuth();
  const [total, setTotal] = useState(0);
  const [clientSecret, setClientSecret] = useState()
  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState("")
  const stripe = useStripe()
  const elements = useElements()
  const navigate = useNavigate()
  
  useEffect(() => {
    const newTotal = basket.reduce(
      (accumolator, item) => accumolator + item.price,
      0
    );
    setTotal(newTotal);
  }, [basket]);
  function currencyFormat(num) {
    return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  useEffect(()=>{
    const getClientSecret = async ()=> {
      const response = await axios({
        method: "post",
        // url: `/payment/create?total=${total}`
        url: `http://127.0.0.1:5001/clone-28a54/us-central1/api/payments/create?total=${total * 100}`, // Multiply total by 100 to convert to cents
      })
      setClientSecret(response.data.clientSecret)
      return response;
    }
    if (total > 0) {
      getClientSecret();
    }
  }, [basket, total])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    }).then(({paymentIntent})=> { // Destructuring for the prop
      const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id)
      setDoc(ref, {
        basket: basket,
        amount: paymentIntent.amount,
        created: paymentIntent.created
      })
      setSucceeded(true)
      setError(null)
      setProcessing(false)
      navigate("/orders", {replace: true})
      dispatch({
        type: "EMPTY_BASKET"
      })

    })
  }
  
  const handleChange = (e) => {
    setDisabled(e.empty)
    setError(error ? error.message : "")
  }
  return (
    <div className="payment">
      <div className="payment-container">
        <h1>
          Checkout (<Link to="/checkout">{basket.length} items</Link>)
        </h1>
        {/* Delivery Address */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-address">
            <p>{user?.email}</p>
            <p>Alexandia, Egypt</p>
          </div>
        </div>
        {/* Review Items */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {basket.map((item) => (
              <CheckoutProduct
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Payment Method */}
        <div className="payment-section">
          <h3>Payment Method</h3>
          <div className="payment-details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange}/>
              {/* Stripe Card */}
              <div className="payment-priceContainer">
                <h3>Order Total: {currencyFormat(total)}</h3>
                <button type="submit" disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : <p>"Buy Now"</p>}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
