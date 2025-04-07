import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";
import Footer from "../../Pages/Footer";
import Header from "../../Pages/Header";

const OrderDetails = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const steps = ["Confirmed", "Packed", "Shipped", "Delivered"];
  const statusMap = {
    pending: "Pending",
    confirmed: "Confirmed",
    packed: "Packed",
    shipped: "Shipped",
    delivered: "Delivered",
    cancelled: "Cancelled",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = localStorage.getItem("user_Id"); // Get user ID from localStorage
        const response = await axios.get(
          `http://localhost:3000/api/v1/order/get-user/${userId}`
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
      <Header />
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
                  style={{ accentColor: "#611d2b" }}
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
                    <img
                      src={`http://localhost:3000${item.productId.image[0]}`}
                      alt={item.productId?.productName}
                      className="img_dd"
                    />
                    <div className="item-details mx-1">
                      <p className="item-name m-auto">
                        {item.productId?.productName}
                      </p>
                      <p className="item-price">
                        Total:{" "}
                        <strong>₹{item.productPrice.$numberDecimal}</strong>
                      </p>
                      <p className="item-qty">
                        size:{" "}
                        <strong>{order.selectedSize}</strong>
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
                <img
                  src={`http://localhost:3000${
                    order.orderDetails[0]?.productId?.image[0] || ""
                  }`}
                  alt={
                    order.orderDetails[0]?.productId?.productName || "Product"
                  }
                  className="img_dd"
                />

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
