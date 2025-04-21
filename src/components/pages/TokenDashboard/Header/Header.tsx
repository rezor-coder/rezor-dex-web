import React, { useEffect, useRef, useState } from "react";
import "./Header.scss"; // Import the SCSS file
import Dropdown from "../Dropdown/Dropdown";

const Header: React.FC = () => {
  const [dropdown, setDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };
  // Close dropdown if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="header">
      <div className="header__left" ref={dropdownRef}>
        <button onClick={handleDropdown} className="header__dropdown">
          ALL CHAINS ▼
        </button>
        {dropdown && <Dropdown handleDropdown={handleDropdown} />}
      </div>
      <div className="header__center">
        <input
          type="text"
          className="header__search"
          placeholder="Search pair by symbol, name, contract or token"
        />
      </div>
      <div className="header__right">
        <div className="header__icon-settings">
          <i className="fas fa-cog"></i>
        </div>
        <div className="header__icon-favorite">
          <i className="fas fa-star"></i>
        </div>
        <button className="header__connect">Connect</button>
      </div>
    </div>
  );
};

export default Header;
