import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface propTypes {
  glowbg: any; 
  title: string;
  text: string;
  image: string;
  buttonName: string;
  btnPath: string;
  style?: React.CSSProperties;
}

const ProductsCards = (props: propTypes) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleMouseEnter = () => {
    setIsClicked(false); // Reset on mouse enter
  };

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Card
        className="custom-card text-center"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsClicked(false)}
        onClick={handleClick}
        style={{ height: "422px", ...props.style }}
      >
        <Card.Body>
          <motion.div
            className="glow-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: isClicked ? 1 : 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <img src={props.glowbg} alt="Glow" />
          </motion.div>
          <div className="logo-container">
            <img className="logo" src={props.image} alt="logo" />
          </div>
          <Card.Title>
            <h2>{props.title}</h2>
          </Card.Title>
          <Card.Text>{props.text}</Card.Text>
          <Link to={props.btnPath}>
            <motion.button 
              whileTap={{ scale: 0.95 }} 
              className="btn btn-primary swap-btn"
            >
              {props.buttonName}
            </motion.button>
          </Link>
          <motion.div
            className="glow-bg"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <img src={props.glowbg} alt="Glow" />
          </motion.div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ProductsCards;
