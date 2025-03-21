import React, { useState } from "react";
import "./index.css";
import { RxCross2 } from "react-icons/rx";
import { RiDeleteBinLine } from "react-icons/ri";
import { GoTrash } from "react-icons/go";

const CartPopup = ({ isOpen, closeCart }) => {
  const [count, setCount] = useState(1);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div className={`cart-popup ${isOpen ? "open" : ""}`}>
      <div className="cart-header d-flex justify-content-between align-items-center">
        <h5 className="fw-bold head_cart">Your Cart</h5>
        <RxCross2 onClick={closeCart} style={{cursor:'pointer'}}/>
        {/* <button className="btn-close-cart" onClick={closeCart}></button> */}
      </div>

      {/* Cart Items */}
      <div className="cart-items-bg">
        <div className="cart-items">
          <div className="cart-item d-flex flex-column align-items-center">
            <img src={require("../../Images/image 98.png")} />
            <div className="cart_item_detail">
              <h5 className="fw-bold mb-1 main_cdsss">
                Two Stone Diamond Ring
              </h5>
              <div className="d-flex align-item-center justify-content-between main_cdsss">
                <div className="d-flex align-items-center">
                  <p className=" m-0">Ring Size :</p>
                  <select className="dropdown_size">
                    <option>3.21</option>
                    <option>3.22</option>
                    <option>3.24</option>
                    <option>3.26</option>
                    <option>4.50</option>
                  </select>
                </div>
                <div>
                  <p className="fw-bold m-0">₹30,000</p>
                </div>
              </div>
              <div className="d-flex align-item-center justify-content-between mt-3">
                <div className="d-inline-flex align-items-center rounded p-2 gap-3">
                  <button
                    className="btn bg_prime rounded-circle fw-bold"
                    onClick={decrement}
                  >
                    −
                  </button>
                  <span className="fw-bold">{count}</span>
                  <button
                    className="btn bg_prime rounded-circle fw-bold"
                    onClick={increment}
                  >
                    +
                  </button>
                </div>
                <div className="delete mt-2"><GoTrash size={25}/></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Total and Checkout */}
      <div className="cart-footer main_cdsss">
        <div className="d-flex align-item-center justify-content-between my-2">
          <div>
            <h5 className="fw-bold">Total:</h5>
          </div>
          <div>
            <h5 className="fw-bold"> ₹30,000</h5>
          </div>
        </div>
        <button className="btn btn_check_out w-100 main_cdsss">
          Secure Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPopup;
