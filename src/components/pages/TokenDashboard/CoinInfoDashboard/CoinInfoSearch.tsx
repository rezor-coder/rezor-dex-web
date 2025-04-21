import React, { Dispatch, SetStateAction, useState, useEffect } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import CommonModal from "../../../common/Modals/CommonModal/CommonModal";
import { useAppDispatch, useAppSelector } from "../../../../app/hooks";
import "../../../common/Modals/TokensModal/TokensModal.scss";
import { CheckIcon } from "../../../../assets/icons/svgicons";
import { TOKEN_DATA } from "../../../../interfaces/Liquidity";
import { useNavigate } from "react-router-dom";
import { callContractGetMethod } from "../../../../services/contractServices/contractMethods";
import { useWalletConnect } from "../../../../CustomHook/useWalletConnect";
import { setTokenList, setTokenOne, setTokenTwo } from "../../../../features/theme/token.slice";

interface CoinInfoSearchProps {
    tokenActive?: boolean;
    field?: string;
    readOnly?: boolean;
    data?: any;
    showToken: boolean;
    setShowToken: (value: boolean) => void;
}

const CoinInfoSearch: React.FC<CoinInfoSearchProps> = ({
    tokenActive,
    field,
    readOnly,
    data,
    showToken,
    setShowToken,
}) => {
    const dispatch = useAppDispatch();
    const { walletProvider } = useWalletConnect();
    const { tokenList, tokenOne, tokenTwo }: { tokenList: TOKEN_DATA[]; tokenOne: TOKEN_DATA; tokenTwo: TOKEN_DATA } = useAppSelector((store: any) => store?.token);
    const { chainValues } = useAppSelector((state: any) => state?.user);

    const [isSearchedTriggered, setIsSearchedTriggered] = useState<boolean>(false);
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
        const key = e.target.value.trim().toLowerCase();
        const isSym = /^[A-Za-z\s]+$/.test(key);
        const isAddr = /^0x[a-fA-F0-9]+$/.test(key);
        const isNumber = /^[0-9]+$/.test(key);


        if (isSym || isAddr) {
            const filteredList: any = tokenList.filter((token: TOKEN_DATA) => {
                return (
                    token?.symbol?.toLowerCase().includes(key) ||
                    token?.address?.toLowerCase().includes(key) ||
                    token?.name?.toLowerCase().includes(key)
                );
            });

            if (filteredList.length === 0 && isAddr) {
                try {
                    const decimals = await dispatch(
                        callContractGetMethod("decimals", [], "dynamic", key, walletProvider)
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
                        };
                        dispatch(setTokenList([...tokenList, newTokenToAdd]));
                        setFilteredTokenList([newTokenToAdd]);
                        setIsSearchedTriggered(true);
                    } else {
                        setFilteredTokenList([]);
                        setIsSearchedTriggered(true);
                    }
                } catch (error) {
                    console.error(error);
                    setFilteredTokenList([]);
                    setIsSearchedTriggered(true);
                }
            } else {
                setFilteredTokenList(filteredList);
                setIsSearchedTriggered(true);
            }
        } else if (isNumber) {
            setFilteredTokenList([]);
            setIsSearchedTriggered(true);
        } else if (key === "") {

            setFilteredTokenList([]);
            setIsSearchedTriggered(false);
        } else {
            setFilteredTokenList([]);
            setIsSearchedTriggered(true);
        }
    };


    const handleInfoIconClick = (symbol: string, address: string) => {
        setShowToken(false);
        navigate(`/token/${symbol}/${address}`);
    };

    const handleClick = (token: TOKEN_DATA) => {
        handleTokenSelect(token);
        handleInfoIconClick(token.symbol, token.address);
    };

    return (
        <>
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
                        {/* <img src={search} alt="search" /> */}
                    </div>
                    <input
                        placeholder="Search"
                        maxLength={42}
                        onPaste={handlePaste}
                        pattern="^0x[a-fA-F0-9]{0,40}$"
                        onChange={handleInputChange}
                    />
                </div>
                <ul className="modal_coins">
                    {tokenList?.slice(0, 3).map((token: any, index: any) => (
                        <li className="modal_coins_in" key={index}>
                            <button onClick={() => handleClick(token)}>
                                <span>
                                    <img src={token.icon} alt={token.name} />
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
                                            onClick={() => handleClick(value)}
                                            disabled={
                                                field === "Field1"
                                                    ? tokenTwo?.name === value?.name
                                                    : tokenOne?.name === value?.name
                                            }
                                        >
                                            <span>
                                                <img src={value?.icon} alt={value?.name} />
                                            </span>
                                            {value?.name}
                                            <span className="checkbtn">
                                                {isChecked && <CheckIcon />}
                                            </span>
                                        </button>
                                        {/* {!isChecked && (
                                            <span
                                                className="info-icon"
                                                onClick={() => handleInfoIconClick(value.symbol, value.address)}
                                            >
                                                <AiOutlineInfoCircle fontSize={20} />
                                            </span>
                                        )} */}
                                    </li>
                                );
                            }
                        )
                    ) : (
                        <p className="no_token_found">No token found.</p>
                    )}
                </ul>
            </CommonModal>
        </>
    );
};

export default CoinInfoSearch;
