import React from "react";
import Logo from "../../assets/header-logo.png";
import searchIcon from "../../assets/icons/searchIcon.png";
import shoppingCart from "../../assets/icons/shopping-cart.png";
import { Link } from "react-router-dom";
import './Header.css'
import { useAuth } from "../../context/GlobalState";
import { auth } from "../../firebase";

const Header = () => {
  const {user, basket} = useAuth()
  const handleAuthentication = () => {
    auth.signOut()
  }
  console.log(user?.email);
  return (
    <div className="header">
      <Link to={"/"}>
        <img className="header-logo" src={Logo} alt="Amazon-logo" />
      </Link>
      <div className="header-search">
        <input type="text" className="header-search-input" />
        <img className="header-searchIcon" src={searchIcon} alt="search-icon" />
      </div>
      <div className="header-nav">
        <Link to={!user && "/login"}>
          <div className="header-option" onClick={handleAuthentication}>
            <span className="header-optionLineOne">Hello {user ? `${user.email}`: "Guest"}</span>
            <span className="header-optionLineTwo" >{user ? `Sign Out`: "Sign In"}</span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header-option">
            <span className="header-optionLineOne">Returns</span>
            <span className="header-optionLineTwo">& Orders</span>
          </div>
        </Link>
        <div className="header-option">
          <span className="header-optionLineOne">Your</span>
          <span className="header-optionLineTwo">Prime</span>
        </div>
        <Link to="/checkout">
          <div className="header-optionBasket">
            <img src={shoppingCart} alt="" />
            <span className="header-optionLineTwo header-basketCount">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
