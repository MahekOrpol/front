import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Products from "./Components/Products";
import ProductDetails from "./Components/ProductsDetails/index";
import Blog from "./Components/Blog";
import BlogDetails from "./Components/Blog Details";
import Contact from "./Components/Contact Us";
import AboutUs from "./Components/About Us";
import CartPopup from "./Components/Add to Cart";
import CheckoutPage from "./Components/Check Out";
import EditProfile from "./Components/EditProfile";
import OrderDetails from "./Components/Order";
import CustomJewel from "./Components/Custom Jewelry";
import JewelrySale from "./Components/Contact Us/sdcsd/demo";
import Wishlist from "./Components/wishlist";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-bootstrap";
import RegisterPopup from "./Components/RegisterPopup";
import ProtectedRoute from "./Pages/Protected Route/protectedRoute";
import Ring1 from "./Components/Home/ring demo 1/ring";
import { useEffect } from "react";
import WhatsAppButton from "./Components/WhatsAppButton";

function App() {
  useEffect(() => {
    let lastScrollTop = 0;
  
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const header = document.querySelector(".main-header");
  
      if (!header) return;
  
      if (currentScrollTop > lastScrollTop) {
        // Scrolling Down
        header.classList.add("hide-header");
      } else {
        // Scrolling Up
        header.classList.remove("hide-header");
      }
  
      lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    };
  
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/Editprofile" element={<EditProfile />} />
        <Route
          path="/product-details/:productId"
          element={<ProductDetails />}
        />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/Customjewel" element={<CustomJewel />} />
        <Route path="/demo" element={<JewelrySale />} />
        {/* <Route path="/rings1" element={<Ring1 />} /> */}

        {/* <Route path="/Order" element={<OrderDetails />} />
        <Route path="/add_to_cart" element={<CartPopup />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/register"
          element={
            <RegisterPopup isOpen={true} onClose={() => window.history.back()} />
          } /> */}

        <Route
          path="/order"
          element={<ProtectedRoute element={<OrderDetails />} />}
        />
        <Route
          path="/add_to_cart"
          element={<ProtectedRoute element={<CartPopup />} />}
        />
        <Route
          path="/wishlist"
          element={<ProtectedRoute element={<Wishlist />} />}
        />
        <Route
          path="/checkout"
          element={<ProtectedRoute element={<CheckoutPage />} />}
        />

        <Route
          path="/login"
          element={
            <RegisterPopup
              isOpen={true}
              onClose={() => window.history.back()}
            />
          }
        />
      </Routes>
      <WhatsAppButton />
    </BrowserRouter>
  );
}

export default App;
