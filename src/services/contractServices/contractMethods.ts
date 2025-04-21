import { useDispatch } from "react-redux";
import DynamicABI from "../../assets/abi/erc20.json";
import tokenAabi from "../../assets/abi/tokenA.ABI.json";
import exchangeABI from "../../assets/abi/exchange.ABI.json";
import { store } from "../../app/store";
import Web3 from "web3";
import { networkConfig } from "../../utils/constants";
import { walletConnectAlert } from "../../utils/helpers";

let web3Object: any;

export const callWeb3 = async (walletProvider: any) => {
  try {
    const { ethereum }: any = window;

    if (walletProvider) {
      // walletProvider = "https://data-seed-prebsc-1-s1.binance.org:8545"
      const provider = new Web3(walletProvider);
      web3Object = provider;
      const chainId = await provider?.eth?.getChainId();
      const chainValues = store.getState()?.user?.chainValues;
      const okxDefaultChain = store?.getState()?.okx?.selectedFrom;
      const { network }: any = await networkConfig(chainValues?.chainId);

      if (
        (window?.location?.pathname != "/cross-chain" &&
          chainId != network?.chainId) ||
        (chainId != okxDefaultChain?.chainID &&
          window?.location?.pathname == "/cross-chain")
      ) {
        walletConnectAlert(
          window?.location?.pathname != "/cross-chain"
            ? network?.name
            : okxDefaultChain.name
        );
        await walletProvider?.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId:
                window?.location?.pathname != "/cross-chain"
                  ? network?.chainIdHex
                  : Web3.utils.toHex(
                      network?.chainId == okxDefaultChain?.chainID
                        ? network?.chainId
                        : okxDefaultChain?.chainID
                    ),
            },
          ],
        });
      }
      return provider;
    } else if (ethereum) {
      const provider = new Web3(ethereum);
      web3Object = provider;
      return provider;
    }
  } catch (error) {
    console.log("callweb3 error", error);
    throw error;
  }
};

/**CALL COONTRACT'S GET METHODS */
export const callContractGetMethod = (
  method: string,
  data: any,
  contractType: string,
  dynamicAddress: string,
  walletProvider: any
) => {
  return async (dispatch = useDispatch()) => {
    try {
      const result = await callGetMethod(
        method,
        data,
        contractType,
        dynamicAddress,
        walletProvider
      );
      return result;
    } catch (error) {
      throw error;
    }
  };
};

