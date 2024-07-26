import { React, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { auth } from "./firebase";
import { useAuth } from "./context/GlobalState";
import Checkout from "./components/Checkout/Checkout";
import Payment from "./components/Payment/Payment";
import Orders from "./components/Orders/Orders";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const App = () => {
  const { dispatch } = useAuth();
  const stripePromise = loadStripe(
    "pk_test_51PV2hORvIawy2RohxaSof8QWSNBTQG8I6VIN0O3ZnbBPKZAs3pt2vaDkPIAA9l31X3N07nEXCyjO3C9kwgXYItsQ00ptUay6js"
  );
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          // action consider as object
          type: "SET_USER",
          user: authUser,
        });
      } else {
        dispatch({
          // action consider as object
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    <div className="app">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route path="*" element={<h1>Page Not Found</h1>} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/checkout"
          element={
            <>
              <Header />
              <Checkout />
            </>
          }
        />
        <Route
          path="/orders"
          element={
            <>
              <Header /> <Orders />
            </>
          }
        />
        <Route
          path="/payment"
          element={
            <>
              <Header />
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
