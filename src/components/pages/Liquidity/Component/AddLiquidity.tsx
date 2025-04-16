import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusIcon } from "../../../../assets/icons/svgicons";
import { ROUTES, zeroAddress } from "../../../../utils/constants";
import Button from "../../../common/Button/Button";
import CommonModal from "../../../common/Modals/CommonModal/CommonModal";
import RemoveLiquidity from "../../../common/RemoveLiquidity/RemoveLiquidity";
import SettingOverlay from "../../../common/SettingOverlay/SettingOverlay";
import TokenselectModal from "../../../common/TokenselectModal/TokenselectModal";
import "./Index.scss";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { LP_DATA, TOKEN_DATA } from "../../../../interfaces/Liquidity";
import {
  cryptoDecimals,
  divideBigNumber,
} from "../../../../utils/helpers";
import {
  fetchShareOfUser,
  getTokensFromPair,
  getTotalSupplyOfLp,
} from "../../../../services/contractServices/contractCallServices";
import { useWalletConnect } from "../../../../CustomHook/useWalletConnect";
import { setImportedLps } from "../../../../features/theme/user.slice";
import { toast } from "../../../common/Toasts/Toast";
import TokensModal from "../../../common/Modals/TokensModal/TokensModal";

const AddLiquidity = () => {
  const {
    tokenOne,
    tokenTwo,
    tokenList,
  }: { tokenOne: TOKEN_DATA; tokenTwo: TOKEN_DATA; tokenList: TOKEN_DATA[] } =
    useAppSelector((store: any) => store?.token);
  const { importedLp, walletAddress } = useAppSelector(
    (state: any) => state?.user
  );
  const [lpInfo, setlpInfo] = useState<LP_DATA>({
    tokenBReceive: "",
    tokenAReceive: "",
    userLpBalance: "",
  });
  const [showToken, setShowToken] = useState<any>({ show: false, data: {} });
  const [importButtonDisabled, setImportButtonDisabled] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { walletProvider } = useWalletConnect();
  const handleImportTokens = async () => {
    if (tokenOne && tokenTwo) {
      setImportButtonDisabled(true);
      setTimeout(() => setImportButtonDisabled(false), 5000);
      const { totalSupply, pairAddress } = await getTotalSupplyOfLp({
        tokenOneAddress: tokenOne?.address,
        tokenTwoAddress: tokenTwo?.address,
        dispatch,
        walletProvider,
      });
      if (pairAddress !== zeroAddress) {
        if (
          importedLp?.some((obj: any) => obj.pair == pairAddress.toLowerCase())
        ) {
          toast.info("Pool already imported!");
          return;
        } else {
          const { tokenA, tokenB } = await getTokensFromPair(
            pairAddress,
            dispatch,
            walletProvider
          );

          const { share, tokenBReceive, tokenAReceive, userLpBalance } =
            await fetchShareOfUser(
              pairAddress,
              tokenA,
              tokenB,
              dispatch,
              totalSupply,
              tokenA.toLowerCase() == tokenOne?.address.toLowerCase()
                ? tokenOne?.decimals
                : tokenTwo?.decimals,
              tokenB.toLowerCase() == tokenOne?.address.toLowerCase()
                ? tokenOne?.decimals
                : tokenTwo?.decimals,
              walletProvider
            );
          const tokenAInfo = tokenList?.find(
            (elem) => elem?.address.toLowerCase() == tokenA.toLowerCase()
          );
          const tokenBInfo = tokenList?.find(
            (elem) => elem?.address.toLowerCase() == tokenB.toLowerCase()
          );

          const lpdata = {
            pair: pairAddress.toLowerCase(),
            token0: tokenA,
            token1: tokenB,
            share,
            tokenBReceive,
            tokenAReceive,
            userLpBalance,
            tokenAInfo,
            tokenBInfo,
          };

          dispatch(setImportedLps([...importedLp, lpdata]));
          setShow(false);
        }
      } else {
        toast.error("No Pool Found");
      }
    }
  };

  return (
    <>
      <div className="liquidityAdd">
        <div className="addCardBox">
          <div className="addCard">
            <div className="addCard_heading">
              <h3 className="titleHeading">Liquidity</h3>
              <SettingOverlay />
            </div>
            <div className="addLiquidity">
              <div className="activeliauidity">
                <h6>Add Liquidity To Receive LP Tokens</h6>
                <Button
                  className="addBtn whiteBorder"
                  onClick={() => navigate(`/liquidity/liquidity-form`)}
                >
                  Add Liquidity
                </Button>
                <Button
                  className="mt-3 addBtn whiteBorder"
                  onClick={() => setShow(true)}
                >
                  Remove Liquidity
                </Button>
                <RemoveLiquidity
                  show={showToken}
                  handleClose={() => setShowToken({ show: false, data: {} })}
                />
              </div>
              {importedLp?.length > 0
                ? importedLp?.map((item: any, key: number) => (
                    <div className="yourLiquidity">
                      <h6 className="yourLiquidityHeading">
                        <span>Your Liquidity</span>
                        <button
                          onClick={() => {
                            setShowToken({ show: true, data: item });
                          }}
                        >
                          Remove LP
                        </button>
                      </h6>

                      {/*  */}
                      <div className="tokens_in_wallet">
                        <div className="token_num">
                          <ul>
                            <li>
                              <p>
                                <span>
                                  <img src={item?.tokenAInfo?.icon} alt="eth" />
                                  <img
                                    src={item?.tokenBInfo?.icon}
                                    alt="bitcoin"
                                  />
                                </span>
                                {`${item?.tokenAInfo?.symbol} /
                                  ${item?.tokenBInfo?.symbol}`}
                              </p>
                              <h6>
                                {divideBigNumber(item?.userLpBalance, 18) || 0}
                              </h6>
                            </li>
                          </ul>
                        </div>
                        <ul>
                          <li>
                            <p>{item?.tokenAInfo?.symbol}</p>
                            <h6>{cryptoDecimals(item?.tokenAReceive || 0)}</h6>
                          </li>
                          <li>
                            <p>{item?.tokenBInfo?.symbol}</p>
                            <h6>{cryptoDecimals(item?.tokenBReceive || 0)}</h6>
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
        <CommonModal
          show={show}
          handleClose={() => setShow(false)}
          className="remove_liquidity_select_token"
          heading="Select Tokens"
        >
          <div className="remove_liquidity_select_token_input">
            <TokensModal field="Field1" />
          </div>
          <button className="plusBtn">
            <PlusIcon />
          </button>
          <div className="remove_liquidity_select_token_input">
            <TokensModal field="Field2" tokenActive />
          </div>
          <p className="select_text">Select a token to find your liquidity.</p>
          {/* <Button
            fluid
            onClick={() => {
              handleImportTokens();
            }}
            disabled={!walletAddress}
          >
            Import
          </Button> */}
          <Button
            fluid
            onClick={handleImportTokens}
            disabled={!walletAddress || importButtonDisabled}
          >
            Import
          </Button>
        </CommonModal>
      </div>
    </>
  );
};

export default AddLiquidity;
