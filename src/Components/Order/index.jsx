import React, { useState, useEffect, Suspense, lazy } from "react";
import axios from "axios";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { fetchCartCount } from "../../redux/cartSlice";

const Header = lazy(() => import("../../Pages/Header"));
const CartPopup = lazy(() => import("../Add to Cart"));
const Footer = lazy(() => import("../../Pages/Footer"));

const OrderDetails = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const disableRightClick = (e) => e.preventDefault();
  const steps = ["Confirmed", "Packed", "Shipped", "Delivered"];
  const statusMap = {
    pending: "Pending",
    confirmed: "Confirmed",
    packed: "Packed",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };
  const [wishlistCount, setWishlistCount] = useState(
    parseInt(localStorage.getItem("wishlistCount")) || 0
  );
  const [wishlistItems, setWishlistItems] = useState({});

  const navigate = useNavigate("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const userId = localStorage.getItem("user_Id");

  const dispatch = useDispatch();
  const {
    count: cartCount,
    loading,
    error,
  } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartCount());
  }, [dispatch]);

  const openCart = () => {
    const userId = localStorage.getItem("user_Id");

    if (!userId) {
      navigate("/login");
      return;
    }
    setIsCartOpen(true);
    document.body.classList.add("no-scroll");
  };

  const closeCart = () => {
    setIsCartOpen(false);
    setShowToast(false);
    dispatch(fetchCartCount());
    document.body.classList.remove("no-scroll");
  };

  const toggleFavorite = async (productId) => {
    // if (!userId) return toast.error("Please log in to add items to wishlist");
    const userId = localStorage.getItem("user_Id");

    if (!userId) {
      navigate("/login");
      return;
    }
    try {
      if (wishlistItems[productId]) {
        // Remove from wishlist
        const wishlistItemId = wishlistItems[productId]; // Store the current ID
        setWishlistItems((prev) => {
          const updatedWishlist = { ...prev };
          delete updatedWishlist[productId]; // Update UI immediately
          return updatedWishlist;
        });
        setWishlistCount((prev) => prev - 1);
        const res = await axios.delete(
          `https://dev.crystovajewels.com/api/v1/wishlist/delete/${wishlistItemId}`
        );
        toast.success(res.data.message || "Removed from wishlist!");
      } else {
        // Add to wishlist
        const response = await axios.post(
          `https://dev.crystovajewels.com/api/v1/wishlist/create`,
          {
            productId,
            userId,
          }
        );

        const newWishlistItemId = response.data.data.id;
        setWishlistItems((prev) => ({
          ...prev,
          [productId]: newWishlistItemId, // Store wishlist ID properly
        }));
        setWishlistCount((prev) => prev + 1);
        toast.success(response.data.message || "Added to wishlist!");
      }
    } catch (error) {
      console.error("Failed to update wishlist:", error);
      toast.error("Failed to update wishlist. Please try again!");
    }
  };

  useEffect(() => {
    const fetchWishlist = async () => {
      if (!userId) return;
      try {
        const response = await axios.get(
          `https://dev.crystovajewels.com/api/v1/wishlist/${userId}`
        );
        const wishlistData = response.data.data || [];

        const wishlistMap = {};
        wishlistData.forEach((item) => {
          let productId = item.productId._id || item.productId.id;

          if (typeof productId === "string" || typeof productId === "number") {
            wishlistMap[productId] = item.id;
          } else {
            console.error("Invalid productId format:", item.productId);
          }
        });

        setWishlistItems(wishlistMap);
        setWishlistCount(wishlistData.length);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("user_Id"); // Get user ID from localStorage
        const response = await axios.get(
          `https://dev.crystovajewels.com/api/v1/order/get-user/${userId}`
        );

        if (response.data.status) {
          let orders = response.data.data;

          console.log("Fetched Orders:", orders); // Debugging log

          // 🔹 Exclude orders where paymentStatus is "Unpaid"
          orders = orders.filter(
            (order) => order.paymentStatus?.toLowerCase() !== "unpaid"
          );

          const pendingOrders = orders.filter(
            (order) => order.status?.toLowerCase() !== "delivered"
          );
          const deliveredOrders = orders.filter(
            (order) => order.status?.toLowerCase() === "delivered"
          );

          setPendingOrders(pendingOrders);
          setDeliveredOrders(deliveredOrders);

          console.log("Pending Orders:", pendingOrders);
          console.log("Delivered Orders:", deliveredOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const totalPendingAmount = pendingOrders.reduce((sum, order) => {
    return sum + parseFloat(order.totalPrice?.$numberDecimal || 0);
  }, 0);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        stacked
      />
      <CartPopup
        isOpen={isCartOpen}
        closeCart={closeCart}
        showToast={showToast}
        // toastMessage={toastMessage}
      />
      <div className="main-header1">
      <Suspense fallback={<div>Loading...</div>}>
        <Header
          openCart={openCart}
          wishlistCount={userId ? wishlistCount : null}
          cartCount={userId ? cartCount : null}
        />
        </Suspense>
      </div>
      <div className="order-container">
        <h2 className="order-title">Order Details</h2>

        {/* Pending Orders */}
        {pendingOrders.length > 0 ? (
          pendingOrders.map((order, index) => (
            <div key={index} className="order_ddyy">
              <p className="order-info">
                Order Placed On:{" "}
                <strong>{new Date(order.createdAt).toDateString()}</strong> |
                Order No: <strong># {order.orderId}</strong>
              </p>
              <p className="delivery-date">
                Delivery Expected by {new Date(order.updatedAt).toDateString()}
              </p>

              {/* Order Tracking */}
              {/* Order Tracking */}
              <div className="step-progress-container mx-lg-5">
                <input
                  type="range"
                  min="0"
                  max={steps.length - 1}
                  // value={steps.indexOf(statusMap[order.status?.toLowerCase()] || "Confirmed")}
                  value={Math.max(
                    0,
                    steps.indexOf(
                      statusMap[order.status?.toLowerCase()] || "Confirmed"
                    )
                  )}
                  className="price-slider w-100"
                  style={{ accentColor: "#175C65" }}
                  readOnly
                />
                <div className="d-flex justify-content-between mt-2">
                  {steps.map((step, index) => (
                    <span
                      key={index}
                      className={`step-label ${
                        steps.indexOf(
                          statusMap[order.status?.toLowerCase()] || "Confirmed"
                        ) >= index
                          ? "active-step"
                          : ""
                      }`}
                    >
                      {step}
                    </span>
                  ))}
                </div>
              </div>

              {/* Order Items */}
              {/* Order Items */}
              {order.orderDetails?.length > 0 ? (
                order.orderDetails.map((item, i) => (
                  <div key={i} className="order_ddd">
                    {(() => {
                      const imageToShow = item?.productId?.image.find(
                        (img) =>
                          typeof img === "string" && !img.endsWith(".mp4")
                      );

                      return imageToShow ? (
                       <img   
  onContextMenu={disableRightClick}
   draggable="false"
                          loading="eager"
                          src={`https://dev.crystovajewels.com${imageToShow}`}
                          alt={item.productId?.productName}
                          className="img_dd"
                        />
                      ) : (
                        <div className="text-muted">No image available</div>
                      );
                    })()}
                    {/*<img   
  onContextMenu={disableRightClick}
   draggable="false"
                      loading="eager"
                      src={`https://dev.crystovajewels.com${item?.productId?.image[0]}`}
                      alt={item.productId?.productName}
                      className="img_dd"
                    /> */}
                    <div className="item-details mx-1">
                      <p className="item-name m-auto">
                        {item.productId?.productName}
                      </p>
                      <p className="item-price">
                        Total:{" "}
                        <strong>₹{item.productPrice.$numberDecimal}</strong>
                      </p>
                      <p className="item-qty">
                        size: <strong>{order.selectedSize}</strong>
                      </p>
                      <p className="item-qty">
                        <strong>Qty: {order.selectedqty}</strong> | Order ID: #{" "}
                        {order.orderId}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No items found in this order.</p>
              )}
            </div>
          ))
        ) : (
          <p>No pending orders found.</p>
        )}

        <table className="price-summary mt-5 w-25">
          <thead>
            <tr>
              <th colSpan="2">Price Summary</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Item Total</td>
              <td>₹{totalPendingAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Delivery Charge</td>
              <td>Free</td>
            </tr>
            <tr>
              <td>GST & Other Taxes</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td>Payment Method</td>
              <td>Cash on Delivery</td>
            </tr>
            <tr className="total">
              <td>Total Payable</td>
              <td>₹{totalPendingAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        {/* Delivery Details */}
        <div className="delivery-info mt-5">
          <p className="tgrot">Delivery to:</p>
          <h3>Jackie Walter</h3>
          <p className="rtejh">B-613 IT Park, Mota Varaccha, Surat</p>
          <p className="rtejh">Mobile No: 9745678987</p>
        </div>

        {/* Previous Orders */}
        <h3 className="prev-orders-title mt-5 mb-3 fs-2">
          Your Previous Orders
        </h3>
        {deliveredOrders.length > 0 ? (
          deliveredOrders.map((order, index) => (
            <div key={index} className="prev-order">
              <div className="prev-order-info mt-2 mx-3">
                <div className="gftt">
                  <p className="m-auto">Order Placed On</p>
                  <p className="bold">
                    {new Date(order.createdAt).toDateString()}
                  </p>
                </div>
                <div className="gftt">
                  <p className="m-auto">Total Price</p>
                  <p className="bold">₹{order.totalPrice.$numberDecimal}</p>
                </div>
                <div className="gftt">
                  <p className="m-auto">Ship to</p>
                  <p className="bold">{order.receiverName}</p>
                </div>
              </div>
              <hr className="m-auto" />
              <div className="prev-order-item p-3">
                {(() => {
                 const imageToShow = order.orderDetails[0]?.productId?.image?.find(
                  (img) => typeof img === "string" && !img.endsWith(".mp4")
                );
                
                  return imageToShow ? (
                   <img   
  onContextMenu={disableRightClick}
   draggable="false"
                      loading="eager"
                      src={`https://dev.crystovajewels.com${imageToShow}`}
                      alt={
                        order.orderDetails[0]?.productId?.productName ||
                        "Product"
                      }
                      className="img_dd"
                    />
                  ) : (
                    <div className="text-muted">No image available</div>
                  );
                })()}
                {/*<img   
  onContextMenu={disableRightClick}
   draggable="false"
                  loading="eager"
                  src={`https://dev.crystovajewels.com${
                    order.orderDetails[0]?.productId?.image[0] || ""
                  }`}
                  alt={
                    order.orderDetails[0]?.productId?.productName || "Product"
                  }
                  className="img_dd"
                /> */}

                <div className="mx-3">
                  <div className="d-flex align-items-baseline gap-2">
                    <p>{order.orderDetails.length} item(s)</p>
                    <div className="delivered-status">Order Delivered</div>
                  </div>
                  <p className="gftt">Order ID: {order.orderId}</p>
                  <p className="gftt bold">
                    Delivered on {new Date(order.updatedAt).toDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No previous orders found.</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderDetails;
