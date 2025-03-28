import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";

const CartPopup = ({ isOpen, closeCart }) => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState([]);


  const handleQuantityChange = (index, change) => {
    const updatedItems = orderDetails.map((item, i) =>
      i === index ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    setOrderDetails(updatedItems);
  }; 

  useEffect(() => {
    if (isOpen) {
      getOrderDetails();
    }
  }, [isOpen]);

  const handleRemoveItem = (index) => {
    const updatedItems = orderDetails.filter((_, i) => i !== index);
    setOrderDetails(updatedItems);
    // closeCart();
  };

  // Function to calculate total price
  // const calculateTotal = () => {
  //   return orderDetails
  //     .reduce(
  //       (total, item) =>
  //         total +
  //         parseFloat(item.salePrice?.$numberDecimal || 0) * item.productId.quantity,
  //       0
  //     )
  //     .toFixed(2);
  // };

  const calculateTotal = () => {
    return orderDetails
      .reduce(
        (total, item) =>
          total +
          parseFloat(item.productId.salePrice?.$numberDecimal || 0) * item.quantity,
        0
      )
      .toFixed(2);
  };
  
  const getOrderDetails = async () => {
    const userId = localStorage.getItem("user_Id");

    const res = await axios.get(
      `https://crystova.cloudbusiness.cloud/api/v1/order-details/get/${userId}`
    );

    setOrderDetails(res.data.data);
  };

  if (!isOpen) return null;

  return (
    <div className={`cart-popup ${isOpen ? "open" : ""}`}>
      <div className="cart-header d-flex justify-content-between align-items-center">
        <h5 className="fw-bold">Your Cart</h5>
        <RxCross2 onClick={closeCart} style={{ cursor: "pointer" }} />
      </div>

      <div className="cart-items-bg">
        {orderDetails?.length > 0 ? (
          orderDetails.map((item, index) => (
            <div
              key={index}
              className="cart-item d-flex flex-column align-items-center"
            >
              <img
                src={`https://crystova.cloudbusiness.cloud${item.productId.image?.[0]}`}
                alt={item.productId.productName}
                style={{borderRadius:'24px',width:'100%'}}
              />
              <div className="cart_item_detail">
                <h5 className="fw-bold mb-1">{item.productId.productName}</h5>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center w-100">
                    <p className="m-0">Ring Size :</p>
                    <select className="dropdown_size w-50 p-1">
                      {JSON.parse(item.productId?.productSize).map(
                        (size, i) => (
                          <option key={i}>{size}</option>
                        )
                      )}
                    </select>
                  </div>
                  <p className="fw-bold m-0">
                    ₹
                    {(
                      parseFloat(
                        item.productId.salePrice?.$numberDecimal || 0
                      ) * parseInt(item.quantity)
                    ).toFixed(2)}
                  </p>
                </div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="d-inline-flex align-items-center rounded p-2 gap-3">
                    <button
                      className="btn bg_prime rounded-circle fw-bold"
                      onClick={() => handleQuantityChange(index, -1)}
                    >
                      −
                    </button>
                    <span className="fw-bold">{item.quantity}</span>
                    <button
                      className="btn bg_prime rounded-circle fw-bold"
                      onClick={() => handleQuantityChange(index, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div
                    className="delete mt-2"
                    onClick={() => handleRemoveItem(index)}
                  >
                    <GoTrash size={25} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-3">Your cart is empty.</p>
        )}
      </div>

      {orderDetails.length > 0 && (
        <div className="cart-footer">
          <div className="d-flex align-items-center justify-content-between my-2">
            <h5 className="fw-bold">Total:</h5>
            <h5 className="fw-bold">₹{calculateTotal()}</h5>
          </div>
          <button className="btn btn_check_out w-100">Secure Checkout</button>
        </div>
      )}
    </div>
  );
};

export default CartPopup;
