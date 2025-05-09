import React, { lazy } from 'react'
const Footer = lazy(() => import("../../Pages/Footer"));
const Header = lazy(() => import("../../Pages/Header"));

const  PrivacyPolicy = () => {
  return (
    <div>
      <Header />
      <div className="terms-and-conditions container">
        <h2 className="termsAndCondition d-flex justify-content-center pt-3">
        Privacy Policy
        </h2>
        <p>At Crystova, your privacy is important to us. We are committed to protecting your personal information and handling it transparently and responsibly in accordance with applicable privacy laws.</p>
        </div>
      <Footer />
    </div>
  )
}

export default  PrivacyPolicy
