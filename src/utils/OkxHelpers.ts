import Web3 from "web3";
import { setSaveOkxChainName } from "../features/theme/Okx.slice";
import { toast } from "../../src/components/common/Toasts/Toast";
// import { getAccount } from "@wagmi/core";
// import { providerWalletConnectV3 } from "../../src/services/contractServices/OkxContractServices";
// import { config } from "process";

export const nativeData: any = {
  ETH: "ETH",
  ERA_ETH: "ERA_ETH",
  OP_ETH: "OP_ETH",
  MATIC: "MATIC",
  BNB: "BNB",
  OKT: "OKT",
  AVAX: "AVAX",
  ARB: "ARB",
  LINEA_ETH: "LINEA_ETH",
  FTM: "FTM",
  CFX: "CFX",
  BASE_ETH: "BASE_ETH",
  MNT: "MNT",
};

export const ApprovalAddress: any = {
  1: "0x40aA958dd87FC8305b97f2BA922CDdCa374bcD7f",
  324: "0xc67879F4065d3B9fe1C09EE990B891Aa8E3a4c2f",
  10: "0x68D6B739D2020067D1e2F713b999dA97E4d54812",
  137: "0x3B86917369B83a6892f553609F3c2F439C184e31",
  56: "0x2c34A2Fb1d0b4f55de51E1d0bDEfaDDce6b7cDD6",
  66: "0x70cBb871E8f30Fc8Ce23609E9E0Ea87B6b222F58",
  43114: "0x40aA958dd87FC8305b97f2BA922CDdCa374bcD7f",
  42161: "0x70cBb871E8f30Fc8Ce23609E9E0Ea87B6b222F58",
  59144: "0x57df6092665eb6058DE53939612413ff4B09114E",
  250: "0x70cBb871E8f30Fc8Ce23609E9E0Ea87B6b222F58",
  1030: "0x68D6B739D2020067D1e2F713b999dA97E4d54812",
  8453: "0x57df6092665eb6058DE53939612413ff4B09114E",
  5000: "0x57df6092665eb6058DE53939612413ff4B09114E",
};

export const networkChainName: any = {
  1: "Ethereum",
  324: "zkSync Era",
  10: "Optimism",
  137: "Polygon",
  56: "Binance Coin",
  66: "OKTC",
  43114: "Avalanche",
  42161: "Arbitrum",
  59144: "Linea",
  250: "Fantom",
  1030: "Conflux Espace",
  8453: "Base",
  5000: "Mantle",
};

export const objectNetworkname: any = {
  "Binance Coin": "Binance Coin",
  Ethereum: "Ethereum",
  "zkSync Era": "zkSync Era",
  Optimism: "Optimism",
  Polygon: "Polygon",
  OKTC: "OKB",
  Avalanche: "Avalanche",
  Arbitrum: "Arbitrum One",
  Linea: "Linea",
  Fantom: "Fantom",
  "Conflux Espace": "Conflux",
  Base: "Base",
  Mantle: "Mantle",
};
export const getChainIds: any = {
  "Binance Coin": "56",
  Ethereum: "1",
  "zkSync Era": "324",
  Optimism: "10",
  Polygon: "137",
  OKTC: "66",
  Avalanche: "43114",
  Arbitrum: "42161",
  Linea: "59144",
  Fantom: "250",
  "Conflux Espace": "1030",
  Base: "8453",
  Mantle: "5000",
};
export const networkList = [
  {
    chainId: 1,
    name: "Ethereum",
    icon: "https://static.okx.com/cdn/wallet/logo/ETH-20220328.png",
    titleCoin: "ETH",
    symbol: "ETH",
  },
  {
    chainId: 324,
    icon: "https://static.okx.com/cdn/wallet/logo/zk_17000.png",
    name: "zkSync Era",
    titleCoin: "ZKSYNC",
    symbol: "ERA_ETH",
  },
  {
    chainId: 10,
    icon: "https://static.okx.com/cdn/wallet/logo/op_10000.png",
    name: "Optimism",
    titleCoin: "Optimism",
    symbol: "OP_ETH",
  },
  {
    chainId: 137,
    icon: "https://static.okx.com/cdn/wallet/logo/MATIC-20220415.png",
    name: "Polygon",
    titleCoin: "Poly",
    symbol: "MATIC",
  },
  {
    chainId: 56,
    icon: "https://static.okx.com/cdn/wallet/logo/BNB-20220308.png",
    name: "Binance Coin",
    titleCoin: "BNB",
    symbol: "BNB",
  },
  {
    chainId: 66,
    icon: "https://static.okx.com/cdn/wallet/logo/okb.png",
    name: "OKTC",
    titleCoin: "OKTC",
    symbol: "OKT",
  },
  {
    chainId: 43114,
    icon: "https://static.okx.com/cdn/wallet/logo/AVAX.png",
    name: "Avalanche",
    titleCoin: "AVAX",
    symbol: "AVAX",
  },
  {
    chainId: 42161,
    icon: "https://static.okx.com/cdn/wallet/logo/arb_9000.png",
    name: "Arbitrum",
    titleCoin: "Arbitrum",
    symbol: "ARB",
  },
  {
    chainId: 59144,
    icon: "https://static.okx.com/cdn/wallet/logo/linea_eth_20700.png",
    name: "Linea",
    titleCoin: "Linea",
    symbol: "LINEA_ETH",
  },
  {
    chainId: 250,
    icon: "https://static.okx.com/cdn/wallet/logo/FTM-20220328.png",
    name: "Fantom",
    titleCoin: "FTM",
    symbol: "FTM",
  },
  {
    chainId: 1030,
    icon: "https://static.okx.com/cdn/wallet/logo/cfx_19200.png",
    name: "Conflux",
    titleCoin: "ConfluxEspace",
    symbol: "CFX",
  },
  {
    chainId: 8453,
    icon: "https://static.okx.com/cdn/wallet/logo/base_20900.png",
    name: "Base",
    titleCoin: "Base",
    symbol: "BASE_ETH",
  },
  {
    chainId: 5000,
    icon: "https://static.okx.com/cdn/wallet/logo/mnt_20100.png",
    name: "Mantle",
    titleCoin: "Mantle",
    symbol: "MNT",
  },
];

