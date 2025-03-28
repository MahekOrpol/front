import React from "react";
import { RxCross2 } from "react-icons/rx";
import { GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";

const CartPopup = ({ isOpen, items = [], closeCart, updateCart }) => {
  const navigate = useNavigate();

  const handleQuantityChange = (index, change) => {
    const updatedItems = items.map((item, i) =>
      i === index
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    updateCart(updatedItems); // Update parent state
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    updateCart(updatedItems);
    // closeCart();
  };

  // Function to calculate total price
  const calculateTotal = () => {
    return items
      .reduce(
        (total, item) =>
          total +
          parseFloat(item.salePrice?.$numberDecimal || 0) * item.quantity,
        0
      )
      .toFixed(2);
  };

  if (!isOpen) return null;
  

  // const checkOut = async () => {
  //   try {
  //     const response = await axios(
  //       "https://crystova.cloudbusiness.cloud/api/v1/order-details/create",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ items }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to checkout the cart");
  //     }

  //     // Clear the cart
  //     updateCart([]);

  //     // Redirect to checkout page
  //     navigate("/checkout");
  //     closeCart();
  //   } catch (error) {}
  // };

  const checkOut = async () => {
    try {
   
      const userId = localStorage.getItem("userId");
console.log("User ID:", userId);

  
// const userId = localStorage.getItem("userId");

// if (!userId) {
//   console.error("User is not logged in. Redirecting to login...");
//   navigate("/login"); // Redirect user to login page
//   return;
// }

const formattedItems = items.map((item) => ({
  productId: item.productId || item.id, // Ensure correct mapping
  productPrice: parseFloat(item.salePrice?.$numberDecimal || item.salePrice || 0),
  quantity: item.quantity,
  productSize: item.selectedSize || 9,
  discount: parseFloat(item.discount?.$numberDecimal || item.discount || 0),
}));
console.log("Cart Items before formatting:", items);

const response = await axios.post(
  "https://crystova.cloudbusiness.cloud/api/v1/order-details/create",
  {
    userId,
    products: formattedItems,
  },
  {
    headers: {
      "Content-Type": "application/json",
    },
  }
);

      if (response.status === 200) {
        updateCart([]);
        navigate("/checkout");
        closeCart();
      } else {
        console.error("Checkout failed:", response);
      }
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };
  
  return (
    <div className={`cart-popup ${isOpen ? "open" : ""}`}>
      <div className="cart-header d-flex justify-content-between align-items-center">
        <h5 className="fw-bold">Your Cart</h5>
        <RxCross2 onClick={closeCart} style={{ cursor: "pointer" }} />
      </div>

      <div className="cart-items-bg">
        {items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className="cart-item d-flex flex-column align-items-center">
              <img src={`https://crystova.cloudbusiness.cloud${item.image[0]}`} alt={item.name} />
              <div className="cart_item_detail">
                <h5 className="fw-bold mb-1">{item.productName}</h5>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center w-100">
                    <p className="m-0">Ring Size :</p>
                    <select className="dropdown_size w-50 p-1">
                      {Array.isArray(item.productSize) &&
                        item.productSize.map((size, i) => (
                          <option key={i}>
                            {size.toString().replace(/[\[\]]/g, "")}
                          </option>
                        ))}
                    </select>
                  </div>
                  <p className="fw-bold m-0">
                    ₹
                    {(
                      parseFloat(item.salePrice?.$numberDecimal || 0) *
                      item.quantity
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

      {items.length > 0 && (
        <div className="cart-footer">
          <div className="d-flex align-items-center justify-content-between my-2">
            <h5 className="fw-bold">Total:</h5>
            <h5 className="fw-bold">₹{calculateTotal()}</h5>
          </div>
          <button
            className="btn btn_check_out w-100"
            onClick={() => checkOut()}
          >
            Secure Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPopup;
