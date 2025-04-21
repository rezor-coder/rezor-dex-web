import { useEffect } from "react";
import Application from "./Application";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { NETWORKS, projectId } from "./utils/constants";
import { metadata } from "./utils/constants";
import { useWalletConnect } from "./CustomHook/useWalletConnect";
import { setTokenOne, setTokenTwo } from "./features/theme/token.slice";
import useIsWrongNetwork from "./CustomHook/useisWrongNetwork";
import { store } from "../src/app/store";
import { walletConnectAlert } from "./utils/helpers";

createWeb3Modal({
  featuredWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
  ],
  includeWalletIds: [
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
    "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa"
  ],
  
  ethersConfig: defaultConfig({
    metadata,
    // debug: true,
    enableEIP6963: true,
    enableInjected: false,
    enableCoinbase: true,
    rpcUrl: "...",
    defaultChainId: Number(NETWORKS[0].chainId),
  }),
  chains: NETWORKS,
  projectId,
});
function App() {
  const dispatch = useAppDispatch();
  const { theme } = useAppSelector((state) => state.theme);
  const { chainValues } = useAppSelector((state: any) => state?.user);
  const { tokenList } = useAppSelector((store: any) => store?.token);
  const isWrongNetwork = useIsWrongNetwork();
  const { chainId } = useWalletConnect();
  const { switchNetwork, walletProviderType } = useWalletConnect();

  useEffect(() => {
    document.body.className = `${theme}-theme`;
   
  }, [theme]);

  useEffect(() => {
    dispatch(setTokenOne(tokenList[0]));
    dispatch(setTokenTwo(tokenList[1]));
  }, [chainValues]);

  const changeDefaultNetwork = async () => {
    if (isWrongNetwork && window?.location?.pathname != "/cross-chain") {
      await switchNetwork(chainValues?.chainId || NETWORKS[0]);
      if (
        walletProviderType === "walletConnect" ||
        walletProviderType === "coinbaseWallet"
      ) {
      }
    }
  };

  useEffect(() => {
    changeDefaultNetwork();
  }, [isWrongNetwork]);
  return (
    <>
      {isWrongNetwork && window?.location?.pathname != "/cross-chain" ? (
        <div className="warningNetwork">
          <h3>
            App network doesn't match to network selected in wallet. Please
            Switch the network in wallet.
          </h3>
        </div>
      ) : (
        ""
      )}
      <Application />
    </>
  );
}

export default App;
export const storeReduxInstance = store;
