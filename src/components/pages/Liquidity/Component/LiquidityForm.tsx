import { useNavigate } from "react-router-dom";
import { BackArrowIcon, PlusIcon } from "../../../../assets/icons/svgicons";
import Button from "../../../common/Button/Button";
import ActiveTokenCard from "../../../common/TokenCard/ActiveTokenCard";
import SecondaryTokenCard from "../../../common/TokenCard/SecondaryTokenCard";
import "./Index.scss";
import RezormaWhite from "../../../../assets/icons/RezormaWhite.svg";
import { useEffect, useMemo, useState } from "react";
import { store } from "../../../../app/store";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import useFetchTokenBalance from "../../../../CustomHook/useFetchTokenBalance";
import {
  convertUsingTokenDecimals,
  cryptoDecimals,
  toCustomFixed,
  toFixer,
  validateInputField,
} from "../../../../utils/helpers";
import { useWalletConnect } from "../../../../CustomHook/useWalletConnect";
import {
  addLiquidityHelperFunction,
  getReservesHelper,
} from "../../../../services/LiquidityServices/AddLiquidityHelper";
import {
  fetchShareOfUser,
  getTotalSupplyOfLp,
} from "../../../../services/contractServices/contractCallServices";
import {
  GET_RESERVES,
  SHARE_RESP,
  TOKEN_DATA,
  TOTAL_LP_RESP,
} from "../../../../interfaces/Liquidity";
import { zeroAddress } from "../../../../utils/constants";
import {
  BALANCE_HOOK,
  DOLLAR_VAL,
  INPUTS,
  LP_TO_RECEIVE,
  MODAL_STATE,
  TOKEN_DETAILS,
} from "../../../../interfaces/common";
import { TradeData } from "../../../../services/ApiServices/apiService";
import TxnModal from "../../../common/Modals/TxnModal/TxnModal";
import ConnectWallet from "../../../common/Header/ConnectWallet/ConnectWallet";
import useIsWrongNetwork from "../../../../CustomHook/useisWrongNetwork";
import { fetchLatestLpData } from "../../../../services/LiquidityServices/RemoveLiquidityHelper";

const LiquidityForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { walletProvider } = useWalletConnect();
  const isWrongNetwork = useIsWrongNetwork();
  const { tokenOne, tokenTwo }: { tokenOne: TOKEN_DATA; tokenTwo: TOKEN_DATA } =
    useAppSelector((store: any) => store?.token);
  const {
    walletAddress,
    importedLp,
  }: { walletAddress: string; importedLp: any } = useAppSelector(
    (store: any) => store?.user
  );

  const [show, setShow] = useState<boolean>(false);
  const [lpTokens, setLpTokens] = useState<string>("0");
  const [totalShare, setTotalShare] = useState<string>("");
  const [shimmerState, setShimmerState] = useState<string>("");
  const [selectedField, setselectedField] = useState<string>("");
  const [showConnectWallet, setConnectWallet] = useState<boolean>(false);
  const [tk2DollarValue, setTk2DollarValue] = useState<number | string>(0.0);
  const [tk1DollarValue, setTk1DollarValue] = useState<number | string>(0.0);
  const [sufficientLiquidityCheck, setSufficientLiquidityCheck] =
    useState<boolean>(false);
  const [modalData, setModalData] = useState<MODAL_STATE>({
    status: "",
    bodyText: "",
    title: "",
    txHash: "",
  });
  const [receivableTokensFromLp, setReceivableTokensFromLp] =
    useState<LP_TO_RECEIVE>({
      token1: "",
      token2: "",
    });
  const [inputOne, setinputOne] = useState<INPUTS>({
    inputValue: "",
    convertedValue: "",
    toolTipValue: "",
  });
  const [inputTwo, setinputTwo] = useState<INPUTS>({
    inputValue: "",
    convertedValue: "",
    toolTipValue: "",
  });

  useEffect(() => {
    if (selectedField == "TK1" && walletAddress) {
      const delayDebounce: NodeJS.Timeout = setTimeout(() => {
        handleGetAmountsData("TK1", inputOne?.convertedValue, 0, false);
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [inputOne]);

  useEffect(() => {
    if (selectedField == "TK2" && walletAddress) {
      const delayDebounce: NodeJS.Timeout = setTimeout(() => {
        handleGetAmountsData("TK2", 0, inputTwo?.convertedValue, false);
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [inputTwo]);

  useEffect(() => {
    fetchLPInfo();
    emptyValues();
    if (walletAddress) {
      trade();
    }
  }, [tokenOne, tokenTwo, walletAddress]);

  const handleGetAmountsData = async (
    fieldCondition: string,
    amountOne: string | number,
    amountTwo: string | number,
    max: boolean
  ) => {
    const data: GET_RESERVES = {
      tokenOneAddress: tokenOne?.address,
      tokenTwoAddress: tokenTwo?.address,
      input1: amountOne,
      input2: amountTwo,
      selectedField: fieldCondition,
      max: max,
      dispatch,
      walletProvider,
    };
    const reserveData: any = await getReservesHelper(data);
    if (reserveData == undefined) {
      setSufficientLiquidityCheck(true);
      setShimmerState("null");
    } else if (reserveData == "firstLiquidity") {
      setShimmerState("null");
    } else {
      setSufficientLiquidityCheck(false);
      const calculatedBalance: string = await convertUsingTokenDecimals(
        fieldCondition == "TK1" ? tokenTwo : tokenOne,
        reserveData
      );
      if (Number(calculatedBalance)) {
        fieldCondition == "TK1"
          ? setinputTwo({
              convertedValue: reserveData,
              inputValue: toCustomFixed(calculatedBalance, 4),
              toolTipValue: calculatedBalance,
            })
          : setinputOne({
              convertedValue: reserveData,
              inputValue: toCustomFixed(calculatedBalance, 4),
              toolTipValue: calculatedBalance,
            });
        setShimmerState("null");
      }
    }
  };

  const trade = async () => {
    let getDollarPriceValue: DOLLAR_VAL = await TradeData(
      tokenOne.symbol,
      tokenTwo.symbol
    );

    if (
      !getDollarPriceValue?.token0 ||
      getDollarPriceValue?.token0 === "This token is not Listed on CMC."
    ) {
      setTk1DollarValue(0.0);
    } else {
      setTk1DollarValue(getDollarPriceValue?.token0);
    }

    if (
      !getDollarPriceValue?.token1 ||
      getDollarPriceValue?.token1 === "This token is not Listed on CMC."
    ) {
      setTk2DollarValue(0.0);
    } else {
      setTk2DollarValue(getDollarPriceValue?.token1);
    }
  };

  const fetchLPInfo = async () => {
    const { totalSupply, pairAddress }: TOTAL_LP_RESP =
      await getTotalSupplyOfLp({
        tokenOneAddress: tokenOne?.address,
        tokenTwoAddress: tokenTwo?.address,
        dispatch,
        walletProvider,
      });
    if (pairAddress !== zeroAddress) {
      const { share, tokenBReceive, tokenAReceive, userLpBalance }: SHARE_RESP =
        await fetchShareOfUser(
          pairAddress,
          tokenOne?.address,
          tokenTwo?.address,
          dispatch,
          totalSupply,
          tokenOne?.decimals,
          tokenTwo?.decimals,
          walletProvider
        );
      setReceivableTokensFromLp({
        token1: tokenAReceive,
        token2: tokenBReceive,
      });
      setLpTokens(userLpBalance);
      setTotalShare(share);
    } else {
      setTotalShare("0");
      setLpTokens("0");
      setReceivableTokensFromLp({
        token1: "0",
        token2: "0",
      });
    }
  };

  const tokenDetails: TOKEN_DETAILS = useMemo(() => {
    const list: TOKEN_DATA[] = store.getState()?.token?.tokenList;
    return {
      tokenOneAddress: tokenOne?.address,
      tokenTwoAddress: tokenTwo?.address,
      tokenOneData: tokenOne,
      tokenTwoData: tokenTwo,
      isTokenOneNative: list[0]?.address == tokenOne?.address ? true : false,
      isTokenTwoNative: list[0]?.address == tokenTwo?.address ? true : false,
    };
  }, [tokenOne, tokenTwo]);

  const { tokenBalance, fetchData }: BALANCE_HOOK = useFetchTokenBalance({
    dispatch,
    tokenDetails,
  });

  const emptyValues = async () => {
    setinputOne({
      convertedValue: "",
      inputValue: "",
      toolTipValue: "",
    });
    setinputTwo({
      convertedValue: "",
      inputValue: "",
      toolTipValue: "",
    });
  };

  const handleInputOne = async (e: string, max: boolean, field: string) => {
    if (walletAddress) {
      setShimmerState("Tk2");
    }
    const response: boolean | string = await validateInputField(
      e,
      tokenOne?.decimals,
      max,
      emptyValues
    );
    if (response) {
      setselectedField(field);
      let convertedValue: string = (
        max ? response : Number(response) * 10 ** tokenOne?.decimals
      ).toLocaleString("fullwide", {
        useGrouping: !1,
      });

      let originalValue: string = (
        max
          ? cryptoDecimals(Number(response) / 10 ** tokenOne?.decimals)
          : response
      ).toLocaleString("fullwide", {
        useGrouping: !1,
      });
      setinputOne({
        convertedValue: convertedValue,
        inputValue: originalValue,
        toolTipValue: convertedValue,
      });
    } else {
      setShimmerState("null");
    }
  };

  const handleInputTwo = async (e: string, max: boolean, field: string) => {
    if (walletAddress) {
      setShimmerState("Tk1");
    }
    const response: boolean | string = await validateInputField(
      e,
      tokenTwo?.decimals,
      max,
      emptyValues
    );
    if (response) {
      setselectedField(field);
      let convertedValue: string = (
        max ? response : Number(response) * 10 ** tokenTwo?.decimals
      ).toLocaleString("fullwide", {
        useGrouping: !1,
      });

      let originalValue: string = (
        max
          ? cryptoDecimals(Number(response) / 10 ** tokenTwo?.decimals)
          : response
      ).toLocaleString("fullwide", {
        useGrouping: !1,
      });
      setinputTwo({
        convertedValue: convertedValue,
        inputValue: originalValue,
        toolTipValue: convertedValue,
      });
    } else {
      setShimmerState("null");
    }
  };
  const handleMaximumFunction = async (data: string) => {
    if (data === "TK1" && tokenBalance?.token1BalanceConverted > 0) {
      if (tokenDetails?.isTokenOneNative) {
        const newBalance: number =
          tokenBalance?.token1BalanceConverted - 10000000000000000; // deduct 0.001 as gas fees for natve currency
        handleInputOne(
          newBalance > 0 ? newBalance.toString() : "0",
          true,
          data
        );
      } else {
        handleInputOne(
          tokenBalance?.token1BalanceConverted.toString(),
          true,
          data
        );
      }
    } else if (data === "TK2" && tokenBalance?.token2BalanceConverted > 0) {
      if (tokenDetails?.isTokenTwoNative) {
        const newBalance: number =
          tokenBalance?.token2BalanceConverted - 10000000000000000; // deduct 0.001 as gas fees for natve currency
        handleInputTwo(
          newBalance > 0 ? newBalance.toString() : "0",
          true,
          data
        );
      } else {
        handleInputTwo(
          tokenBalance?.token2BalanceConverted.toString(),
          true,
          data
        );
      }
    }
  };

  const handleAddLiquidity = async () => {
    setModalData({
      title: "Add Liquidity",
      bodyText: `Please confirm transaction to add liquidity for ${tokenDetails?.tokenOneData?.symbol} - ${tokenDetails?.tokenTwoData?.symbol}`,
      status: "in-progress",
      txHash: null,
    });
    const liquidityResult = await addLiquidityHelperFunction(
      dispatch,
      tokenDetails,
      inputOne,
      inputTwo,
      walletProvider,
      setModalData
    );
    if (liquidityResult) {
      await fetchData();
      await emptyValues();
      await fetchLPInfo();
      await fetchLatestLpData(dispatch, importedLp, walletProvider);
    }
  };

  const insufficientBalance =
    Number(tokenBalance?.token1BalanceConverted) <
      Number(inputOne?.convertedValue) ||
    Number(tokenBalance?.token2BalanceConverted) <
      Number(inputTwo?.convertedValue);
  return (
    <>
      <div className="addCardBox">
        <div className="addCard">
          <div className="addCard_heading">
            <h3 className="titleHeading">
              <Button
                className="backBtn without_bg_border"
                onClick={() => navigate(`/liquidity`)}
              >
                <BackArrowIcon />
              </Button>{" "}
              Add Liquidity
            </h3>
          </div>
          <div className="addCard_tokenvalues">
            <ActiveTokenCard
              field="Field1"
              balance={tokenBalance}
              input={handleInputOne}
              value={inputOne}
              maxFunction={handleMaximumFunction}
              dollarVal={tk1DollarValue}
              shimmer={shimmerState}
            />
            <Button className="plusBtn">
              <PlusIcon />
            </Button>
            <SecondaryTokenCard
              field="Field2"
              balance={tokenBalance}
              input={handleInputTwo}
              value={inputTwo}
              maxFunction={handleMaximumFunction}
              dollarVal={tk2DollarValue}
              shimmer={shimmerState}
              key=""
            />
          </div>
          <div className="tokenInfo">
            <h6>Prices and Pool Share</h6>
            <ul className="shareList">
              <li>
                <h5>
                  {cryptoDecimals(
                    Number(inputTwo?.inputValue) /
                      Number(inputOne?.inputValue) || 0
                  ) || "0.00"}
                </h5>
                <p>
                  {tokenTwo?.name} per {tokenOne?.name}
                </p>
              </li>
              <li>
                <h5>
                  {cryptoDecimals(
                    Number(inputOne?.inputValue) /
                      Number(inputTwo?.inputValue) || 0
                  ) || "0.00"}
                </h5>
                <p>
                  {tokenOne?.name} per {tokenTwo?.name}
                </p>
              </li>
              <li>
                <h5>{cryptoDecimals(totalShare) || "0.00"} %</h5>
                <p>Share of Pool</p>
              </li>
            </ul>
          </div>
          <div className="tokenInfo">
            <h6>LP tokens in your wallet</h6>
            <ul className="tokenList">
              <li>
                <label>
                  {tokenOne?.symbol}/{tokenTwo?.symbol}
                </label>
                <p>{toFixer(Number(lpTokens) / 10 ** 18) || 0}</p>
              </li>
              <li>
                <label>{tokenOne?.symbol}</label>
                <p>{cryptoDecimals(receivableTokensFromLp?.token1 || 0)}</p>
              </li>
              <li>
                <label>{tokenTwo?.symbol}</label>
                <p>{cryptoDecimals(receivableTokensFromLp?.token2 || 0)}</p>
              </li>
            </ul>
          </div>
          <Button
            className={`btnSize  ${
              !walletAddress
                ? "fluid"
                : isWrongNetwork ||
                  insufficientBalance ||
                  sufficientLiquidityCheck ||
                  Number(inputOne?.convertedValue) == 0 ||
                  Number(inputTwo?.convertedValue) == 0
                ? "grayBorder"
                : "fluid"
            }`}
            fluid
            text={
              !walletAddress
                ? "Connect Wallet"
                : insufficientBalance
                ? `${
                    Number(tokenBalance?.token1BalanceConverted) <
                    Number(inputOne?.convertedValue)
                      ? `insufficient ${tokenOne?.symbol}`
                      : `insufficient ${tokenTwo?.symbol}`
                  }`
                : sufficientLiquidityCheck
                ? "Insufficient Liquidity"
                : "Supply"
            }
            disabled={
              !walletAddress
                ? false
                : isWrongNetwork ||
                  insufficientBalance ||
                  sufficientLiquidityCheck ||
                  Number(inputOne?.convertedValue) == 0 ||
                  Number(inputTwo?.convertedValue) == 0
            }
            onClick={() => {
              if (!walletAddress) {
                setConnectWallet(true);
              } else {
                handleAddLiquidity();
                setShow(true);
              }
            }}
          />
        </div>
      </div>
      {show ? (
        <TxnModal
          show={show}
          handleClose={() => setShow(false)}
          data={modalData}
        />
      ) : null}
      <ConnectWallet
        show={showConnectWallet}
        handleClose={() => setConnectWallet(false)}
      />
    </>
  );
};

export default LiquidityForm;
