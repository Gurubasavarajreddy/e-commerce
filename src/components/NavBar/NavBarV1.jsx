import React from 'react';
import './NavBar.style.css';
import Logo from '../../static/images/logo.png';
import Cart from '../../static/images/cart.svg';
function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar_list">
        <div className="l_box">
          <div className="logo">
            <img src={Logo} className="logo_img" />
          </div>
          <div className="links">
            <span>Home</span> <span>Products</span>
          </div>
        </div>
        <div className="r_box">
          <div className="authlist">
            <span>SignIn</span>
            <span>Register</span>
          </div>
          <div className="cart">
            <div className="cartlogo">
              <img src={Cart} className="cart_img" />
            </div>
            <div className="cart_items">0 items</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
