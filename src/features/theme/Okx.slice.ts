import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export interface okxState {
  okxTokenListData: any;
  allTokenList: any;
  okxQuoteData: string;
  chain_Id: string;
  selectedFrom: {
    chainID: number;
    createdAt: string;
    decimal: number;
    icon: string;
    name: string;
    symbol: string;
    tokenAddress: string;
    updatedAt: string;
    _id: string;
  };
  selectedTo: {
    _id: string;
    name: string;
    symbol: string;
    decimal: number;
    icon: string;
    tokenAddress: string;
    chainID: number;
    createdAt: string;
    updatedAt: string;
  };

  okxChainName: string;

  receiveChainidRedux: string | number;
  payChainidRedux: string | number;
  slippage: any;
  saveProvider: any;
}
const initialState: okxState = {
  okxTokenListData: [],
  allTokenList: [],
  okxQuoteData: "",
  chain_Id: "",
  selectedFrom: {
    chainID: 1,
    createdAt: "2023-11-01T00:00:01.434Z",
    decimal: 18,
    icon: "https://static.okx.com/cdn/wallet/logo/ETH-20220328.png",
    name: "Ethereum",
    symbol: "ETH",
    tokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    updatedAt: "2023-11-01T00:00:01.434Z",
    _id: "65419500ca8b7e89a2d9515c",
  },
  selectedTo: {
    _id: "65725c871f625dcf6d0cfc19",
    name: "Binance Coin",
    symbol: "BNB",
    decimal: 18,
    icon: "https://static.okx.com/cdn/wallet/logo/BNB-20220308.png",
    tokenAddress: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    chainID: 56,
    createdAt: "2023-12-08T00:00:07.260Z",
    updatedAt: "2023-12-08T00:00:07.260Z",
  },

  okxChainName: "Ethereum",

  receiveChainidRedux: 56,
  payChainidRedux: 1,
  slippage: "0.5",
  saveProvider: "",
};
const OkxReducer = createSlice({
  name: "Okx",
  initialState,
  reducers: {
    setOkxTokenListUpdate: (state, action) => {
      state.okxTokenListData = [...action.payload, ...state.okxTokenListData];
    },
    setOkx_quote_data: (state, action) => {
      state.okxQuoteData = action.payload;
    },
    setOkxChainId: (state, action) => {
      state.chain_Id = action.payload;
    },
    setSaveSelectedFrom: (state, action) => {
      state.selectedFrom = action.payload;
    },
    setSaveSelectedTo: (state, action) => {
      state.selectedTo = action.payload;
    },
    setSaveAllTokenList: (state, action) => {
      state.allTokenList = action.payload;
    },
    setSaveOkxChainName: (state, action) => {
      state.okxChainName = action.payload;
    },
    setSaveReceiveChainid: (state, action) => {
      state.receiveChainidRedux = action.payload;
    },
    setSavePayChainid: (state, action) => {
      state.payChainidRedux = action.payload;
    },
    setSaveSlippagePercentage: (state, action) => {
      state.slippage = action.payload;
    },
    saveWalletProvider: (state, action) => {
      state.saveProvider = action.payload;
    },
  },
});
export default OkxReducer.reducer;
export const {
  setOkxTokenListUpdate,
  setOkx_quote_data,
  setOkxChainId,
  setSaveAllTokenList,
  setSaveOkxChainName,
  setSavePayChainid,
  setSaveReceiveChainid,
  setSaveSelectedFrom,
  setSaveSelectedTo,
  setSaveSlippagePercentage,
  saveWalletProvider,
} = OkxReducer.actions;
