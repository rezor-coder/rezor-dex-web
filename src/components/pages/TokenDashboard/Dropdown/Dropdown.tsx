import React from "react";
import "./Dropdown.scss"; // Import the SCSS file
import { Link } from "react-router-dom";

interface DropdownProps {
  handleDropdown: () => void;
}
const Dropdown: React.FC<DropdownProps> = ({ handleDropdown }) => {
  const chains = [
    { id: 1, name: "ETHEREUM", icon: "dashboard/icons/dropdown/ether.png" },
    { id: 2, name: "SOLANA", icon: "dashboard/icons/dropdown/solana.png" },
    { id: 3, name: "BNB CHAIN", icon: "dashboard/icons/dropdown/BSC.png" },
  ];

  return (
    <div className="dropdown">
      <input type="text" className="dropdown__search" placeholder="Search" />
      <div className="dropdown__grid">
        {chains.map((chain, index) => (
          <Link
            to={`/token/${chain.id}`}
            key={index}
            onClick={handleDropdown}
            className="dropdown__item"
          >
            <img
              src={`${chain.icon}`}
              alt={chain.name}
              className="dropdown__icon"
            />
            <span className="dropdown__name">{chain.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
