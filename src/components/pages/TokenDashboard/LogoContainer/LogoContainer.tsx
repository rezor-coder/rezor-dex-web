import React from "react";
import { LuShieldAlert } from "react-icons/lu";
import "./LogoContainer.scss"; // Import the SCSS file

const LogoContainer = () => {
  return (
    <div className="logos-container">
      {/* Left Side - Icons */}
      <div className="icons-section">
        <div className="icon-wrapper">
          <img src="dashboard/icons/bubblemaps.png" alt="bubblemaps" />
        </div>
        <div className="icon-wrapper">
          <img src="dashboard/icons/cmc-icon-blue.jpeg" alt="cmc-icon" />
        </div>
        <div className="icon-wrapper">
          <img src="dashboard/icons/coingecko.png" alt="coingecko" />
        </div>
        <div className="icon-wrapper">
          <img src="dashboard/icons/ether-scan.png" alt="ether" />
        </div>
        <span className="more-icon">•••</span>
      </div>

      {/* Spacer */}
      <div className="spacer"></div>

      {/* Right Side - No Audit */}
      <div className="no-audit">
        <LuShieldAlert />
        <span role="img" aria-label="No Audit">
          NO AUDIT
        </span>
      </div>
    </div>
  );
};

export default LogoContainer;
