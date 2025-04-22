import { Link, NavLink, useLocation } from "react-router-dom";
import "./Sidebar.scss";
// import { BridgeIcon, FarmIcon, LiquidityIcon, MenuIcon, PoolIcon, SwapIcon, TradeIcon } from '../../../assets/icons/svgicons'
import logo from "../../../assets/logo/logo.svg";
import lightLogo from "../../../assets/logo/light-logo.svg";
import { useAppSelector } from "../../../app/hooks";
import { ROUTES } from "../../../utils/constants";
import { useEffect, useState } from "react";
import { toast } from "../Toasts/Toast";
import { DropDownArrow } from "../../../assets/icons/svgicons";

type propTypes = {
  active?: boolean;
  handleActive?: any;
  setRouteDetail?: any;
};

const Sidebar = (props: propTypes) => {
  const { walletAddress } = useAppSelector((state: any) => state?.user);
  const tokenSymbol = useAppSelector((state: any) => state.token.symbol);
  const tokenAddress = useAppSelector((state: any) => state.token.address);
  console.log(tokenSymbol, tokenAddress, "fbvfgvfv");
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [showTradeDropDown, setShowTradeDropDown] = useState(false);
  const [showEarnDropDown, setShowEarnDropDown] = useState(false);

  useEffect(() => {
    // if (!walletAddress) toast?.info("Please connect your wallet first!");
  }, [activeTab]);

  useEffect(() => {
    setActiveTab(location.pathname);
  }, [location.pathname]);

  const handerTradeDropDown = () => {
    setShowTradeDropDown(!showTradeDropDown);
    setShowEarnDropDown(false);
  };

  const handerEarnDropDown = () => {
    setShowEarnDropDown(!showEarnDropDown);
    setShowTradeDropDown(false);
  };

  const { theme } = useAppSelector((state) => state.theme);

  const navs = [
    {
      label: "Home",
      to: ROUTES.HOME,
    },
    {
      label: "Swap",
      to: ROUTES.SWAP,
    },
    {
      label: "Liquidity",
      to: ROUTES.LIQUIDITY,
    },
  ];
  return (
    <>
      <div
        onClick={props.handleActive}
        className={`${props.active ? "active" : ""} sidebar_overlay d-xl-none`}
      />
      <aside className={`sidebar ${props.active ? "active" : ""}`}>
        <div className={"sidebar_head"}>
          <img
            src={theme === "light" ? lightLogo : logo}
            alt="rezorswap logo"
          />
        </div>
        {/* <ul>
          {navs?.map((item) => {
            return (
              <li key={item.label}>
                <Link
                  onClick={() => {
                    props?.setRouteDetail(item?.to);
                    props?.handleActive();
                    setActiveTab(item?.to);
                  }}
                  target={item?.label!="XBridge"?"":"_blank"}
                  to={item?.label!="XBridge"?item.to:"https://xbridge.tech/"}
                  className={activeTab == item?.to ? "active" : ""}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul> */}
        <ul>
          {navs.map((item) => (
            <li key={item.label}>
              {item.label === "Trade" ? (
                <div
                  className="dropdown-nav-item"
                  onMouseEnter={handerTradeDropDown}
                  onMouseLeave={handerTradeDropDown}
                >
                  <Link to="#">
                    <div className="dropdown-nav-value">
                      <p>Trade</p> <DropDownArrow />
                    </div>
                  </Link>
                  {showTradeDropDown && (
                    <div className="drop-down">
                      <p>
                        <NavLink to="/trade" onClick={handerTradeDropDown}>
                          Simple Trades
                        </NavLink>
                      </p>

                      { /* <p>
                        <NavLink to="/swap" onClick={handerTradeDropDown}>
                          Swap
                        </NavLink>
                      </p> */ }
                      
                      <p>
                        <NavLink
                          to="/cross-chain"
                          onClick={handerTradeDropDown}
                        >
                          Cross Chain
                        </NavLink>
                      </p>
                    </div>
                  )}
                </div>
              ) : item.label === "Earn" ? (
                <div
                  className="dropdown-nav-item"
                  onMouseEnter={handerEarnDropDown}
                  onMouseLeave={handerEarnDropDown}
                >
                  <Link to="#">
                    <div className="dropdown-nav-value">
                      <p>Earn</p> <DropDownArrow />
                    </div>
                  </Link>
                  {showEarnDropDown && (
                    <div className="drop-down">
                      <p>
                        <NavLink
                          to="/staking-pool"
                          onClick={handerEarnDropDown}
                        >
                          Staking
                        </NavLink>
                      </p>
                      <p>
                        <NavLink to="/farm" onClick={handerEarnDropDown}>
                          Farm
                        </NavLink>
                      </p>
                      {/* <p>
                        <NavLink to="/liquidity" onClick={handerEarnDropDown}>
                          Liquidity
                        </NavLink>
                      </p> */}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  onClick={() => {
                    props?.setRouteDetail(item?.to);
                    props?.handleActive();
                    setActiveTab(item?.to);
                  }}
                  target={item?.label !== "XBridge" ? "" : "_blank"}
                  to={
                    item?.label !== "XBridge"
                      ? item.to
                      : "https://xbridge.tech/"
                  }
                  className={activeTab === item?.to ? "active" : ""}
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}

          {/* {!(location.pathname === "/") ? ( */}
            {/* <li className="list-for-tradef">
              <div className="connect_btnf">
                <Link
                  className="app-buttonf"
                  to="/token/stc/0x19Ae49B9F38dD836317363839A5f6bfBFA7e319A"
                >
                  Trade History
                </Link>
              </div>
            </li> */}
          {/* ) : (
            ""
          )} */}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
