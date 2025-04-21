import { useState } from "react";
import {
  setTokenList,
  setTokenOne,
  setTokenTwo,
} from "../../../../features/theme/token.slice";
import { TOKEN_DATA } from "../../../../interfaces/Liquidity";
import Button from "../../Button/Button";
import CommonModal from "../CommonModal/CommonModal";
import {
  CheckIcon,
  DownArrowIcon,
  SearchIcon,
} from "../../../../assets/icons/svgicons";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoIosInformation } from "react-icons/io";
import "./TokensModal.scss";
import { callContractGetMethod } from "../../../../services/contractServices/contractMethods";
import { useWalletConnect } from "../../../../CustomHook/useWalletConnect";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import search from "../../../../assets/icons/Search.svg";
import { useNavigate } from "react-router-dom";

const TokensModal = ({
  tokenActive,
  field,
  readOnly,
  data,
}: {
  tokenActive?: boolean;
  field?: string;
  readOnly?: boolean;
  data?: any;
}) => {

  // console.log(tokenActive, field, readOnly, data, "hiiiiii")
  const dispatch = useAppDispatch();
  const { walletProvider } = useWalletConnect();
  const {
    tokenList,
    tokenOne,
    tokenTwo,
  }: { tokenList: TOKEN_DATA[]; tokenOne: TOKEN_DATA; tokenTwo: TOKEN_DATA } =
    useAppSelector((store: any) => store?.token);
  const { chainValues } = useAppSelector((state: any) => state?.user);

  const [showToken, setShowToken] = useState<boolean>(false);
  const [isSearchedTriggered, setIsSearchedTriggered] =
    useState<boolean>(false);
  const [filteredTokenList, setFilteredTokenList] = useState<TOKEN_DATA[]>([]);
  const navigate = useNavigate();

  const handleTokenSelect = async (tokenSelected: TOKEN_DATA) => {
    console.log("Field value:", field);
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

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedData = e.clipboardData.getData("Text");
    if (!/^0x[a-fA-F0-9]{40}$/.test(pastedData)) {
      e.preventDefault();
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearch(e);
  };

  const handleSearch = async (e: any) => {
    const key = e.target.value.toLowerCase();
    const isSym = /^[A-Za-z]*$/.test(key);
    const isAddr = /^0x[a-fA-F0-9]*$/.test(key);

    if (isSym || isAddr) {
      const filteredList: any = tokenList.filter((token: TOKEN_DATA) => {
        return (
          token?.symbol?.toLowerCase().includes(key) ||
          token?.address?.toLowerCase().includes(key) ||
          token?.name?.toLowerCase().includes(key)
        );
      });
      if (filteredList?.length == 0 && isAddr) {
        try {
          const decimals = await dispatch(
            callContractGetMethod(
              "decimals",
              [],
              "dynamic",
              key,
              walletProvider
            )
          );
          const name = await dispatch(
            callContractGetMethod("name", [], "dynamic", key, walletProvider)
          );
          const symbol = await dispatch(
            callContractGetMethod("symbol", [], "dynamic", key, walletProvider)
          );


          if (name && symbol && decimals !== undefined) {
            const newTokenToAdd: any = {
              name,
              symbol,
              decimals,
              isNative: false,
              address: key,
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
          console.log(error, "error");
          setFilteredTokenList([]);
          setIsSearchedTriggered(true);
        }
      } else {
        setFilteredTokenList(filteredList);
        setIsSearchedTriggered(true);
      }
    } else {
      e.target.value = ""; 
      setFilteredTokenList([]);
      setIsSearchedTriggered(false);
    }
  };
  const handleInfoIconClick = (symbol: string, address:string) => {
    navigate(`/token/${symbol}/${address}`);
  };

  return (
    <>
      {!tokenActive ? (
        <Button className="tokenBtn " onClick={() => setShowToken(true)}>
          <img src={readOnly ? data?.tokenLogo : tokenOne.icon} alt="" />
          <span className="tokenIcon">
            {readOnly ? data?.tokenName : tokenOne?.name}
          </span>
          {!readOnly ? <DownArrowIcon /> : null}
        </Button>
      ) : (
        <Button className="tokenBtn " onClick={() => setShowToken(true)}>
          <img src={tokenTwo.icon} alt="" />
          <span className="tokenIcon">{tokenTwo?.name}</span>
          <DownArrowIcon />
        </Button>
      )}

      
      {!readOnly ? (
        <CommonModal
          className="tokens_modal_custom"
          show={showToken}
          handleClose={() => {
            setIsSearchedTriggered(false);
            setShowToken(false);
          }}
          heading="Select Token"
        >
          <div className="modal_input">
            <div className="search_icon">
              <SearchIcon />
            </div>
            <input
              placeholder="Search"
              maxLength={42}
              onPaste={handlePaste}
              pattern="^0x[a-fA-F0-9]{0,40}$"
              onChange={handleInputChange}
            ></input>
          </div>
          <ul className="modal_coins">
            {tokenList?.slice(0, 3).map((token: any, index: any) => (
              <li className="modal_coins_in" key={index}>
                <button onClick={() => handleTokenSelect(token)} >
                  <span>
                    <img src={token.icon} alt="" />
                  </span>
                  {token.name}
                </button>
              </li>
            ))}
          </ul>

          <ul>
            {(isSearchedTriggered ? filteredTokenList : tokenList)?.length > 0 ? (
              (isSearchedTriggered ? filteredTokenList : tokenList).map(
                (value: any, index: number) => {

                  const isChecked = (field === "Field1" && tokenTwo?.name === value?.name) ||
                    (field === "Field2" && tokenOne?.name === value?.name);

                  return (
                    <li key={value?.name} className="list-item">
                      <button
                        className={`${isChecked ? "active" : "in-active"}`}
                        onClick={() => handleTokenSelect(value)}
                        disabled={field === "Field1" ? tokenTwo?.name === value?.name : tokenOne?.name === value?.name}
                      >
                        <span>
                          <img src={value?.icon} alt="" />
                        </span>
                        {value?.name}
                        <span className="checkbtn">
                          {isChecked && <CheckIcon />}
                        </span>
                      </button>
                      {!isChecked && (
                        <span
                          className="info-icon"
                          onClick={() => handleInfoIconClick(value.symbol, value.address)}
                        >
                          <AiOutlineInfoCircle fontSize={20} />
                        </span>
                      )}
                    </li>
                  );
                }
              )
            ) : (
              <p className="no_token_found">No token found.</p>
            )}
          </ul>


        </CommonModal>
      ) : null}
    </>
  );
};

export default TokensModal;