export const BlockExploreUrl: any = {
  1: "https://etherscan.io/tx/",
  324: "https://explorer.zksync.io/tx/",
  10: "https://optimistic.etherscan.io/tx/",
  137: "https://polygonscan.com/tx/",
  56: "https://bscscan.com/tx/",
  66: "https://www.okx.com/tx/",
  43114: "https://snowtrace.io/block/",
  42161: "https://arbiscan.io/tx/",
  59144: "https://lineascan.build/tx/",
  250: "https://ftmscan.com/tx/",
  1030: "https://www.confluxscan.io/transaction/",
  8453: "https://basescan.org/tx/",
  5000: "https://mantlescan.info/tx/",
};

export const localeStringFunction = (value: any) => {
  return value.toLocaleString("fullwide", {
    useGrouping: !1,
  });
};
export const toWeiConvert = async (amount: any) => {
  return await Web3.utils.toWei(amount, "ether");
};

export const fromWeiConvert = async (amount: any) => {
  return await Web3.utils.fromWei(amount, "ether");
};

export const toFunctionBigNumber = (x: any) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }

  return x;
};

export const toFunctionBigNumberWei = (x: any) => {
  if (Math.abs(x) < 1.0) {
    var e = parseInt(x.toString().split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e).join("0") + x.toString().substring(2);
    }
  } else {
    e = parseInt(x.toString().split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math.pow(10, e);
      x += new Array(e + 1).join("0");
    }
  }
  x = x?.toString();
  let newX = Web3.utils.fromWei(x, "ether");
  newX = Number(newX)?.toFixed(5)?.slice(0, -1);
  return newX;
};

export const fixAndConvertFunction = (value: any) => {
  let newdata = value?.toString();
  newdata = Number(newdata)?.toFixed(6)?.slice(0, -1);
  return newdata;
};

export const inputValueCommonFunction = (value: any) => {
  let values;
  const maxLength = 18;
  const regexHere = /^(\d+)?([.]?\d{0,6})?$/;
  const isInputValid = regexHere.test(value);
  if (isInputValid) {
    values = value;
  } else {
    return;
  }
  if (value?.length <= maxLength) {
    values = value;
  } else if (value?.length > maxLength) {
    return;
  }

  if (
    values?.length > 1 &&
    Array.from(values)[0] === "0" &&
    Array.from(values)[1] !== "."
  ) {
    values = values?.slice(1);
  }

  if (values?.toString().charAt(0) == ".") {
    values = "0" + values;
  }
  return values;
};

export const networks: any = {
  Ethereum: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ethereum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  Optimism: {
    chainId: "0xa", // Hexadecimal representation of the Optimism chain ID
    chainName: "Optimism Mainnet",
    nativeCurrency: {
      name: "Optimism",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.optimism.io"],
    blockExplorerUrls: ["https://optimistic.etherscan.io"],
  },

  "zkSync Era": {
    chainId: "0x144", // Hexadecimal representation of the Optimism chain ID
    chainName: "zkSync Era",
    nativeCurrency: {
      name: "ZKSYNC_ERA",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.era.zksync.io"],
    blockExplorerUrls: ["https://explorer.zksync.io/"],
  },
  Polygon: {
    chainId: "0x89", // Hexadecimal representation of the Optimism chain ID
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "Polygon",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  "Binance Coin": {
    chainId: "0x38", // Hexadecimal representation of the Optimism chain ID
    chainName: "Binance Smart Chain",
    nativeCurrency: {
      name: "Binance",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: ["https://bsc.publicnode.com"],
    blockExplorerUrls: ["https://bscscan.com"],
  },
  OKTC: {
    chainId: "0x42", // Hexadecimal representation of the Optimism chain ID
    chainName: "OKXChain Mainnet",
    nativeCurrency: {
      name: "OKTC",
      symbol: "OKT",
      decimals: 18,
    },
    rpcUrls: ["https://exchainrpc.okex.org"],
    blockExplorerUrls: ["https://www.oklink.com/en/oktc"],
  },
  Avalanche: {
    chainId: "0xa86a", // Hexadecimal representation of the Optimism chain ID
    chainName: "Avalanche Network",
    nativeCurrency: {
      name: "Avalanche",
      symbol: "AVAX",
      decimals: 18,
    },
    rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
    // blockExplorerUrls: [" https://snowtrace.io/ "],
  },
  Arbitrum: {
    chainId: "0xa4b1", // Hexadecimal representation of the Arbitrum chain ID
    chainName: "Arbitrum One",
    nativeCurrency: {
      name: "Arbitrum",
      symbol: "ETH", // Use a standard symbol like 'ETH'
      decimals: 18,
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://arbiscan.io/"],
  },

  Linea: {
    chainId: "0xe708", // Hexadecimal representation of the Optimism chain ID
    chainName: "Linea Mainnet",

    nativeCurrency: {
      name: "Linea",
      symbol: "Linea",
      decimals: 18,
    },
    rpcUrls: ["https://linea.blockpi.network/v1/rpc/public"],
    blockExplorerUrls: ["https://lineascan.build"],
  },
  Fantom: {
    chainId: "0xfa", // Hexadecimal representation of the Optimism chain ID
    chainName: "Fantom Opera",

    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.ftm.tools/"],
    blockExplorerUrls: ["https://ftmscan.com/"],
  },
  Conflux: {
    chainId: "0x406", // Hexadecimal representation of the Conflux eSpace chain ID
    chainName: "Conflux eSpace",
    nativeCurrency: {
      name: "Conflux",
      symbol: "CFX",
      decimals: 18,
    },
    rpcUrls: ["https://evm.confluxrpc.com"],
    blockExplorerUrls: ["https://evm.confluxscan.net/"],
  },

  Base: {
    chainId: "0x2105", // Hexadecimal representation of the Optimism chain ID
    chainName: "Base Mainnet",

    nativeCurrency: {
      name: "Base",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.base.org"],
    blockExplorerUrls: ["https://basescan.org"],
  },
  Mantle: {
    chainId: "0x1388", // Hexadecimal representation of the Optimism chain ID
    chainName: "Mantle Network ",

    nativeCurrency: {
      name: "Mantle",
      symbol: "MNT",
      decimals: 18,
    },
    rpcUrls: ["https://rpc.mantle.xyz"],
    // blockExplorerUrls: [" https://explorer.mantle.xyz"],
  },
};

async function addNetwork(network: any, chain: any) {
  const currentNetwork = await chain.request({
    method: "eth_chainId",
  });
  try {
    const res = await chain.request({
      method: "wallet_addEthereumChain",
      params: [network],
    });
    const newNetwork = await chain.request({ method: "eth_chainId" });
    if (newNetwork !== currentNetwork) {
      return true;
    } else {
      return newNetwork == currentNetwork ? false : true;
    }
  } catch (error: any) {
    console.log("error", error);
    toast?.error(`Failed to add network: ${error.message}`);
    return false;
  }
}

export async function switchNetwork(
  networkName: any,
  dispatch: any,
  walletProvider: any
) {
  try {
    let chain: any;

    chain = walletProvider;

    if (chain.networkVersion !== "1" && networkName === "Ethereum") {
      const res = await chain.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }],
      });
      dispatch(setSaveOkxChainName(networkName));
      return true;
    } else {
      if (
        Web3?.utils?.toHex(chain.networkVersion) !==
          networks[networkName].chainId ||
        networkName != "Ethereum"
      ) {
        const response = await addNetwork(networks[networkName], chain);
        if (response) {
          toast?.success(`Switched to network:${networkName}`);
          dispatch(setSaveOkxChainName(networkName));
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  } catch (error) {
    return false;
  }
}
/**GET ERROR MESSAGE FORM ERROR OBJECT */
export const getError = (error: any) => {
  let errorMsg =
    error && error.message ? error.message : "Something went wrong";
  if (errorMsg.indexOf("execution reverted") > -1) {
    let msg = errorMsg;

    msg = msg =
      msg.indexOf("execution reverted:") > -1
        ? msg.split("execution reverted:")[1].split(",")[0]
        : msg;
    return msg;
  } else if (errorMsg.indexOf("INVALID_ARGUMENT") > -1) {
    return errorMsg.split("(")[0];
  } else if (errorMsg.indexOf("MetaMask Tx Signature") > -1) {
    let msg = errorMsg?.replace("MetaMask Tx Signature:", "");
    return msg;
  } else {
    let err = errorMsg.split("*")[0].split(":")[3];
    if (err?.trim() === "insufficient funds for gas") {
      return err;
    } else {
      return errorMsg;
    }
  }
};
