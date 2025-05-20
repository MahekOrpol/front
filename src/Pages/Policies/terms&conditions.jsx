import React, { lazy, useEffect, useState } from "react";
const Footer = lazy(() => import("../../Pages/Footer"));
const Header = lazy(() => import("../../Pages/Header"));
import "./policy.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCartCount } from "../../redux/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";

const TermsAndConditions = () => {
  const [activeSection, setActiveSection] = useState(null);
  const dispatch = useDispatch();
  const { count: cartCount } = useSelector((state) => state.cart);
  const [wishlistCount, setWishlistCount] = useState(
    parseInt(localStorage.getItem("wishlistCount")) || 0
  );
  const [imageIndexes, setImageIndexes] = useState({});
  const [wishlistItems, setWishlistItems] = useState({});
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const sections = [
    {
      title: "General Use and Acceptance",
      content: [
        "You agree to use the Platform only for lawful purposes and in accordance with applicable local, state, and international laws.",
        "Crystova reserves the right to deny access, suspend or terminate any user account without notice, for any behavior that violates these Terms or is deemed harmful to the Platform or its users.",
      ],
    },
    {
      title: "Account Responsibility",
      content: [
        "You may be required to create an account to access certain features. You agree to provide accurate, current, and complete information during the registration process.",
        "You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
        "Crystova is not liable for any unauthorized access or misuse of your account resulting from your failure to secure your login information.",
      ],
    },
    {
      title: "Product Information and Availability",
      content: [
        "While we strive for accuracy, product descriptions, images, and pricing may occasionally contain errors.",
        "If a product is unavailable after your order is placed, we will notify you as soon as possible.",
        "Crystova reserves the right to limit quantities, refuse orders, or cancel transactions at our discretion.",
      ],
    },
    {
      title: "Pricing and Payment",
      content: [
        "All prices displayed are inclusive of applicable taxes unless stated otherwise.",
        "We accept various forms of payment including credit/debit cards, UPI, and net banking. Payments must be made in full before order processing.",
        "If a transaction is flagged as potentially fraudulent or fails verification checks, we reserve the right to hold or cancel it.",
      ],
    },
    {
      title: "Order Confirmation and Delivery",
      content: [
        "Once an order is placed, you will receive an order confirmation via email or SMS. This confirmation does not signify acceptance of your order, only acknowledgment of receipt.",
        "Delivery timelines are estimates and subject to delays due to unforeseen circumstances.",
        "You are responsible for providing accurate shipping details. Crystova is not responsible for lost deliveries due to incorrect addresses.",
      ],
    },
    {
      title: "Promotions, Offers, and Discounts",
      content: [
        "Crystova may offer promotional discounts or vouchers subject to specific terms. These cannot be exchanged for cash or combined with other promotions.",
        "Misuse of discount codes (e.g., sharing beyond intended recipients) may result in cancellation of the associated orders.",
      ],
    },
    {
      title: "User Conduct and Prohibited Activities",
      content: [
        "Users agree not to: Post or transmit any content that is harmful, illegal, defamatory, abusive, vulgar, or obscene.",
        "Attempt to gain unauthorized access to any part of the Platform.",
        "Use the Platform to transmit any viruses, malware, or malicious code.",
        "Use bots, scrapers, or other automated means to access the Platform or data on it.",
        "Violation of these rules may lead to suspension or permanent banning of your account.",
      ],
    },
    {
      title: "Intellectual Property",
      content: [
        "All content on the Platform, including logos, designs, graphics, text, images, audio, video, software, and code, is the property of Crystova or its licensors.",
        "You may not copy, distribute, reproduce, or create derivative works from any part of the Platform without prior written consent from Crystova.",
      ],
    },
    {
      title: "Data Privacy and Security",
      content: [
        "We collect personal and device-related information as outlined in our Privacy Policy.",
        "While we take reasonable precautions, we cannot guarantee absolute security of your data.",
        "By using our services, you consent to our collection and use of your personal information in accordance with our Privacy Policy.",
      ],
    },
    {
      title: "Third-Party Services and Links",
      content: [
        "Our Platform may include links to external websites or services not operated by Crystova.",
        "We are not responsible for the content, policies, or practices of these third-party sites.",
        "Use of third-party services is at your own risk and subject to their respective terms and policies.",
      ],
    },
    {
      title: "Feedback and User-Generated Content",
      content: [
        "Any feedback, suggestions, reviews, or other content you submit to Crystova becomes our property and may be used for marketing or promotional purposes.",
        "You grant Crystova a perpetual, worldwide, royalty-free license to use, modify, publish, and distribute such content.",
      ],
    },
    {
      title: "Disclaimer of Warranties",
      content: [
        "Crystova makes no warranties or representations regarding the reliability, accuracy, or availability of the Platform.",
        "All content and services are provided on an 'as is' and 'as available' basis.",
      ],
    },
    {
      title: "Limitation of Liability",
      content: [
        "To the maximum extent permitted by law, Crystova shall not be liable for any direct, indirect, incidental, or consequential damages arising from your use or inability to use the Platform.",
        "This includes, but is not limited to, loss of data, loss of profits, and service interruptions.",
      ],
    },
    {
      title: "Indemnification",
      content: [
        "You agree to indemnify and hold harmless Crystova, its officers, employees, agents, and affiliates from any claims, losses, liabilities, or expenses (including attorney’s fees) arising out of your violation of these Terms or misuse of the Platform.",
      ],
    },
    {
      title: "Termination",
      content: [
        "We reserve the right to suspend or terminate your access to the Platform at any time, without notice, for violations of these Terms or for any reason deemed necessary.",
        "Upon termination, your right to use the Platform will immediately cease.",
      ],
    },
    {
      title: "Governing Law and Jurisdiction",
      content: [
        "These Terms are governed by the laws of [Insert Country/State].",
        "Any disputes arising from these Terms or your use of the Platform will be subject to the exclusive jurisdiction of the courts in [Insert Jurisdiction].",
      ],
    },
    {
      title: "Changes to Terms",
      content: [
        "Crystova reserves the right to modify these Terms at any time. Changes will be posted on this page with a revised 'Last Updated' date.",
        "Continued use of the Platform constitutes your acceptance of the revised Terms.",
      ],
    },
    {
      title: "Contact Us",
      content: [
        "For any questions or concerns regarding our Terms and Conditions, please reach out to us:",
        "Email: info@crystovajewels.com",
        "Phone: +91 72650 77755",
        "Address: Crystova, B-714 IT Park, Opp. AR Mall, Mota Varachha, Surat, Gujarat, India.",
      ],
    },
  ];

  useEffect(() => {
    dispatch(fetchCartCount());
  }, [dispatch]);
  const navigate = useNavigate("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const userId = localStorage.getItem("user_Id");

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

  useEffect(() => {
    fetchWishlist();
  }, [userId]);

  const fetchWishlist = async () => {
    if (!userId) {
      console.log("No userId found");
      return;
    }

    try {
      const response = await axios.get(
        `https://dev.crystovajewels.com/api/v1/wishlist/${userId}`
      );

      if (!response?.data?.data) {
        console.log("No wishlist data found");
        setWishlistItems([]);
        setWishlistCount(0);
        localStorage.setItem("wishlistCount", "0");
        return;
      }

      const wishlistData = response.data.data.filter((item) => item?.productId); // Filter out items without productId
      setWishlistItems(wishlistData);
      setWishlistCount(wishlistData.length);
      localStorage.setItem("wishlistCount", wishlistData.length.toString());

      // Initialize image indexes for each product
      const initialIndexes = {};
      wishlistData.forEach((item) => {
        if (item?.productId?.id) {
          initialIndexes[item.productId.id] = 0;
        }
      });
      setImageIndexes(initialIndexes);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      toast.error("Failed to fetch wishlist items");
      setWishlistItems([]);
      setWishlistCount(0);
      localStorage.setItem("wishlistCount", "0");
    }
  };

  return (
    <div>
      <Header
        openCart={openCart}
        wishlistCount={userId ? wishlistCount : null}
        cartCount={userId ? cartCount : null}
      />
      <div className="terms-and-conditions container">
        <h2 className="text-uppercase termsAndCondition d-flex justify-content-start pt-3">
          Terms and Conditions
        </h2>
        <p className="terms-intro">
          Welcome to Crystova. These Terms and Conditions ("Terms") apply to
          your access and use of the Crystova website, mobile application, and
          services (collectively, the "Platform"). By accessing or using our
          Platform, you agree to be bound by these Terms. If you do not agree,
          you should not use the Platform.
          <br />
          <br />
          Crystova is committed to providing a seamless and secure shopping
          experience, and these Terms are designed to ensure transparency,
          trust, and mutual understanding between you, the user, and our
          company. Whether you are browsing our collections, making a purchase,
          participating in a promotional offer, or submitting feedback, these
          conditions help define your rights and obligations.
          <br />
          <br />
          We encourage you to read through each section carefully, as they cover
          important aspects such as account responsibility, product
          availability, pricing policies, delivery commitments, and limitations
          of liability. Your continued use of the Platform indicates your
          acknowledgment of and agreement to these terms in full. If you have
          any questions or concerns, please refer to the "Contact Us" section at
          the bottom of this page.
        </p>

        <div className="accordion mt-4">
          {sections.map((section, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className={`accordion-button ${activeSection === index ? "" : "collapsed"
                    }`}
                  type="button"
                  aria-expanded={activeSection === index}
                  onClick={() => toggleSection(index)}
                >
                  {section.title}
                  <span className="icon-toggle ms-auto">
                    {activeSection === index ? "−" : "+"}
                  </span>
                </button>
              </h2>
              <div
                className={`accordion-collapse collapse ${activeSection === index ? "show" : ""
                  }`}
              >
                <div
                  className="accordion-body"
                  dangerouslySetInnerHTML={{
                    __html: section.content
                      .map((item) => `<li>${item}</li>`)
                      .join(""), // join the array into a single string with <li> tags
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="pb-sm-5 client_footer_monial"></div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
