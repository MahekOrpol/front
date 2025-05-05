import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { updateCartCount, decrementCartCount } from "../../redux/cartSlice";

const CartPopup = ({
  isOpen,
  closeCart,
  showToast,
  toastMessage,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderDetails, setOrderDetails] = useState([]);

  const calculateTotal = () => {
    return orderDetails
      .reduce(
        (total, item) =>
          total + parseFloat(item.salePrice || 0) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const calculateDiscountTotal = () => {
    return orderDetails
      .reduce(
        (total, item) =>
          total +
          parseFloat(item.discount?.$numberDecimal || 0) * item.quantity,
        0
      )
      .toFixed(2);
  };

  const handleQuantityChange = async (index, change) => {
    const updatedItems = orderDetails.map((item, i) =>
      i === index
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );

    const updatedItem = updatedItems[index];
    setOrderDetails(updatedItems);

    const userId = localStorage.getItem("user_Id");
    const productId = updatedItem.productId?.id;

    console.log("Calling update API with:");
    console.log("User ID:", userId);
    console.log("Product ID:", productId);
    console.log("Quantity:", updatedItem.quantity);

    if (userId && productId) {
      try {
        await axios.put(
          `https://dev.crystovajewels.com/api/v1/order-details/update/${userId}/${productId}`,
          {
            selectedqty: JSON.stringify(updatedItem.quantity),
          }
        );
        console.log("Quantity updated");
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const handleRemoveItem = async (orderId, index) => {
    try {
      const res = await axios.delete(
        `https://dev.crystovajewels.com/api/v1/order-details/delete/${orderId}`
      );

      if (res.status === 200) {
        const updatedItems = orderDetails.filter((_, i) => i !== index);
        setOrderDetails(updatedItems);
        dispatch(updateCartCount(updatedItems.length));
        toast.success("Removed from Cart!");
      }
    } catch (err) {
      console.error("Error deleting order item:", err);
      toast.error("Failed to remove item from cart");
    }
  };

  const getOrderDetails = async () => {
    const userId = localStorage.getItem("user_Id");
    try {
      const res = await axios.get(
        `https://dev.crystovajewels.com/api/v1/order-details/get/${userId}`
      );
      if (res.status === 200) {
        const items = res.data.data.map((item) => {
          const hasVariations = item.productId?.hasVariations;
          let selectedSize = "";
          let salePrice = parseFloat(
            item.productId?.salePrice?.$numberDecimal || 0
          );

          if (
            hasVariations &&
            Array.isArray(item.variation) &&
            item.variation.length > 0
          ) {
            selectedSize = item.variation[0]?.productSize || "";
            salePrice = parseFloat(item.variation[0]?.salePrice || 0);
          } else if (!hasVariations) {
            selectedSize = Array.isArray(item.productId?.productSize)
              ? item.productId?.productSize[0].split(",")[0] || ""
              : "";
          }

          return {
            ...item,
            quantity: 1,
            selectedSize,
            salePrice,
          };
        });
        setOrderDetails(items);
        dispatch(updateCartCount(items.length));
      }
    } catch (err) {
      console.error("Error fetching order details:", err);
      // toast.error("Failed to fetch cart items");
    }
  };

  const handleSizeChange = (index, size) => {
    const updatedItems = orderDetails.map((item, i) => {
      if (i === index) {
        let newSalePrice = parseFloat(
          item.productId?.salePrice?.$numberDecimal || 0
        );

        if (item.productId?.hasVariations && Array.isArray(item.variation)) {
          const matchedVariation = item.variation.find(
            (variation) => variation.productSize === size
          );
          if (matchedVariation) {
            newSalePrice = parseFloat(matchedVariation.salePrice || 0);
          }
        }

        return { ...item, selectedSize: size, salePrice: newSalePrice };
      }
      return item;
    });

    setOrderDetails(updatedItems);
  };

  useEffect(() => {
    if (showToast && toastMessage) {
      toast.success(toastMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [showToast, toastMessage]);

  useEffect(() => {
    if (isOpen) {
      getOrderDetails();
    }
  }, [isOpen]);

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
              {(() => {
                const imageToShow = item.productId?.image.find(
                  (img) => !img.endsWith(".mp4")
                );
                return imageToShow ? (
                  <img
                    src={`https://dev.crystovajewels.com${imageToShow}`}
                    alt={item.productId?.productName}
                    style={{
                      borderRadius: "24px",
                      width: "100%",
                      height: "100%",
                      maxHeight: "300px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div className="text-center text-muted py-4">
                    No image available
                  </div>
                );
              })()}
              <div className="cart_item_detail pt-3">
                {(!Array.isArray(item.productId?.productSize) ||
                  item.productId.productSize.length === 0 ||
                  item.productId.productSize[0] === "[]" ||
                  item.productId.productSize[0].split(",").filter(size => size.trim() !== "").length === 0) ? (
                  <div className="d-flex align-items-center justify-content-between secure_chckotfre">
                    <h5 className="fw-bold mb-1 cart_headre_ssss text-truncate">
                      {item.productId?.productName}
                    </h5>
                    <p className="fw-bold m-0">
                      ₹{(parseFloat(item.salePrice) * parseInt(item.quantity)).toFixed(2)}
                    </p>
                  </div>
                ) : (
                  <>
                    <h5 className="fw-bold mb-1 d-flex align-items-center justify-content-between secure_chckotfre cart_headre_ssss">
                      {item.productId?.productName}
                    </h5>
                    <div className="d-flex align-items-center justify-content-between secure_chckotfre1">
                      <div className="d-flex align-items-center w-100 secure_chckotfre cart_headre_ssss1 w-100" style={{ whiteSpace: 'nowrap' }}>
                        <p className="m-0">Ring Size :</p>
                        <select
                          className="dropdown_size p-1"
                          style={{ borderRadius: "5px" }}
                          value={
                            orderDetails[index]?.selectedSize ||
                            item.selectedSize ||
                            ""
                          }
                          onChange={(e) =>
                            handleSizeChange(index, e.target.value)
                          }
                          required
                        >
                          <option value="" disabled>
                            Select Size
                          </option>
                          {item.productId.productSize[0]
                            .split(",")
                            .map((size, i) => (
                              <option key={i} value={size}>
                                {size}
                              </option>
                            ))}
                        </select>
                      </div>
                      <p className="fw-bold m-0 secure_chckotfre d-flex justify-content-end w-100 align-items-sm-center">
                        ₹
                        {(
                          parseFloat(item.salePrice) * parseInt(item.quantity)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </>
                )}

                <div className="d-flex align-items-center justify-content-between mt-3 size_selectttt">
                  <div className="d-inline-flex align-items-center p-2 gap-3 wr_sss_dd_sssss ">
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
                    onClick={() => handleRemoveItem(item.id, index)}
                    style={{ cursor: "pointer" }}
                  >
                    <GoTrash size={25} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-3 your_cart_txt">Your cart is empty.</p>
        )}
      </div>

      {orderDetails.length > 0 && (
        <div className="cart-footer">
          <div className="d-flex align-items-center justify-content-between my-2">
            <h5 className="fw-bold">Total:</h5>
            <h5 className="fw-bold sdcxdscde">₹{calculateTotal()}</h5>
          </div>
          <button
            className="btn btn_check_out w-100 secure_chckotfre"
            onClick={() => {
              const invalidItem = orderDetails.find(
                (item) => !item.selectedSize || item.selectedSize === ""
              );

              if (invalidItem) {
                toast.error(
                  "Please select size for all items before checkout",
                  {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  }
                );
                return;
              }

              navigate("/checkout", {
                state: {
                  total: calculateTotal(),
                  discountTotal: calculateDiscountTotal(),
                  orderDetails: orderDetails.map((item) => ({
                    ...item,
                    selectedSize: item.productId?.hasVariations
                      ? item.selectedSize
                      : item.selectedSize,
                    selectedqty: item.quantity,
                  })),
                },
              });
            }}
          >
            Secure Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPopup;