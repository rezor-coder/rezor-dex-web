import {
  useDisconnect,
  useWeb3Modal,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setChainValues,
  setContractDetails,
  setUserConnected,
  setWalletAddress,
} from "../features/theme/user.slice";
import { networkConfig, NETWORKS } from "../utils/constants";

import {
  resetTokenSlice,
  setTokenList,
  setTokenTwo,
} from "../features/theme/token.slice";

export const useWalletConnect = () => {
  const dispatch = useDispatch();
  const { open } = useWeb3Modal();
  const { disconnect } = useDisconnect();
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  let { walletProvider, walletProviderType }: any = useWeb3ModalProvider();

  const switchNetwork = async (chainIdProvided: any) => {
    try {
      let { network }: any = networkConfig(chainIdProvided);
      if (
        walletProviderType === "walletConnect" ||
        walletProviderType === "coinbaseWallet"
      ) {
        
        return true;
      }
      if (network) {
        await new Promise<any>((resolve, reject) => {
          walletProvider
            ?.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: network.chainIdHex }],
            })
            .then((res: any) => {
              resolve(res);
            })
            .catch(async (err: any) => {
              console.log({ err });
              if (err.code == 4001) {
                return;
              }
              if (err.code === 4902) {
                await addNewNetwork(network);
              }
              reject(err);
            });
        });

        return true;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addNewNetwork = async (network: any) => {
    await walletProvider?.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: network.chainIdHex,
          chainName: network.name,
          nativeCurrency: {
            name: network.name,
            symbol: network.symbol,
            decimals: network.decimals,
          },
          rpcUrls: [network.rpcUrl],
          blockExplorerUrls: [network.explorerUrl],
        },
      ],
    });
  };

  const setNetworkInReduxState = (chainId: any) => {
    const netConfig: any = networkConfig(chainId);
    dispatch(setTokenList(netConfig.tokenList));
    dispatch(setChainValues(netConfig.network));
    dispatch(setContractDetails(netConfig.contractList));
  };

  useEffect(() => {
    let inter: any;
    inter = setTimeout(() => {
      dispatch(setWalletAddress(address));
      if (address) {
        dispatch(setUserConnected(true));
      } else {
        dispatch(setUserConnected(false));
      }
    }, 1000);
    return () => clearInterval(inter);
  }, [address]);
  
// uncomment code for issue
  useEffect(() => {
    let inter: any;
    inter = setTimeout(() => {
      if (chainId) {
        const network = NETWORKS.find((network) => network.chainId === chainId);
        if (network) {
          setNetworkInReduxState(chainId);
        }
      }
    }, 1000);

    return () => clearTimeout(inter);
  }, [chainId]);

  return {
    open,
    disconnect,
    address,
    chainId,
    isConnected,
    walletProvider,
    walletProviderType,
    switchNetwork,
    setNetworkInReduxState,
  };
};
