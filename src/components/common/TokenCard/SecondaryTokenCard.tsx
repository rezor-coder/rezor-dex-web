import React, { useEffect, useState } from "react";
import Input from "../Input/Input";
import TokenselectModal from "../TokenselectModal/TokenselectModal";
import Button from "../Button/Button";
import { BALANCE_HOOK, INPUTS } from "../../../interfaces/common";
import { cryptoDecimals, symbolsArr } from "../../../utils/helpers";
import Shimmer from "../Shimmer/Shimmer";
import useIsWrongNetwork from "../../../CustomHook/useisWrongNetwork";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import TokensModal from "../Modals/TokensModal/TokensModal";
import TokenselectReceivedModal from "../TokenselectReceivedModal/TokenselectReceivedModal";
// import axios from "axios";
import axios, { AxiosInstance } from "axios";

import { APIURL, OKX } from "../../../utils/constants";
import {
  apiCallPost,
  apiCallPostHeader,
} from "../../../services/ApiServices/axios.service";
import {
  setOkxTokenListUpdate,
  setSaveSelectedTo,
} from "../../../features/theme/Okx.slice";

const SecondaryTokenCard = ({
  field,
  balance,
  input,
  value,
  maxFunction,
  dollarVal,
  balancevalue,
  shimmer,
  showTokensSelectModal,
  showCrossToken,
  setTokenTwoIconnew,
  setOkxTokenTwoAddress,
  setTokenOneChainId,
  setTwoDecinmal,
  setCurrencyNameForTokenTwo,
  keyokx,
  setTokenTwoValue,
  setTokenOneValue,
}: {
  field: string;
  balance: BALANCE_HOOK["tokenBalance"];
  input: any;
  value: any;
  balancevalue?: string | number;
  maxFunction?: any;
  dollarVal: string | number;
  shimmer: string;
  showTokensSelectModal?: boolean;
  showCrossToken?: any;
  setTokenTwoIconnew?: any;
  setOkxTokenTwoAddress?: any;
  setTwoDecinmal?: any;
  setTokenOneChainId?: any;
  setCurrencyNameForTokenTwo?: any;
  keyokx?: string;
  setTokenTwoValue?: any;
  setTokenOneValue?: any;
}) => {
  const { chain_Id, allTokenList, okxTokenListData, selectedFrom, selectedTo } =
    useAppSelector((state) => state?.okx);

  const { walletAddress }: { walletAddress: string } = useAppSelector(
    (state: any) => state?.user
  );

  const [tokenList, setTokenList] = useState([]);
  const isWrongNetwork = useIsWrongNetwork();

  const dispatch = useAppDispatch();
  const [chainName, setChainName] = useState("");
  const [networkChainId, setNetworkChainId] = useState(1);

  const [receiveChainid, setReceiveChainid] = useState("");
  const [filteredTokenList, setFilteredTokenList] = useState(okxTokenListData);

  const modifyTokenBalance = () => {
    return (
      <>
        {typeof balance?.token2Balance === "string" && keyokx != "okx" && (
          <h6>
            <span>Balance :</span>{" "}
            {balance?.token2Balance == 0 ? (
              0
            ) : balance?.token2Balance ? (
              `${balance?.token2Balance}`
            ) : (
              <Shimmer height={10} width={50} />
            )}
          </h6>
        )}
      </>
    );
  };
  const getTokenList = async (url: any) => {
    try {
      const result: any = await apiCallPostHeader(
        url,
        { chainId: Number(receiveChainid) },
        {}
      );
      dispatch(setOkxTokenListUpdate(result?.data?.data));

      setTokenList(result?.data?.data);
      setFilteredTokenList(result?.data?.data);
    } catch (error) {
      console.log("API ERROR", error);
    }
  };

  const searchToken = (value: any) => {
    const lowercaseValue = value.toLowerCase();
    const filteredToken = tokenList.filter((data: any) => {
      const lowercaseName = data.name.toLowerCase();
      return lowercaseName.includes(lowercaseValue);
    });
    setFilteredTokenList(filteredToken);
  };

  const selectedToken = (item: any) => {
    dispatch(setSaveSelectedTo(item));
  };
  return (
    <>
      <div className="secondaryCardToken">
        <ul className="listToken">
          <li>
            {shimmer == "Tk2" ? (
              <Shimmer height={30} width={200} />
            ) : (
              <Input
                placeholder="0"
                className="without_bg"
                type="number"
                onChange={(e: any) => input(e.target.value, false, "TK2")}
                value={keyokx == "okx" ? value : value?.inputValue}
                disabled={
                  keyokx == "okx" ? true : isWrongNetwork || !walletAddress
                }
              />
            )}
            <div className="listRight">
              {false ? (
                <Button
                  text="MAX"
                  className="maxBtn without_bg_border"
                  onClick={() => maxFunction("TK2")}
                />
              ) : (
                ""
              )}
              {showTokensSelectModal ? (
                <TokenselectReceivedModal
                  setTokenTwoValue={setTokenTwoValue}
                  setTokenOneValue={setTokenOneValue}
                  tokenActive
                  field={field}
                  setTokenTwoIconnew={setTokenTwoIconnew}
                  setOkxTokenTwoAddress={setOkxTokenTwoAddress}
                  setTokenOneChainId={setTokenOneChainId}
                  setTwoDecinmal={setTwoDecinmal}
                  setCurrencyNameForTokenTwo={setCurrencyNameForTokenTwo}
                />
              ) : (
                <TokensModal tokenActive field={field} />
              )}
            </div>
          </li>
          <li>
            <h6>
              ~$
              {cryptoDecimals(
                Number(dollarVal) * Number(value?.inputValue) || 0
              )}
            </h6>
            {keyokx == "okx" &&
              selectedFrom?.chainID === selectedTo?.chainID && (
                <h6 className="balancevalue">
                  Balance: <span>{balancevalue ? balancevalue : "0"}</span>
                </h6>
              )}
            {isWrongNetwork || !walletAddress ? "" : modifyTokenBalance()}
          </li>
        </ul>
      </div>
    </>
  );
};

export default SecondaryTokenCard;
