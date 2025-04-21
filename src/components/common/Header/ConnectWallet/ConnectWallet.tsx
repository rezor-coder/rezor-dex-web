import { Offcanvas } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import {
  CloseIcon,
  GoogleIcon,
  WalletIcon,
} from "../../../../assets/icons/svgicons";
import Button from "../../Button/Button";
import "./ConnectWallet.scss";
import { useState } from "react";
import { setWalletAddress } from "../../../../features/theme/user.slice";
import { useWalletConnect } from "../../../../CustomHook/useWalletConnect";
import ViewWallet from "./ViewWallet/ViewWallet";

type propTypes = {
  show?: boolean;
  handleClose: () => void;
};

const ConnectWallet = (props: propTypes) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const dispatch = useAppDispatch();

  const { address, disconnect, open } = useWalletConnect();

  const handleWalletConnect = async () => {
    if (address) {
      disconnect();
    } else {
      await open();
      handleClose();
    }
  };
  const { theme } = useAppSelector((state) => state.theme);
  return (
    <>
      <Offcanvas
        className={"connect_wallet"}
        show={props.show}
        placement="end"
        onHide={props.handleClose}
      >
        {!address ? (
          <>
            <div className="action_btn">
              <button className="croseBtn" onClick={() => props?.handleClose()}>
                <CloseIcon />
              </button>
              <WalletIcon />
              <Button
                fluid
                onClick={() => {
                  props?.handleClose();
                  handleWalletConnect();
                }}
              >
                Connect Wallet
              </Button>
            </div>
            <p className="or_line">
            </p>
            <p className="footer_txt">
              You consent to the Terms of Service and Privacy Policy of
              RezorSwap by connecting a wallet. <br />
              (Latest revision: 6.7.23)
            </p>
          </>
        ) : (
          <>
            <ViewWallet
              logoutOnCick={() => {
                props?.handleClose();
                handleWalletConnect();
              }}
              justClose={props?.handleClose}
              address={address}
            />
          </>
        )}
      </Offcanvas>
    </>
  );
};

export default ConnectWallet;
