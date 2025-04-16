// src/Card.js

import React from "react";
import "./Card.scss";

const Card = () => {
  return (
    <div className="card">
      <div className="card-content">
        <div className="card-title">All time</div>
        <div className="card-subtitle">Volume</div>
        <div className="card-amount">$1.2B</div>
      </div>
    </div>
  );
};

export default Card;
