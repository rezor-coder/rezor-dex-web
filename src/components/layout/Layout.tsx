import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../common/Header/Header";
import "./Layout.scss";
import Rezormawatermark from "../../assets/icons/Rezormawatermark.svg";
import { useState } from "react";



const Layout = () => {
  const [active, setActive] = useState<boolean | any>(false);

  var location  = useLocation();
  
    
    if(location.pathname != "/") {
      require("../../index.scss");
    }

  const handleActive = () =>
    document.body.clientWidth < 1199 && setActive(!active);
  return (
    <>
      <div className={"layout"}>
        <Header handleActive={handleActive} active={active} />
        <Container>
          <Outlet />
        </Container>
        {/* <span className="waterMark">
          <img src={Rezormawatermark} alt="Water mark" />
        </span> */}
      </div>
    </>
  );
};

export default Layout;
