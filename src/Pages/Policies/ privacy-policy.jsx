import React, { lazy } from 'react';
const Footer = lazy(() => import("../../Pages/Footer"));
const Header = lazy(() => import("../../Pages/Header"));

const PrivacyPolicy = () => {
  return (
    <div>
      <Header />
      <div className="privacy-policy container">
      <h2 className="text-uppercase termsAndCondition d-flex justify-content-start pt-3">
          Privacy Policy
        </h2>

        <div className="privacy-content pt-3">
          <p>
            At Crystova, your privacy is important to us. We are committed to protecting your personal information and handling it transparently and responsibly in accordance with applicable privacy laws.
          </p>

          <h3 className="section-title mt-4">Information We Collect</h3>

          <h4 className="subsection-title mt-3">When you use the Crystova app, we may collect:</h4>
          <p>
            <ul className='pt-2'>
              <li>Information you provide, such as your name, email, phone number, and address during sign-up or use of services.</li>
              <li>Automatically collected data like your IP address, device type, browser, and how you interact with the app.</li>
              <li>Location data, if you enable location services, to show you nearby offers or features.</li>
            </ul>
          </p>
          <h3 className="section-title mt-4">How We Use Your Data</h3>
          <h4 className="subsection-title mt-3">We use your information to:</h4>
          <p>
            <ul className='pt-2'>
              <li>Provide and personalize your experience within the app</li>
              <li>Send you updates, recommendations, or promotional offers</li>
              <li>Improve our services based on usage patterns and feedback</li>
              <li>Display publicly shared reviews or comments, where applicable</li>
            </ul>
          </p>

          <h4 className="subsection-title mt-3">Sharing Your Information</h4>
          <p className='pt-1'>
            We don’t sell your personal information. We may share limited data with trusted third-party service providers who help us run the app—strictly under confidentiality obligations. Information may also be shared if required by law or to protect the rights and safety of our users.
          </p>

          <h4 className="subsection-title mt-3">Your Choices</h4>
          <p className='pt-1'>
            You can manage your preferences, including opting out of promotional communications, through your account settings or unsubscribe options.
          </p>

          <h4 className="subsection-title mt-3">Data Security</h4>
          <p className='pt-1'>
            We implement reasonable security measures to protect your data. While we strive to ensure safety, no system can be 100% secure.
          </p>

          <h4 className="subsection-title mt-3">Links to Other Services</h4>
          <p className='pt-1'>
            The app may contain links to external websites or services. We are not responsible for their privacy policies, so please review them before sharing personal data.
          </p>

          <h4 className="subsection-title mt-3">Policy Updates</h4>
          <p className='pt-1'>
            We may update this policy from time to time. When changes are made, we’ll notify you through the app or website and update the effective date.
          </p>

        </div>
      </div>
      <div className="pb-sm-5 client_footer_monial"></div>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;