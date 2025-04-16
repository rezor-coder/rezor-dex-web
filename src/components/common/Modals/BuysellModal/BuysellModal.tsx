import { Nav, Tab } from "react-bootstrap";
import CommonModal from "../CommonModal/CommonModal";
import "./BuysellModal.scss";
import Input from "../../Input/Input";
import Button from "../../Button/Button";
import {
  MarketServices,
  USDTADDRESS,
  USDTDECIMALS,
} from "../../../../services/MarketService/marketService";
import { toast } from "../../Toasts/Toast";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import { useState, useEffect } from "react";
import { useWalletConnect } from "../../../../CustomHook/useWalletConnect";
import {
  buyMinimumAmount,
  feeForSpot,
  feePerSwap,
  buyFeePrice,
} from "../../../../utils/constants";

type TProps = {
  show?: boolean;
  handleClose?: () => void;
  data?: {
    symbol?: string;
  };
};

const BuysellModal = ({ show, currencyType, handleClose }: any) => {
  const { walletProvider } = useWalletConnect();
  const isNetworkselected = localStorage.getItem("CURRENT NETWORK");
  const {
    walletAddress,
    transactionCounter,
    slippage,
  }: { walletAddress: string; transactionCounter: boolean; slippage: number } =
    useAppSelector((store: any) => store?.user);
  const dispatch = useAppDispatch();
  const [inputAmount, setInputAmount] = useState<string | number>();
  const [tradeType, setTradeType] = useState<string>("Buy");
  const [chainData, setChainData] = useState<any>();
  const [show1, setShow1] = useState<boolean>(walletAddress ? false : true);
  const [feeData, setFeeData] = useState<any>({});
  const [loader, setLoader] = useState<boolean>(true);
  const [transactionMsg, settransactionMsg] = useState<boolean>(true);
  const [transactionData, settransactionData] = useState<any>({});
  const [showNetworkModal, setShowNetworkModal] = useState<boolean>(false);
  const [isloading, setLoading] = useState<boolean>();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const decimalPattern = /^\d{0,150}(\.\d{0,18})?$/;
    if (decimalPattern.test(value)) {
      setInputAmount(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      (show && isNetworkselected === "BSC TESTNET") ||
      isNetworkselected === "BSC"
    ) {
      toast.error(
        "Please Change Network BSC to ETH Trade is Not Work With BSC Network"
      );
      setShowNetworkModal(true);
    } else {
      if (inputAmount) {
        checkswap(tradeType || e.currentTarget.id || e.currentTarget.title);
      }
    }
  };

  // Call CheckSwap Service
  const checkswap = async (type: string) => {
    try {
      setLoading(true);
      let currency =
        type == "Buy"
          ? currencyType?.receivingCurrency
          : currencyType?.receivableCurrency;
      const data = {
        symbol: currencyType?.symbol,
        period: "1min",
        currencyW: "usdt" || currency, // here add static usdt coin
        amount: inputAmount,
        type: type,
        feePerSwap: Number(feePerSwap),
      };
      let checkswapRes: any = await MarketServices.checkSwapService(data);
      if (checkswapRes.data.sufficientBalance) {
        await checkallowence(
          type == "Buy"
            ? currencyType?.receivableCurrency
            : currencyType?.receivingCurrency,
          type == "Sell"
            ? currencyType?.receivableCurrency
            : currencyType?.receivingCurrency,
          type,
          chainData?.chain
        );
      } else {
        toast.error(checkswapRes.data.message);
      }
    } catch (error) {
      console.log("err", error);
    } finally {
      setLoading(false);
    }
  };
  // Call Chain Service
  const getChain = async (currency: any) => {
    let chainRes: any = await MarketServices.fetchChainService({
      currency: currency,
      baseChain: "ETH",
    });
    if (!chainRes?.data.error) {
      setChainData(chainRes.data.data);
      return chainRes.data.data;
    } else {
      toast.error("Can't find Basechain");
      handleClose();
    }
  };
  // Call Currency Fee Service
  const getFee = async (currency: any, chains: any) => {
    let data = {
      period: "1min",
      currency: currency,
      chain: chains || chainData?.chain,
      symbol: currencyType?.symbol,
    };
    let feeRes: any = await MarketServices.fetchFeeService(data);
    if (feeRes) {
      setFeeData({ ...feeRes.data.data });
      setLoader(false);
      return feeRes.data;
    } else {
      handleClose();
    }
  };
  // Get Carrency Token
  const getCurrencyToken = async (currency: any) => {
    const data = { currency: currency };
    let currencyRes: any = await MarketServices.findTokenForCurrencyService(
      data
    );
    if (currencyRes) {
      return currencyRes?.data;
    }
  };
  //Chacking user allowence
  const checkallowence = async (cW: any, cD: any, type: any, chain: any) => {
    const currencyW: any = await getCurrencyToken(cW);
    const currencyD: any = await getCurrencyToken(cD);
    if (currencyW.data != null && currencyD.data != null) {
      let decimal =
        type == "Buy"
          ? currencyD?.data?.currency == "usdt"
            ? currencyD?.data?.decimal
            : currencyW?.data?.decimal
          : currencyD?.data?.currency == "usdt"
          ? currencyW?.data?.decimal
          : currencyD?.data?.decimal;
      let ammount: any = Number(inputAmount) * 10 ** Number(decimal);
      const approve = await MarketServices.allowanceService(
        currencyW?.data?.tokenAddress,
        walletAddress,
        ammount.toString(),
        walletProvider
      );
      if (approve.status) {
        settransactionMsg(false);
        exchangeContract(currencyW?.data, currencyD?.data, type, chain);
      } else {
        handleClose();
        toast.error(approve?.message);
      }
    } else {
      toast.info(
        `${cW} or ${cD} Token Address is not available in the address book`
      );
    }
  };
  // Swapping Currency
  const exchangeContract = async (
    currencyW: any,
    currencyD: any,
    type: any,
    chain: any
  ) => {
    let currencyW_token: any = currencyW?.tokenAddress;
    let currencyD_token: any = currencyD?.tokenAddress;
    let decimal =
      type == "Buy"
        ? currencyD.currency == "usdt"
          ? currencyD.decimal
          : currencyW.decimal
        : currencyD.currency == "usdt"
        ? currencyW.decimal
        : currencyD.decimal;
    let ammount = Number(inputAmount) * 10 ** Number(decimal);
    let roundOfAmmount: any = Math.round(ammount);
    let swap = await MarketServices.exchangeContractService(
      currencyW_token,
      currencyD_token,
      roundOfAmmount.toString(),
      walletAddress,
      walletProvider
    );
    if (swap?.status === true) {
      const swapData = {
        symbol: currencyType?.symbol,
        period: "1min",
        currencyW: "usdt", //|| type == "Buy" ? currencyW.currency : currencyD.currency, // here add static usdt coin
        amount: inputAmount,
        chainForWithdraw: chain,
        type: type,
        userAddress: walletAddress,
        feePerSwap: feePerSwap.toString(),
        feeForSpot: feeForSpot.toString(),
        spotType: "buy-market",
        source: "spot-api",
        clientOrderID: MarketServices.generateClientOrderID(),
        currencySwap: type == "Sell" ? "usdt" : currencyD.currency,
        hash: swap?.transactionHash,
      };
      let fetchSwap: any = await MarketServices.swapService(swapData);
      if (fetchSwap) {
        settransactionData(fetchSwap?.data);
        toast.success("Success");
        fetchSwap?.data?.message?.status == "ok"
          ? toast.success("Swap Done")
          : toast.error(fetchSwap?.data?.message["err-msg"] || "Swap Failed");
      }
    } else {
      handleClose();
      toast.error(swap?.message);
    }
  };

  const onMaxAmount = async (currency: any) => {
    const currencyAddress: any = await getCurrencyToken(currency);
    let userBalance = await MarketServices.fetchBalanceService(
      currencyAddress?.data?.tokenAddress,
      walletAddress,
      currencyAddress?.data?.decimal,
      walletProvider
    );
    if (userBalance) {
      setInputAmount(Number(userBalance));
    }
  };

  //onMax
  const fetchUSDTMaxBalance = async () => {
    let userBalance = await MarketServices.fetchBalanceService(
      USDTADDRESS,
      walletAddress,
      USDTDECIMALS,
      walletProvider
    );
    setInputAmount(Number(userBalance));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const getData = async () => {
      if (
        (show && isNetworkselected === "BSC TESTNET") ||
        isNetworkselected === "BSC"
      ) {
        toast.error(
          "Please Change Network BSC to ETH Trade is Not Work With BSC Network"
        );
        setShowNetworkModal(true);
      } else {
        let chainRes = await getChain(
          tradeType == "Buy"
            ? currencyType?.receivingCurrency
            : currencyType?.receivableCurrency
        );
        await getFee(
          tradeType == "Buy"
            ? currencyType?.receivingCurrency
            : currencyType?.receivableCurrency,
          chainRes?.chain || chainData?.chain
        );
      }
    };
    getData();
  }, [show, tradeType]);
  return (
    <CommonModal
      show={show}
      handleClose={handleClose}
      className="buy_sell_modal"
      heading={`Trade`}
    >
      {isloading ? (
        <div
          className="mx-auto d-block my-3 spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <Tab.Container id="left-tabs-example" defaultActiveKey="buy">
          <Nav>
            <Nav.Item>
              <Nav.Link className="buy" eventKey="buy">
                Buy
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="sell" eventKey="sell">
                sell
              </Nav.Link>
            </Nav.Item>
          </Nav>
          <Tab.Content>
            <Tab.Pane eventKey="buy">
              <form onSubmit={handleSubmit}>
                <Input
                  placeholder="0.00"
                  label={
                    <>
                      Amount
                      <button
                        type="button"
                        onClick={() => fetchUSDTMaxBalance()}
                      >
                        MAX
                      </button>
                    </>
                  }
                  type="number"
                  rightIcon="USDT"
                  value={inputAmount}
                  onChange={onChange}
                  disabled={walletAddress ? false : true}
                />
                <p className="amount_txt">
                  Minimum Amount:{" "}
                  <span>
                    $
                    {(Number(feeData?.minimumWithdraw) +
                      Number(feeData?.fee) +
                      (Number(feeData?.minimumWithdraw) +
                        Number(feeData?.fee)) *
                        feePerSwap) *
                      Number(feeData?.price?.Buy) >
                    10
                      ? (
                          (Number(feeData?.minimumWithdraw) +
                            Number(feeData?.fee) +
                            (Number(feeData?.minimumWithdraw) +
                              Number(feeData?.fee)) *
                              feePerSwap) *
                            Number(feeData?.price?.Buy) +
                          buyFeePrice
                        )?.toFixed(2)
                      : buyMinimumAmount}
                  </span>
                </p>
                <Button
                  fluid
                  type="submit"
                  disabled={(() => {
                    // Extract and convert values safely
                    const minimumWithdraw =
                      Number(feeData?.minimumWithdraw) || 0;
                    const fee = Number(feeData?.fee) || 0;
                    const feePerSwapValue = minimumWithdraw + fee;
                    const feePerSwapTotal = feePerSwapValue * (feePerSwap || 0);
                    const buyPrice = Number(feeData?.price?.Buy) || 0;

                    // Total calculation
                    const totalCost =
                      (feePerSwapValue + feePerSwapTotal) * buyPrice;
                    const totalWithBuyFee =
                      totalCost + (Number(buyFeePrice) || 0);

                    // Determine the minimum amount needed for a valid transaction
                    const minimumAmountRequired =
                      totalCost > 10
                        ? totalWithBuyFee.toFixed(2)
                        : buyMinimumAmount;

                    // Check if the input amount is less than the required amount or other invalid conditions
                    return (
                      Number(minimumAmountRequired) > Number(inputAmount) ||
                      Number(inputAmount) <= 0 ||
                      inputAmount === undefined
                    );
                  })()}
                >
                  {walletAddress ? "Buy" : "Please connect the wallet"}
                </Button>
              </form>
            </Tab.Pane>
            <Tab.Pane eventKey="sell">
              <form onSubmit={handleSubmit}>
                <Input
                  placeholder="0.00"
                  label={
                    <>
                      Amount
                      <button
                        type="button"
                        onClick={() => fetchUSDTMaxBalance()}
                      >
                        MAX
                      </button>
                    </>
                  }
                  type="number"
                  rightIcon="USDT"
                  value={inputAmount}
                  onChange={onChange}
                  disabled={walletAddress ? false : true}
                />
                <p className="amount_txt">
                  Minimum Amount Sell :{" "}
                  <span>
                    $
                    {(Number(feeData?.minimumWithdraw) +
                      Number(feeData?.fee) +
                      (Number(feeData?.minimumWithdraw) +
                        Number(feeData?.fee)) *
                        feePerSwap) *
                      Number(feeData?.price?.Sell) >
                    10
                      ? (
                          (Number(feeData?.minimumWithdraw) +
                            Number(feeData?.fee) +
                            (Number(feeData?.minimumWithdraw) +
                              Number(feeData?.fee)) *
                              feePerSwap) *
                            Number(feeData?.price?.Sell) +
                          buyFeePrice
                        )?.toFixed(2)
                      : buyMinimumAmount}
                  </span>
                </p>
                <Button
                  fluid
                  type="submit"
                  disabled={(() => {
                    // Extract and convert values safely
                    const minimumWithdraw =
                      Number(feeData?.minimumWithdraw) || 0;
                    const fee = Number(feeData?.fee) || 0;
                    const feePerSwapValue = minimumWithdraw + fee;
                    const feePerSwapTotal = feePerSwapValue * (feePerSwap || 0);
                    const buyPrice = Number(feeData?.price?.Sell) || 0;

                    // Total calculation
                    const totalCost =
                      (feePerSwapValue + feePerSwapTotal) * buyPrice;
                    const totalWithBuyFee =
                      totalCost + (Number(buyFeePrice) || 0);

                    // Determine the minimum amount needed for a valid transaction
                    const minimumAmountRequired =
                      totalCost > 10
                        ? totalWithBuyFee.toFixed(2)
                        : buyMinimumAmount;

                    // Check if the input amount is less than the required amount or other invalid conditions
                    return (
                      Number(minimumAmountRequired) > Number(inputAmount) ||
                      Number(inputAmount) <= 0 ||
                      inputAmount === undefined
                    );
                  })()}
                >
                  {walletAddress ? "Sell" : "Please connect the wallet"}
                </Button>
              </form>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      )}
    </CommonModal>
  );
};

export default BuysellModal;
