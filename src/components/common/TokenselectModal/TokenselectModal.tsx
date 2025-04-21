import { useCallback, useEffect, useState } from "react";
import {
  setTokenList,
  setTokenOne,
  setTokenTwo,
} from "../../../features/theme/token.slice";
import { TOKEN_DATA } from "../../../interfaces/Liquidity";
import Button from "../Button/Button";
import CommonModal from "../Modals/CommonModal/CommonModal";
import {
  CheckIcon,
  DownArrowIcon,
  SearchIcon,
} from "../../../assets/icons/svgicons";
import "./TokenselectModal.scss";
import { callContractGetMethod } from "../../../services/contractServices/contractMethods";
import { useWalletConnect } from "../../../CustomHook/useWalletConnect";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import search from "../../../assets/icons/Search.svg";
import {
  setOkxChainId,
  setOkxTokenListUpdate,
  setOkx_quote_data,
  setSaveAllTokenList,
  setSavePayChainid,
  setSaveSelectedFrom,
} from "../../../features/theme/Okx.slice";
import {
  getChainIds,
  nativeData,
  networkChainName,
  networkList,
  objectNetworkname,
  switchNetwork,
} from "../../../utils/OkxHelpers";
import { apiCallPostHeader } from "../../../services/ApiServices/axios.service";
import { APIURL } from "../../../utils/constants";
import { debounce } from "debounce.lodash";

