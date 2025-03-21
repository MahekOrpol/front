import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Products from './Components/Products';
import ProductDetails from './Components/ProductsDetails/indfex';
import Blog from './Components/Blog';
import BlogDetails from './Components/Blog Details';
import Contact from './Components/Contact Us';
import AboutUs from './Components/About Us';
import CartPopup from './Components/Add to Cart';
import CheckoutPage from './Components/Check Out';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product-details" element={<ProductDetails />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog-details" element={<BlogDetails />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/add_to_cart" element={<CartPopup />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;