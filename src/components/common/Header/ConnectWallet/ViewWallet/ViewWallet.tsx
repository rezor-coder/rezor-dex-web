import { Tab, Tabs } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../../app/hooks";
import Button from "../../../Button/Button";
import {
  ATMCardIcon,
  CloseIcon,
  LogoutIcon,
  SettingSecIcon,
} from "../../../../../assets/icons/svgicons";
import accountIcon from "../../../../../assets/icons/accountIcon.svg";
import metamask from "../../../../../assets/icons/metamask.svg";
import "./ViewWallet.scss";
import TabListdata from "./TabListdata";
import { useWalletConnect } from "../../../../../CustomHook/useWalletConnect";
import { resetTokenSlice } from "../../../../../features/theme/token.slice";
import { resetUserSlice } from "../../../../../features/theme/user.slice";
import { customizeAddress } from "../../../../../utils/helpers";

const ViewWallet = ({ logoutOnCick, justClose, address }: any) => {
  const { theme } = useAppSelector((state) => state.theme);
  const dispatch = useAppDispatch();
  const { disconnect } = useWalletConnect();
  const handleDisconnect = async () => {
    await disconnect();
    dispatch(resetTokenSlice());
    dispatch(resetUserSlice());
  };
  return (
    <>
      <section className="viewWallet">
        <button className="croseBtn" onClick={() => justClose()}>
          <CloseIcon />
        </button>
        <div className="viewWallet_tophead">
          <div className="viewWallet_tophead_connectIcon">
            <img src={accountIcon} alt="accountIcon" />
            <span className="walletIcon">
              <img src={metamask} alt="wallet" />
            </span>
            <h6>{customizeAddress(address)}</h6>
          </div>
          <div className="viewWallet_tophead_rightBtn">
            <Button
              className="without_bg_border btnlogout"
              onClick={logoutOnCick}
            >
              <LogoutIcon />
              <span
                className="d-flex align-items-center"
                onClick={() => handleDisconnect()}
              >
                <LogoutIcon /> Disconnect
              </span>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ViewWallet;
