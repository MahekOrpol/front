import React, { useEffect, useState } from "react";
import "./index.css";

import logo from "../../Images/logo.png";
import usericon from "../../Images/Group.png";
import { CiHeart, CiSearch } from "react-icons/ci";
import { IoBagHandleOutline } from "react-icons/io5";
const Header = () => {

  return (
    <>
      <div className="header_main">
        <p className="header_text pt-2">Shop Gold and Diamond Jewellery</p>
      </div>

      <div className="heder_sec_main d-flex align-items-center">
        <div
          className="d-flex align-items-center w-25 gap-4"
          style={{ paddingLeft: "7.3rem" }}
        >
          <div className="header_list_tcty">Rings</div>
          <div className="header_list_tcty">Earrings</div>
          <div className="header_list_tcty">Pendant</div>
          <div className="header_list_tcty">Bracelet</div>
          <div className="header_list_tcty">Custom Jewellery</div>
        </div>
        <div className="d-flex justify-content-center w-50">
          <img src={logo} /> 
        </div>
        <div className="w-25 d-flex align-items-center gap-5">
          <div className="user_icon gap-3 d-flex align-items-center">
            <img src={usericon} />
            <div className="d-flex flex-column align-items-center pt-2">
              <span className="sign_txt w-100">Sign In</span>
              <span className="acco9_text w-100">Account</span>
            </div>
          </div>

          <div>
            <CiSearch size={25} />
          </div>
          <div>
            <CiHeart size={25} />
          </div>
          <div>
            <IoBagHandleOutline size={25} />
          </div>
        </div>
      </div>

    </>
  );
};

export default Header;
