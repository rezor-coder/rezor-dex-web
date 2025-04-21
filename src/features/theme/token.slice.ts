import {  createSlice } from "@reduxjs/toolkit";
import {
  BSC_TOKEN_LIST,
  } from "../../assets/tokens&ContractInfo/info";
import { TOKEN_DATA } from "../../interfaces/Liquidity";

export interface tokenState {
  tokenOne: TOKEN_DATA;
  tokenTwo: TOKEN_DATA;
  tokenList: TOKEN_DATA[];
}

const initialState: tokenState = {
  // tokenOne: REZOR_TOKEN_LIST[0],
  // tokenTwo: REZOR_TOKEN_LIST[1],
  // tokenList: REZOR_TOKEN_LIST,
  tokenOne: BSC_TOKEN_LIST[0],
  tokenTwo: BSC_TOKEN_LIST[1],
  tokenList: BSC_TOKEN_LIST,
};


const tokenReducer = createSlice({
  name: "token",
  initialState,
  reducers: {
    setTokenOne: (state, action) => {
      state.tokenOne = action.payload;
    },
    setTokenTwo: (state, action) => {
      state.tokenTwo = action.payload;
    },
    setTokenList: (state, action) => {
      state.tokenList = action.payload;
    },
    resetTokenSlice: () => initialState,
  },
});

export default tokenReducer.reducer;
export const { setTokenOne, setTokenTwo, setTokenList, resetTokenSlice } =
  tokenReducer.actions;