const TokenselectModal = ({
  tokenActive,
  field,
  readOnly,
  data,
  setTokenOneValue,
  setTokenTwoValue,
}: {
  tokenActive?: boolean;
  field?: string;
  readOnly?: boolean;
  data?: any;
  setTokenOneChainId?: any;
  setTokenOneValue?: any;
  setTokenTwoValue?: any;
}) => {
  const { walletProvider } = useWalletConnect();
  const {
    tokenList,
    tokenOne,
    tokenTwo,
  }: { tokenList: TOKEN_DATA[]; tokenOne: TOKEN_DATA; tokenTwo: TOKEN_DATA } =
    useAppSelector((store: any) => store?.token);

  const { allTokenList, selectedFrom, selectedTo, payChainidRedux } =
    useAppSelector<any>((state) => state?.okx);
  const [showToken, setShowToken] = useState<boolean>(false);
  const [isSearchedTriggered, setIsSearchedTriggered] =
    useState<boolean>(false);
  const [filteredTokenList, setFilteredTokenList] = useState<
    TOKEN_DATA[] | any
  >([]);

  const [allTokenListData, setallTokenListData] = useState<any[]>([]);

  const handleTokenSelect = async (tokenSelected: TOKEN_DATA) => {
    if (field === "Field1") {
      if (tokenTwo?.name === tokenSelected.name) {
        return;
      }
      dispatch(setTokenOne(tokenSelected));
    } else {
      if (tokenOne?.name === tokenSelected.name) {
        return;
      }
      dispatch(setTokenTwo(tokenSelected));
    }
    setShowToken(false);
    setIsSearchedTriggered(false);
  };

  const handleSearch = async (data: string) => {
    const key = data.toLowerCase();
    if (key !== "") {
      const filteredList: any = tokenList.find((token: TOKEN_DATA) => {
        return (
          token?.symbol?.toLowerCase().includes(key) ||
          token?.address?.toLowerCase().includes(key) ||
          token?.name?.toLowerCase().includes(key)
        );
      });
      if (!filteredList && data.length == 42) {
        try {
          const decimals = await dispatch(
            callContractGetMethod(
              "decimals",
              [],
              "dynamic",
              data,
              walletProvider
            )
          );
          const name = await dispatch(
            callContractGetMethod("name", [], "dynamic", data, walletProvider)
          );
          const symbol = await dispatch(
            callContractGetMethod("symbol", [], "dynamic", data, walletProvider)
          );
          if (name && symbol && decimals !== undefined) {
            const newTokenToAdd: any = {
              name,
              symbol,
              decimals,
              isNative: false,
              address: data,
              icon: search,
            };
            dispatch(setTokenList([...tokenList, newTokenToAdd]));
            setFilteredTokenList([newTokenToAdd]);
            setIsSearchedTriggered(true);
          } else {
            setFilteredTokenList([]);
            setIsSearchedTriggered(true);
          }
        } catch (error) {
          setFilteredTokenList([]);
          setIsSearchedTriggered(true);
        }
      } else {
        setFilteredTokenList(filteredList);
        setIsSearchedTriggered(true);
      }
    } else {
      setFilteredTokenList([]);
      setIsSearchedTriggered(false);
    }
  };
  const dispatch = useAppDispatch();

  const [chainName, setChainName] = useState("");
  const [networkChainId, setNetworkChainId] = useState("");
  const [payChainid, setPayChainid] = useState<any>("");

  useEffect(() => {
    let isMounted = true;
    const cleanup = () => {
      isMounted = false;
    };
    if (isMounted) {
      if (
        (selectedFrom?.chainID != payChainidRedux &&
          payChainidRedux != payChainid) ||
        !payChainid
      ) {
        dispatch(setSavePayChainid(selectedFrom?.chainID));
      } else if (
        selectedFrom?.chainID == payChainidRedux ||
        payChainidRedux == payChainid
      ) {
        dispatch(setSavePayChainid(payChainid));
      } else {
        dispatch(setSavePayChainid(payChainid));
      }
    }
    return cleanup;
  }, [selectedFrom, payChainid]);

  useEffect(() => {
    let isMounted = true;
    const cleanup = () => {
      isMounted = false;
    };
    if (window?.location?.pathname == "/cross-chain" && isMounted) {
      getTokenList(APIURL.OKX_GETTOKEN);
      if (allTokenList?.length == 0) {
        getAllblockchainTokens(APIURL.OKX_GETTOKEN);
      }
    }
    return cleanup;
  }, [payChainidRedux]);

  const getTokenList = async (url: any) => {
    try {
      setFilteredTokenList([]);
      const result: any = await apiCallPostHeader(
        url,
        { chainId: payChainidRedux },
        {}
      );
      if (payChainid == "") {
        setFilteredTokenList(result?.data?.data);
        setallTokenListData(result?.data?.data);
      } else {
        let newTokenArray = JSON.parse(JSON.stringify(result?.data?.data));
        setFilteredTokenList(newTokenArray);
        dispatch(setOkxTokenListUpdate(newTokenArray));
      }
    } catch (error) {
      console.log("API ERROR", error);
    }
  };
  //we will rebuild it for the revamp version

  const getAllblockchainTokens = async (url: any) => {
    try {
      const result: any = await apiCallPostHeader(url, { chainId: null }, {});
      if (result?.data?.status == 200) {
        dispatch(setSaveAllTokenList(result?.data?.data));
      }
    } catch (error) {}
  };

  const delayedQuery = useCallback(
    debounce((value: string) => {
      search(value);
    }, 1000), 
    []
  );
  // Function to replace the old token list with a new one
  function updateTokenList(newTokenList: string[]) {
    let tokenList: string[] = []; // Your array to hold the token list
    tokenList = newTokenList; // Overwrite the old token list with the new one
    return tokenList;
  }

  const search = (value: string) => {
    setFilteredTokenList([]);
    const lowercaseValue = value?.toLowerCase();
    const newTokenListFetch = JSON.parse(JSON.stringify(allTokenList));
    if (lowercaseValue != "") {
      const filteredList = newTokenListFetch?.filter((token: any) => {
        if (token?.symbol) {
          return (
            token?.symbol?.toLowerCase()?.includes(lowercaseValue) ||
            token?.tokenAddress?.toLowerCase()?.includes(lowercaseValue)
          );
        }
      });
      setFilteredTokenList(updateTokenList(filteredList) || []);
    } else {
      setFilteredTokenList(newTokenListFetch);
    }
  };

  const searchToken = (value: string) => {
    delayedQuery(value);
  };
  const selectedToken = (item: any) => {
    dispatch(setSaveSelectedFrom(item));
    setTokenOneValue("");
    setTokenTwoValue("");
    dispatch(setOkx_quote_data(""));
    setShowToken(false);
  };

  const blockChainAddnetwork = async (network: string, object: any) => {
    try {
      const response = await switchNetwork(network, dispatch, walletProvider);
      if (!response) {
        dispatch(setSavePayChainid(payChainidRedux));
        return;
      }
      let networlName =
        selectedTo?.name == "BNB Smart Chain"
          ? "Binance Coin"
          : selectedTo?.name;
      if (networlName !== objectNetworkname[network]) {
        const foundItem = allTokenList?.find(
          (item: any) =>
            item?.name === object?.name &&
            item?.symbol === object?.symbol &&
            item?.chainID == object?.chainId
        );
        if (!foundItem) {
          let bnb = {
            _id: "65e11a850c5b6b361f3e99dd",
            name: "BNB Smart Chain",
            symbol: "BNB",
            decimal: 18,
            icon: "https://static.okx.com/cdn/wallet/logo/BNB-20220308.png",
            tokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            chainID: 56,
            createdAt: "2024-03-01T00:00:05.187Z",
            updatedAt: "2024-03-01T00:00:05.187Z",
          };
          dispatch(setSaveSelectedFrom(bnb));
        } else {
          dispatch(setSaveSelectedFrom(foundItem));
        }
      }
    } catch (error) {}
  };
  return (
    <>
      {!tokenActive ? (
        <div className="btn-cross-chain-header">
        <Button className="tokenBtn btn-cross" onClick={() => setShowToken(true)}>
          <img
            src={
              window?.location?.pathname != "/cross-chain"
                ? readOnly
                  ? data?.tokenLogo
                  : tokenOne.icon
                : selectedFrom?.icon
            }
            alt=""
          />
          <span className="tokenIcon">
            {window?.location?.pathname != "/cross-chain"
              ? readOnly
                ? data?.tokenName
                : tokenOne?.name
              : selectedFrom?.name}
          </span>
          {!readOnly ? <DownArrowIcon /> : null}
        </Button>
        </div>
      ) : (
        <Button className="tokenBtn " onClick={() => setShowToken(true)}>
          <img src={tokenTwo.icon} alt="" />
          <span className="tokenIcon">{tokenTwo?.name}</span>
          <DownArrowIcon />
        </Button>
      )}
      {!readOnly ? (
        <CommonModal
          className="select_token_modal"
          show={showToken}
          handleClose={() => {
            setIsSearchedTriggered(false);
            setShowToken(false);
          }}
          // heading="Select Token"
          heading="Select Pay Token"
          hideCloseButton
        >
          <div className="modal_input">
            <div className="search_icon">
              <SearchIcon />
            </div>
            <input
              placeholder="Search"
              onChange={(e: any) => {
                window?.location?.pathname != "/cross-chain"
                  ? handleSearch(e.target.value)
                  : searchToken(e.target.value);
              }}
            ></input>
          </div>
          <div className="modal_coins">
            <h3>{`Select Network :${networkChainName[payChainidRedux]}`}</h3>
            <ul className="modal_coins_list">
              {networkList?.length > 0 ? (
                <>
                  {networkList?.map((item: any) => (
                    <li key={item.name}>
                      <button
                        className={
                          payChainidRedux == item?.chainId ? "active" : ""
                        }
                        title={item.name}
                        onClick={(e) => {
                          blockChainAddnetwork(item.name, item);
                          dispatch(setOkxChainId(item?.chainId));
                          dispatch(setSavePayChainid(item?.chainId));
                          setPayChainid(item?.chainId);
                          setChainName(item.name);
                          setNetworkChainId(item?.chainId);
                        }}
                      >
                        <span>
                          <img src={item?.icon} className="" alt="" />
                        </span>
                        {item?.titleCoin}
                      </button>
                    </li>
                  ))}
                </>
              ) : (
                <li>No Record Found</li>
              )}
            </ul>
          </div>
          <ul>
            {filteredTokenList?.length > 0 ? (
              filteredTokenList?.map((value: any) => (
                <li key={value?.name}>
                  <button
                    className={`${
                      window?.location?.pathname != "/cross-chain"
                        ? (field === "Field1" &&
                            tokenTwo?.name === value?.name) ||
                          (field === "Field2" && tokenOne?.name === value?.name)
                        : selectedFrom?.symbol == value?.symbol &&
                          selectedFrom?.chainID == value?.chainID
                        ? "active"
                        : "in-active"
                    }`}
                    onClick={() => {
                      window?.location?.pathname != "/cross-chain"
                        ? handleTokenSelect(value)
                        : selectedToken(value);
                    }}
                    disabled={
                      window?.location?.pathname != "/cross-chain" &&
                      field === "Field1"
                        ? tokenTwo?.name === value?.name
                        : window?.location?.pathname == "/cross-chain"
                        ? selectedTo?.symbol == value?.symbol &&
                          selectedTo?.chainID == value?.chainID
                        : tokenOne?.name === value?.name
                    }
                  >
                    <span>
                      <img src={value?.icon} alt="" />
                    </span>
                    {window?.location?.pathname == "/cross-chain" &&
                    value?.symbol == nativeData[value?.symbol]
                      ? value?.name
                      : window?.location?.pathname == "/cross-chain" &&
                        value?.symbol != nativeData[value?.symbol]
                      ? value?.symbol
                      : value?.name}
                    <span className="checkbtn">
                      <CheckIcon />
                    </span>
                  </button>
                </li>
              ))
            ) : (
              <p className="no_token_found">No token found.</p>
            )}
          </ul>
        </CommonModal>
      ) : null}
    </>
  );
};

export default TokenselectModal;
