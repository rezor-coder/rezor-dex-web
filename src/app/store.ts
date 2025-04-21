import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import tokenReducer from "../features/theme/token.slice";
import { persistReducer } from "redux-persist";
import themeReducer from "../features/theme/theme.slice";
import storage from "redux-persist/lib/storage";
import userReducer from "../features/theme/user.slice";
import OkxReducer from "../features/theme/Okx.slice";
import marketReducer from "../features/theme/market.slice"

const persistConfig = {
  key: "root",
  // version: 1,
  storage,
  // whitelist: ["user", "okx"],
};

const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
  token: tokenReducer,
  okx: OkxReducer,
  trade:marketReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