/**CALL COONTRACT'S SEND METHODS */
export function callContractSendMethod(
  method: string,
  data: any,
  walletAddress: string,
  contractType: string,
  value: any,
  dynamicAddress: string,
  walletProvider: any,
  gasPrice:any
) {
  return async (dispatch = useDispatch(), getState: any) => {
    try {
      const result = await callSendMethod(
        method,
        data,
        walletAddress,
        contractType,
        value,
        dynamicAddress,
        walletProvider,
        gasPrice
      );
      return result;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };
}
export function callGasMethod(
  method: string,
  data: any,
  walletAddress: string,
  contractType: string,
  value: any,
  dynamicAddress: string,
  walletProvider: any,
  gasPrice:any
){
  return async (dispatch = useDispatch(), getState: any) => {
    try {
      const result = await callGasFindMethod(
        method,
        data,
        walletAddress,
        contractType,
        value,
        dynamicAddress,
        walletProvider,
        gasPrice
      );
      return result;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };
}
let web3Instance: any, icoInstance: any;
let dynamicInstance = web3Instance;

export const createInstance = async (walletProvider: any) => {
  try {
    /**CREATE CONTRACT INSTANCE WITH ABI */

    let web3 = await callWeb3(walletProvider);
    web3Instance = web3;
    return web3;
  } catch (error) {
    throw error;
  }
};

/**SEND CONTRACT TYPE AND DYAMIC ADDRESS(OPTIONAL) FOR GET CONTRACT INSTANCE*/
export const getContractInstance = async (
  contractType: string,
  dynamicAddress: string,
  walletProvider: any
) => {
  if (!walletProvider) return;
  const list = store.getState()?.user?.contractDetails;

// console.log(list, "list");

  
  
  try {
    if (list) {
      return new Promise(async (resolve, reject) => {
        switch (contractType) {
          case "ico":
            return icoInstance
              ? resolve(icoInstance)
              : createInstance(walletProvider)
                  .then(() => {
                    resolve(icoInstance);
                  })
                  .catch(reject);
          case "dynamic":
            dynamicInstance = await createInstance(walletProvider).then(
              async (provider: any) => {
                return await new provider.eth.Contract(
                  JSON.parse(JSON.stringify(DynamicABI)),
                  dynamicAddress
                );
              }
            );
            resolve(dynamicInstance);
            break;
          case "factory":
            dynamicInstance = web3Instance
              ? await new web3Instance.eth.Contract(
                  JSON?.parse(JSON?.stringify(list?.factory?.abi)),
                  dynamicAddress
                )
              : await createInstance(walletProvider).then(
                  async (provider: any) => {
                    return await new provider.eth.Contract(
                      JSON.parse(JSON.stringify(list?.factory?.abi)),
                      dynamicAddress
                    );
                  }
                );
            resolve(dynamicInstance);
            break;
          case "marketTokenContract":
            dynamicInstance = web3Instance
              ? await new web3Instance.eth.Contract(
                  JSON?.parse(JSON?.stringify(tokenAabi)),
                  dynamicAddress
                )
              : await createInstance(walletProvider).then(
                  async (provider: any) => {
                    return await new provider.eth.Contract(
                      JSON.parse(JSON.stringify(tokenAabi)),
                      dynamicAddress
                    );
                  }
                );
            resolve(dynamicInstance);
            break;
          case "marketExchangeContract":
            dynamicInstance = web3Instance
              ? await new web3Instance.eth.Contract(
                  JSON?.parse(JSON?.stringify(exchangeABI)),
                  dynamicAddress
                )
              : await createInstance(walletProvider).then(
                  async (provider: any) => {
                    return await new provider.eth.Contract(
                      JSON.parse(JSON.stringify(exchangeABI)),
                      dynamicAddress
                    );
                  }
                );
            resolve(dynamicInstance);
            break;
          case "router":
            dynamicInstance = web3Instance
              ? await new web3Instance.eth.Contract(
                  JSON.parse(JSON.stringify(list?.router?.abi)),
                  dynamicAddress
                )
              : await createInstance(walletProvider).then(
                  async (provider: any) => {
                    return await new provider.eth.Contract(
                      JSON.parse(JSON.stringify(list?.router?.abi)),
                      dynamicAddress
                    );
                  }
                );
            resolve(dynamicInstance);
            break;
          case "panRouter":
            dynamicInstance = web3Instance
              ? await new web3Instance.eth.Contract(
                  JSON.parse(JSON.stringify(list?.panRouter?.abi)),
                  dynamicAddress
                )
              : await createInstance(walletProvider).then(
                  async (provider: any) => {
                    return await new provider.eth.Contract(
                      JSON.parse(JSON.stringify(list?.panRouter?.abi)),
                      dynamicAddress
                    );
                  }
                );
            resolve(dynamicInstance);
            break;
          case "staking":
            dynamicInstance = web3Instance
              ? await new web3Instance.eth.Contract(
                  JSON.parse(JSON.stringify(list?.stakingFactory?.abi)),
                  dynamicAddress
                )
              : await createInstance(walletProvider).then(
                  async (provider: any) => {
                    return await new provider.eth.Contract(
                      JSON.parse(JSON.stringify(list?.stakingFactory?.abi)),
                      dynamicAddress
                    );
                  }
                );
            resolve(dynamicInstance);
            break;
          case "farm":
            dynamicInstance = web3Instance
              ? await new web3Instance.eth.Contract(
                  JSON.parse(JSON.stringify(list?.farm?.abi)),
                  dynamicAddress
                )
              : await createInstance(walletProvider).then(
                  async (provider: any) => {
                    return await new provider.eth.Contract(
                      JSON.parse(JSON.stringify(list?.farm?.abi)),
                      dynamicAddress
                    );
                  }
                );
            resolve(dynamicInstance);
            break;
          case "pair":
            dynamicInstance = web3Instance
              ? await new web3Instance.eth.Contract(
                  JSON.parse(JSON.stringify(list?.pair?.abi)),
                  dynamicAddress
                )
              : await createInstance(walletProvider).then(
                  async (provider: any) => {
                    return await new provider.eth.Contract(
                      JSON.parse(JSON.stringify(list?.pair?.abi)),
                      dynamicAddress
                    );
                  }
                );
            resolve(dynamicInstance);
            break;
          default:
            return null;
        }
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**CALL CONTRACT GET METHODS. ALL PARAMS WILL BE DYNAMIC */
export const callGetMethod = async (
  method: string,
  data: any,
  contractType: string,
  dynamicAddress: string,
  walletProvider: any
) => {
  let contract: any = await getContractInstance(
    contractType,
    dynamicAddress,
    walletProvider
  );
  console.log("contract", contract?.methods);
  console.log("data", data);


  return new Promise(async (resolve, reject) => {
    try {
      /**GET SELECTED CONTRACT INSTANCE */
      let contract: any = await getContractInstance(
        contractType,
        dynamicAddress,
        walletProvider
      );
      if (contract && contract?.methods) {
        /**CALL GET METHOD */
        await contract.methods[method](...data)
          .call()
          .then((result: any) => {
            console.log("in then:", result);
            resolve(result);
          })
          .catch((error: any) => {
            console.log("in catch:", error);
            reject(error);
          });
      } else {
        reject(new Error("Contract not found."));
      }
    } catch (error) {
      console.log("error", error);
      reject(error);
    }
  });
};

export const validateVal = (v: any): any => {
  const t = typeof v != "string" ? `${v}` : v;
  if (
    /^0x[A-Fa-f0-9]*$/.test(t) || // addr, r,s
    /^true|false$/.test(t) // bool
  )
    return v;
  return `${isNaN(parseFloat(v)) ? "0" : v}`;
};

/**CALL CONTRACT SEND METHODS. ALL PARAMS WILL BE DYNAMIC */
export const callSendMethod = async (
  method: string,
  data: any,
  walletAddress: string,
  contractType: string,
  value: any,
  dynamicAddress: string,
  walletProvider: any,
  gasPrice:any
) => {
  const chainValues = store.getState()?.user?.chainValues;
  console.log('ffsdsfsdfs');
  console.log(chainValues);
  
  return new Promise(async (resolve, reject) => {
    try {
      /**CHECK WALLET IS CONNECTED */
      if (walletAddress === "") {
        reject(new Error("Please connect wallet"));
      }

      /**CREATE DATA FOR CALL SEND METHOD */
      let dataForSend: any = method=="deposit"?{ from: walletAddress, value: validateVal(value),gasPrice:gasPrice }:{ from: walletAddress, value: validateVal(value) };

      /**GET SELECTED CONTRACT INSTANCE */
      let contract: any = await getContractInstance(
        contractType,
        dynamicAddress,
        walletProvider
      );
      if (contract.methods) {
        /**ESTIMATE GAS FOR TRANSACTION */

        const gasLimit = await contract.methods[method]
          .apply(null, Array.prototype.slice.call(data))
          .estimateGas(dataForSend);

        if (chainValues?.chainId == 1209) {
          dataForSend.gasLimit = Number(gasLimit?.toFixed());
        } else {
          dataForSend.gasLimit = Number((gasLimit * 1.2)?.toFixed());
        }

        /**CALL SEND METHOD */
        contract?.methods[method]
          .apply(null, Array.prototype.slice.call(data))
          .send(dataForSend)
          .then((result: any) => {
            resolve(result);
            return result;
          })
          .catch((error: any) => {
            reject(error);
          });
      } else {
        reject(new Error("Contract not found."));
      }
    } catch (error) {
      console.log("erroorroorr", error);
      reject(error);
      return error;
    }
  });
};
export const callGasFindMethod=async(method: string,
  data: any,
  walletAddress: string,
  contractType: string,
  value: any,
  dynamicAddress: string,
  walletProvider: any,
  gasPrice:any)=>{
  const chainValues = store.getState()?.user?.chainValues;
    return new Promise(async (resolve, reject) => {
      try {
        /**CHECK WALLET IS CONNECTED */
        if (walletAddress === "") {
          reject(new Error("Please connect wallet"));
        }
  
        /**CREATE DATA FOR CALL SEND METHOD */
        let dataForSend: any = { from: walletAddress, value: validateVal(value), gasPrice:gasPrice};
        /**GET SELECTED CONTRACT INSTANCE */
        let contract: any = await getContractInstance(
          contractType,
          dynamicAddress,
          walletProvider
        );
        if (contract.methods) {
          /**ESTIMATE GAS FOR TRANSACTION */
         contract?.methods[method]
          .apply(null, Array.prototype.slice.call(data))  
            .estimateGas(dataForSend)
            .then((result: any) => {
              resolve(result);
              return result;
            })
         
        } else {
          reject(new Error("Contract not found."));
        }
      } catch (error) {
        console.log("error", error);
        reject(error);
        return error;
      }
    });







}