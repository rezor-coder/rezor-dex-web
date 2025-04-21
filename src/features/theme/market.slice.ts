import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  receivingCurrency: "",
  receivableCurrency: "",
  message: "",
  sufficientBalance: "",
  amountAvailable: "",
  payableAmount: "",
  symbol: "",
  period: "",
  currencyW: {},
  currencyD: {},
  amount: "",
  type: "",
  name: "",
};

const marketReducer = createSlice({
  name: "market",
  initialState,
  reducers: {
    marketDataUpdate: (state, action) => {
      state = action.payload;
    },
    marketClear: (state, action) => {
      state = action.payload;
    },
    resetTokenSlice: () => initialState,
  },
});

export default marketReducer.reducer;
export const { marketDataUpdate, marketClear, resetTokenSlice } =
  marketReducer.actions;
