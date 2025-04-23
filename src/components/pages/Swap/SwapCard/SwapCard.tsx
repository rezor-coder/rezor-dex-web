import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DropUpswapIcon } from "../../../../assets/icons/svgicons";
import Button from "../../../common/Button/Button";
import SettingOverlay from "../../../common/SettingOverlay/SettingOverlay";
import ActiveTokenCard from "../../../common/TokenCard/ActiveTokenCard";
import SecondaryTokenCard from "../../../common/TokenCard/SecondaryTokenCard";
import "./SwapCard.scss";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useWalletConnect } from "../../../../CustomHook/useWalletConnect";
import {
  BALANCE_HOOK,
  DOLLAR_VAL,
  INPUTS,
  TOKEN_DETAILS,
} from "../../../../interfaces/common";
import { GET_AMOUNTS_DATA } from "../../../../interfaces/swap";
import {
  getAmountsInfunction,
  getAmountsOutfunction,
  getPriceImpact,
  useGetAmountsInterval,
} from "../../../../services/contractServices/contractCallServices";
import {
  convertUsingTokenDecimals,
  cryptoDecimals,
  toCustomFixed,
  validateInputField,
} from "../../../../utils/helpers";
import { TOKEN_DATA } from "../../../../interfaces/Liquidity";
import { store } from "../../../../app/store";
import useFetchTokenBalance from "../../../../CustomHook/useFetchTokenBalance";
// import { swapHelperFunction } from "../../../../services/SwapServices/SwapHelper";
import {
  setTokenOne,
  setTokenTwo,
} from "../../../../features/theme/token.slice";
import { TradeData } from "../../../../services/ApiServices/apiService";
import { setTransactionCounter } from "../../../../features/theme/user.slice";
import ConnectWallet from "../../../common/Header/ConnectWallet/ConnectWallet";
import useIsWrongNetwork from "../../../../CustomHook/useisWrongNetwork";

var oldTknVal = "";

