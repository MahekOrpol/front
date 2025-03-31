import React, { useEffect, useState } from "react";
import Header from "../../Pages/Header";
import Footer from "../../Pages/Footer";
import {
    FaAngleDown,
    FaArrowRight,
    FaChevronLeft,
    FaChevronRight,
} from "react-icons/fa6";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { BiShoppingBag } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";

const Wishlist = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const userId = localStorage.getItem("user_Id");
    const [wishlist, setWishlist] = useState([]);
    const [imageIndexes, setImageIndexes] = useState({});

    useEffect(() => {
        if (wishlist.length > 0) {
            setImageIndexes((prevIndexes) => {
                const newIndexes = { ...prevIndexes };
                wishlist.forEach((product) => {
                    if (!(product.id in newIndexes)) {
                        newIndexes[product.id] = 0;
                    }
                });
                return newIndexes;
            });
        }
    }, [wishlist]);


    const toggleFavorite = (id) => {
        setIsFavorite((prev) => ({
            ...prev,
            [id]: !prev[id], // Toggle the favorite state for the specific card
        }));
    };
    useEffect(() => {
        window.scrollTo(0, 0); // Scrolls to the top when the component loads
    }, []);

    useEffect(() => {

        fetchWishlist();
    }, [userId]);

    const fetchWishlist = async () => {
        if (!userId) return;

        try {
            const response = await axios.get(`http://localhost:3000/api/v1/wishlist/${userId}`);
            const wishlistData = response.data.data;
            setWishlist(wishlistData);

            // Initialize image indexes for each product
            const initialIndexes = {};
            wishlistData.forEach((product) => {
                initialIndexes[product.productId.id] = 0;
            });
            setImageIndexes(initialIndexes);
        } catch (error) {
            console.error("Error fetching wishlist:", error);
        }
    };

    const toggleWishlist = async (productId) => {
        console.log("Removing product with ID:", productId);

        const wishlistItem = wishlist.find((item) => item.productId.id === productId);

        if (!wishlistItem || !wishlistItem.id) {
            console.error("Invalid wishlist item:", wishlistItem);
            return;
        }

        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/wishlist/delete/${wishlistItem.id}`);

            // Remove item from the wishlist state

            if (res.status === 200) {
                setWishlist((prev) => prev.filter((item) => item.productId.id !== productId));
                console.log('res.data.message', res.data.message)
                fetchWishlist(); // Fetch updated wishlist after deletion
                toast.success(res.data.message)
            }
        } catch (error) {
            console.error("Error removing from wishlist:", error);
        }
    };

    const handleNextImage = (productId, images) => {
        setImageIndexes((prevIndexes) => ({
            ...prevIndexes,
            [productId.id]: (prevIndexes[productId.id] + 1) % images.length,
        }));
    };

    const handlePrevImage = (productId, images) => {
        setImageIndexes((prevIndexes) => ({
            ...prevIndexes,
            [productId.id]: (prevIndexes[productId.id] - 1 + images.length) % images.length,
        }));
    };

    return (
        <>
            <Header />
            <div className="container">
                <div className="hdr_csd flex-column align-items-center produ_sss">
                    <div className="row pt-5">
                        {wishlist.map(({ productId, id }) => (
                            <div
                                key={id}
                                className="col-lg-3 col-md-4 col-6 mb-4 asxasx_card"
                                onMouseEnter={() => setHoveredProduct(productId.id)}
                                onMouseLeave={() => setHoveredProduct(null)}
                            >
                                {/* Each column adapts based on screen size */}
                                <div className="card prio_card scdscsed_sdss_pro">
                                    <div className="card-image-wrapper position-relative">
                                        <div className="card-title">
                                            <div>
                                                <button className="new_btnddx p-1 ms-3 mt-3 trtrd">Sale</button>
                                                <div
                                                    className="snuf_dfv text-overlay position-absolute top-0 p-2 text-white text-center d-flex flex-column me-3 mt-3"
                                                    onClick={() => toggleWishlist(productId?.id)}
                                                    style={{ cursor: "pointer" }}
                                                >
                                                    {wishlist.some((item) => item.productId.id === productId.id) ? (
                                                        <GoHeartFill className="heart-icon_ss" size={18} />
                                                    ) : (
                                                        <GoHeart className="heart-icon_ss" size={18} />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="card-body">
                                                {/* <img
                                                    src={`http://localhost:3000${productId.image[imageIndexes[productId.id]]}`}
                                                    className="w-100"
                                                    alt={productId.productName}
                                                /> */}
                                                {productId.image[imageIndexes[productId.id]].endsWith(".mp4") ? (
                                                    <video
                                                        src={`http://localhost:3000${productId.image[imageIndexes[productId.id]]}`}
                                                        className="w-100"
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                    />
                                                ) : (
                                                    <img
                                                        src={`http://localhost:3000${productId.image[imageIndexes[productId.id]]}`}
                                                        className="w-100"
                                                        alt={productId.productName}
                                                    />
                                                )}
                                                {hoveredProduct === productId.id && productId.image.length > 1 && (
                                                    <div className="hover-overlay w-100 d-none d-sm-flex">
                                                        <button className="d-flex align-items-center left-btn p-2 mt-2 justify-content-center gap-3"
                                                            onClick={() => handlePrevImage(productId, productId.image)}>
                                                            <FaChevronLeft />
                                                        </button>

                                                        <button className="btn btn-light right-btn"
                                                            onClick={() => handleNextImage(productId, productId.image)}>
                                                            <FaChevronRight />
                                                        </button>

                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column main_cdsss">
                                    <span className="mikdec_try pt-3 text-truncate">  {productId.productName}
                                    </span>
                                    <div className="d-flex align-items-center gap-3 pt-1">
                                        <span className="mikdec_asdxsx">  {productId.salePrice?.$numberDecimal}</span>
                                        <span className="mikdec_axsx">{productId.regularPrice?.$numberDecimal}</span>
                                    </div>
                                    {hoveredProduct === productId.id && (
                                        <div className="hover-overlay DFC_NHJ w-100 d-none d-sm-flex">
                                            <button className="d-flex align-items-center add-to-crd-dd p-1 mt-2 justify-content-center gap-3">
                                                Add to Cart <BiShoppingBag size={25} />
                                            </button>
                                            <a
                                                href="/product-details"
                                                className="mt-2 text-body szdc_zasxl d-flex gap-2 align-items-center justify-content-left w-100 ms-4"
                                            >
                                                Read more about the Product <FaArrowRight />
                                            </a>
                                        </div>
                                    )}
                                    {/* <div className="d-flex d-sm-none flex-column mt-2">
                                        <button className="d-flex align-items-center add-to-crd-dd rtuy p-1 justify-content-center gap-3">
                                            Add to Cart <BiShoppingBag size={25} />
                                        </button>
                                        <a
                                            href="/product-details"
                                            className="mt-2 text-body szdc_za d-flex gap-2 align-items-left justify-content-left w-100"
                                        >
                                            Read more about the Product <FaArrowRight />
                                        </a>
                                    </div> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
export default Wishlist;