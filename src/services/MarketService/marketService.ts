/* eslint-disable eqeqeq */
import {
  APIURL,
  MARKET_URL,
  SWAP_CONTRACT_ADDRESS,
} from "../../utils/constants";
import { apiCallPost } from "../../services/ApiServices/axios.service";
import tockenA_ABI from "../../assets/abi/tokenA.ABI.json";
import exchange_contract_ABI from "../../assets/abi/exchange.ABI.json";
import { getContractInstance } from "../contractServices/contractMethods";
const findDesiredTokenService = async (data: any) => {
  try {
    const result = await apiCallPost(
      MARKET_URL +
        APIURL.FINDDESIREDTOKEN +
        `?page=${data?.page}&limit=${data.limit}&search=${data.search}`,
      { receivableCurrency: data.receivableCurrency },
      {}
    );
    if (result) {
      return result;
    }
  } catch (error: any) {
    console.log(error.mesage, "error");
  }
};

//Find Currency Symbol
const marketSymbolService = async (data: any) => {
  try {
    const result = await apiCallPost(MARKET_URL + APIURL.SYMBOL, data, {});
    if (result) {
      return result;
    }
  } catch (error: any) {
    console.log(error.mesage, "error");
  }
};

const checkSwapService = async (data: any) => {
  try {
    const result = await apiCallPost(MARKET_URL + APIURL.CHECKSWAP, data, {});
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const findTokenForCurrencyService = async (data: any) => {
  try {
    const result = await apiCallPost(
      MARKET_URL + APIURL.FINDTOKENFORCURRENCY,
      data,
      {}
    );
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const swapService = async (data: any) => {
  try {
    const result = await apiCallPost(MARKET_URL + APIURL.SWAP, data, {});
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};

const fetchChainService = async (data: any) => {
  try {
    const result = await apiCallPost(MARKET_URL + APIURL.FETCHCHAIN, data, {});
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchFeeService = async (data: any) => {
  try {
    const result = await apiCallPost(MARKET_URL + APIURL.FETCHFEE, data, {});
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

// Favourite Services
const setFavouriteService = async (data: any) => {
  try {
    const result = await apiCallPost(MARKET_URL + APIURL.SETFAVORITY, data, {});
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const getFavouriteService = async (data: any) => {
  try {
    let result;
    if (data.page == null || data.page == undefined || data.page == "") {
      result = await apiCallPost(
        MARKET_URL + APIURL.GETFAVORITY + `?page=${1}&limit=${1000}`,
        data,
        {}
      );
    } else {
      result = await apiCallPost(
        MARKET_URL +
          APIURL.GETFAVORITY +
          `?page=${data?.page}&limit=${data.limit}&search=${data.search}`,
        data,
        {}
      );
    }
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

const removeFavouriteService = async (data: any) => {
  try {
    const result = await apiCallPost(
      MARKET_URL + APIURL.REMOVEFAVORITY,
      data,
      {}
    );
    if (result) {
      return result;
    }
  } catch (error) {
    console.log(error);
  }
};

// Market Page Web3 Smart Contract Services
const allowanceService = async (
  address: string,
  isUserConnected: string,
  ammount: number,
  walletProvider: any
) => {
  try {
    const contract: any = await getContractInstance(
      "marketTokenContract",
      address,
      walletProvider
    );

    const userBalance = await contract.methods
      .balanceOf(isUserConnected)
      .call();
    let allowance = await contract.methods
      .allowance(isUserConnected, SWAP_CONTRACT_ADDRESS)
      .call();
    if (Number(allowance) === 0 || Number(allowance) < Number(ammount)) {
      let estimateGas = await contract.methods
        .approve(SWAP_CONTRACT_ADDRESS, userBalance)
        .estimateGas({ from: isUserConnected });
      let approve = await contract.methods
        .approve(SWAP_CONTRACT_ADDRESS, userBalance)
        .send({ from: isUserConnected, gas: estimateGas });
      if (approve?.code == 4001) {
        return { ...approve, status: false };
      } else {
        return { ...approve, status: true };
      }
    } else {
      return { status: true };
    }
  } catch (error: any) {
    console.log(error, "error");
    return { ...error, status: false };
  }
};

const exchangeContractService = async (
  currencyW_token: string,
  currencyD_token: string,
  ammount: number,
  isUserConnected: string,
  walletProvider: any
) => {
  try {
    const contract: any = await getContractInstance(
      "marketExchangeContract",
      SWAP_CONTRACT_ADDRESS,
      walletProvider
    );

    const estimateGas = await contract.methods
      .swap(currencyW_token, currencyD_token, ammount)
      .estimateGas({ from: isUserConnected });
    const swap = await contract.methods
      .swap(currencyW_token, currencyD_token, ammount)
      .send({ from: isUserConnected, gas: estimateGas });
    return swap;
  } catch (error) {
    return error;
  }
};

const generateClientOrderID = () => {
  let result = Math.round(Math.random() * 10000);
  let x = Math.round(Math.random() * 10000);
  return `${result + x}`;
};
export const USDTADDRESS: string = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
export const USDTDECIMALS:number=18;

const fetchBalanceService = async (
  address: string,
  isUserConnected: string,
  decimal: number,
  walletProvider: any
) => {
  try {
    const contract: any = await getContractInstance(
      "marketTokenContract",
      address,
      walletProvider
    );

    const userBalance = await contract.methods
      .balanceOf(isUserConnected)
      .call();
    if (userBalance) {
      let totalammount = Number(userBalance / 10 ** decimal);
      return toFixed(totalammount, 2);
    }
  } catch (error: any) {
    console.log({ ...error, status: false });
    return 0.0;
  }
};

function toFixed(num: any, fixed: number) {
  var re = new RegExp("^-?\\d+(?:.\\d{0," + (fixed || -1) + "})?");
  return num.toString().match(re)[0];
}

export const MarketServices = {
  findDesiredTokenService,
  marketSymbolService,
  checkSwapService,
  findTokenForCurrencyService,
  swapService,
  fetchChainService,
  fetchFeeService,
  allowanceService,
  exchangeContractService,
  getFavouriteService,
  setFavouriteService,
  removeFavouriteService,
  generateClientOrderID,
  fetchBalanceService,
};