const SwapCard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isWrongNetwork = useIsWrongNetwork();
  const { tokenOne, tokenTwo }: { tokenOne: TOKEN_DATA; tokenTwo: TOKEN_DATA } =
    useAppSelector((store: any) => store?.token);
  const {
    walletAddress,
    transactionCounter,
    slippage,
  }: { walletAddress: string; transactionCounter: boolean; slippage: number } =
    useAppSelector((store: any) => store?.user);
  const { walletProvider } = useWalletConnect();

  const [showMore, setShowMore] = useState<boolean>(false);
  const [priceImpact, setPriceImpact] = useState<string | undefined>("");
  const [rate, setRate] = useState<string>("");
  const [isSwitched, setIsSwitched] = useState<boolean>(false);
  const [shimmerState, setShimmerState] = useState<string>("");
  const [showConnectWallet, setConnectWallet] = useState<boolean>(false);
  const [selectedField, setselectedField] = useState<string>("");
  const [maxValueCheck, setmaxValueCheck] = useState<boolean>(false);
  const [tk1DollarValue, setTk1DollarValue] = useState<number | string>(0.0);
  const [tk2DollarValue, setTk2DollarValue] = useState<number | string>(0.0);
  const [sufficientLiquidityCheck, setSufficientLiquidityCheck] =
    useState<boolean>(false);
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


  
  const data: GET_AMOUNTS_DATA = {
    tokenOneAddress: tokenOne?.address,
    tokenTwoAddress: tokenTwo?.address,
    amountIn: (10 ** tokenOne?.decimals)?.toLocaleString("fullwide", {
      useGrouping: !1,
    }),
    dispatch,
    walletProvider,
  };

  useGetAmountsInterval(data, 10000);

  
  

  const toggleVisibility = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    if (transactionCounter) {
      getBackToOriginalState();
      dispatch(setTransactionCounter(false));
    }
  }, [transactionCounter]);

  useEffect(() => {
    if (
      selectedField == "TK1" &&
      !isSwitched &&
      inputOne?.convertedValue != "" &&
      walletAddress
    ) {
     
      const delayDebounce: NodeJS.Timeout = setTimeout(() => {
        handleGetAmountsData("TK1", inputOne?.convertedValue, false);
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [inputOne]);

  useEffect(() => {
    if (
      selectedField == "TK2" &&
      !isSwitched &&
      inputTwo?.convertedValue != "" &&
      walletAddress
    ) {
      const delayDebounce: NodeJS.Timeout = setTimeout(() => {
        handleGetAmountsData("TK2", inputTwo?.convertedValue, false);
      }, 500);
      return () => clearTimeout(delayDebounce);
    }
  }, [inputTwo]);

  useEffect(() => {
    getReservesFirstTime();
    if (!isSwitched) emptyValues();

    trade();
  }, [tokenOne, tokenTwo, walletAddress]);

  const trade = async () => {
    const newTknVal = `${tokenOne.symbol}${tokenTwo.symbol}`;
    if (oldTknVal == newTknVal) {
      return;
    } else {
      oldTknVal = newTknVal;
    }
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
  const { chainValues } = useAppSelector((state: any) => state?.user);
  const getReservesFirstTime = async () => {
    const data: GET_AMOUNTS_DATA = {
      tokenOneAddress: tokenOne?.address,
      tokenTwoAddress: tokenTwo?.address,
      amountIn: (10 ** tokenOne?.decimals)?.toLocaleString("fullwide", {
        useGrouping: !1,
      }),
      dispatch,
      walletProvider,
    };
    const reserveData: Array<string> = await getAmountsOutfunction(data);

    if (reserveData == undefined) {
      setRate("0");
    } else {
      setRate(
        cryptoDecimals(
          Number(reserveData[1]) / 10 ** tokenTwo?.decimals
        ).toString()
      );
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
  const emptyValues = () => {
    setinputTwo({
      convertedValue: "",
      inputValue: "",
      toolTipValue: "",
    });
    setinputOne({
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
      setIsSwitched(false);
      setinputOne({
        convertedValue: convertedValue,
        inputValue: originalValue,
        toolTipValue: convertedValue,
      });
    } else {
      setShimmerState("null");
      setPriceImpact("0");
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
      setIsSwitched(false);
      setinputTwo({
        convertedValue: convertedValue,
        inputValue: originalValue,
        toolTipValue: convertedValue,
      });
    } else {
      setShimmerState("null");
      setPriceImpact("0");
    }
  };

  const handleGetAmountsData = async (
    fieldCondition: string,
    amount: string,
    max: boolean
  ) => {
    const data: GET_AMOUNTS_DATA = {
      tokenOneAddress: tokenOne?.address,
      tokenTwoAddress: tokenTwo?.address,
      amountIn: amount,
      max: max,
      dispatch,
      walletProvider,
    };

    


    const tokenValue: string[2] | undefined =
      fieldCondition == "TK1"
        ? await getAmountsOutfunction(data)
        : await getAmountsInfunction(data);

    if (tokenValue == undefined || (tokenValue[0] && tokenValue[1] == "0")) {
      setSufficientLiquidityCheck(true);
      setShimmerState("null");
      setPriceImpact("0");
    } else {
      setSufficientLiquidityCheck(false);

      const calculatedBalance: string = await convertUsingTokenDecimals(
        fieldCondition == "TK1" ? tokenTwo : tokenOne,
        fieldCondition == "TK1" ? tokenValue[1] : tokenValue[0]
      );
      if (Number(calculatedBalance)) {
        const res: string = await getPriceImpact(
          fieldCondition == "TK1" ? tokenValue[1] : tokenValue[0],
          tokenOne?.address,
          tokenTwo?.address,
          dispatch,
          walletProvider
        );
        setPriceImpact(cryptoDecimals(res));
        fieldCondition == "TK1"
          ? setinputTwo({
              convertedValue: tokenValue[1],
              inputValue: toCustomFixed(calculatedBalance, 4),
              toolTipValue: calculatedBalance,
            })
          : setinputOne({
              convertedValue: tokenValue[0],
              inputValue: toCustomFixed(calculatedBalance, 4),
              toolTipValue: calculatedBalance,
            });
        setShimmerState("null");
      }
    }
  };

  const handleMaximumFunction = async (data: string) => {
    setmaxValueCheck(true);
    if (data == "TK1" && tokenBalance?.token1BalanceConverted > 0) {
      if (tokenDetails?.isTokenOneNative) {
        const newBalance: number =
          tokenBalance?.token1BalanceConverted - 10000000000000000; // deduct 0.001 as gas fees for native currency
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

  const getBackToOriginalState = async () => {
    emptyValues();
    await fetchData();
  };
  const handleSwitchTokens = async () => {
    dispatch(setTokenOne(tokenTwo));
    dispatch(setTokenTwo(tokenOne));
    if (inputTwo?.convertedValue) {
      setIsSwitched(true);
      setShimmerState("Tk2");

      setinputOne({
        convertedValue: inputTwo?.convertedValue,
        inputValue: inputTwo?.inputValue,
        toolTipValue: (
          Number(inputTwo?.convertedValue) /
          10 ** tokenTwo?.decimals
        ).toString(),
      });

      const data: GET_AMOUNTS_DATA = {
        tokenOneAddress: tokenTwo?.address,
        tokenTwoAddress: tokenOne?.address,
        amountIn: (
          Number(inputTwo?.inputValue) *
          10 ** tokenTwo?.decimals
        )?.toLocaleString("fullwide", {
          useGrouping: !1,
        }),
        dispatch,
        walletProvider,
      };
      const tokenTwoValue: string[2] | undefined  = await getAmountsOutfunction(
        data
      );
      if (tokenTwoValue == undefined) {
        setSufficientLiquidityCheck(true);
        setShimmerState("null");
      } else {
        const calculatedBalance: string = await convertUsingTokenDecimals(
          tokenOne,
          tokenTwoValue[1]
        );
        const response: string = await getPriceImpact(
          tokenTwoValue[1],
          tokenTwo?.address,
          tokenOne?.address,
          dispatch,
          walletProvider
        );
        setPriceImpact(cryptoDecimals(response));
        if (Number(calculatedBalance)) {
          setinputTwo({
            convertedValue: tokenTwoValue[1],
            inputValue: toCustomFixed(calculatedBalance, 4),
            toolTipValue: calculatedBalance,
          });
          setShimmerState("null");
          setSufficientLiquidityCheck(false);
        }
      }
    } else {
      setShimmerState("null");
    }
  };
  /**
   * variable that will store boolean value whether the input fields are empty or not
   */
  /**
   * variable that will store boolean value whether inputs are greater than balances or not
   */
  const insufficientBalance =
    Number(tokenBalance?.token1BalanceConverted) <
    Number(inputOne?.convertedValue);

  return (
    <>
      <div className="addCardBox">
        <div className="addCard">
          <div className="addCard_heading">
            <h3 className="titleHeading">Swap</h3>
            <SettingOverlay />
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
            <Button className="swapBtn" onClick={() => handleSwitchTokens()}>
              <DropUpswapIcon />
            </Button>
            <SecondaryTokenCard
              field="Field2"
              balance={tokenBalance}
              input={handleInputTwo}
              value={inputTwo}
              dollarVal={tk2DollarValue}
              shimmer={shimmerState}
              key=""
            />
          </div>
          <div className="showBtn">
            <button onClick={toggleVisibility}>
              {!showMore ? "Show More" : "Show Less"}
            </button>
          </div>
          <ul className="addCard_valuesList">
            <li>
              <label>Price impact</label>
              <p>~{priceImpact || "0"}%</p>
            </li>

            <li>
              <label>Rate:</label>
              <p>
                1 {tokenOne?.name} = {rate} {tokenTwo?.name}
              </p>
            </li>
            <AnimatePresence mode="sync">
              {showMore && (
                <>
                  <motion.li
                    initial={{ x: 100, opacity: 0 }}
                    exit={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{
                      delay: 0.1,
                    }}
                  ></motion.li>
                  <motion.li
                    animate={{ x: 0, opacity: 1 }}
                    initial={{ x: 100, opacity: 0 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{
                      delay: 0.2,
                    }}
                  >
                    <label>slippage</label>
                    <p>{slippage}%</p>
                  </motion.li>
                  <motion.li
                    exit={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    initial={{ x: 100, opacity: 0 }}
                    transition={{
                      delay: 0.3,
                    }}
                  >
                    <label>Order routing</label>
                    <p>Rezorswap</p>
                  </motion.li>
                </>
              )}
            </AnimatePresence>
          </ul>
          <div className="addCard_footer">
            <Button
              fluid
              className={`btnapprove mb-3 ${
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
              onClick={() => {
                if (!walletAddress) {
                  setConnectWallet(true);
                } else {
                  navigate("review-swap", {
                    state: {
                      tokenDetails,
                      selectedField,
                      inputOne,
                      inputTwo,
                      tk1DollarValue,
                      tk2DollarValue,
                    },
                  });
                }
              }}
              disabled={
                !walletAddress
                  ? false
                  : isWrongNetwork ||
                    insufficientBalance ||
                    sufficientLiquidityCheck ||
                    Number(inputOne?.inputValue) == 0 ||
                    Number(inputTwo?.inputValue) == 0
              }
            >
              {!walletAddress
                ? "Connect Wallet"
                : insufficientBalance
                ? `Insufficient ${tokenOne?.symbol}`
                : sufficientLiquidityCheck
                ? "Insufficient Liquidity"
                : // : chainValues.label === "SBC"
                  // ? "Trade will be Live Soon!"
                  "Approve and Swap"}
            </Button>
          </div>
        </div>
      </div>
      <ConnectWallet
        show={showConnectWallet}
        handleClose={() => setConnectWallet(false)}
      />
    </>
  );
};

export default SwapCard;
