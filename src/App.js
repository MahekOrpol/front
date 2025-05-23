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
import Wishlist from "./Components/wishlist";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-bootstrap";
import RegisterPopup from "./Components/RegisterPopup";
import ProtectedRoute from "./Pages/Protected Route/protectedRoute";
import { Suspense, useEffect } from "react";
import LoadingSpinner from "./Components/LoadingSpinner";
import ProgressBar from './Components/ProgressBar';
import 'nprogress/nprogress.css';
import TermsAndConditions from "./Pages/Policies/terms&conditions";
import PrivacyPolicy from "./Pages/Policies/privacy-policy";
import NotFound from "./NotFound";
import { useDispatch, useSelector } from "react-redux";


function App() {
  const userId = localStorage.getItem("user_Id");
  const { count: cartCount } = useSelector((state) => state.cart);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const currentScrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
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
      <ProgressBar />
      <ToastContainer position="top-right" autoClose={3000} />
      <Suspense fallback={<LoadingSpinner />}>
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
          <Route path="/customjewel" element={<CustomJewel />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
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
            element={<ProtectedRoute element={<CheckoutPage cartCount={userId ? cartCount : null} />} />}
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
