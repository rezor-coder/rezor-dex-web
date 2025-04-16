import { toast } from "../../components/common/Toasts/Toast";

import tokenAabi from "../../assets/abi/tokenA.ABI.json";

import { UniversalProvider } from "@walletconnect/universal-provider";
import Web3 from "web3";

let web3Object: any;
let currentContractAddress: any;
let tokenContractObject: any;
let currentTokenAddress: any;
export const metadata = {
  name: "rezor swap",
  description: "rezor swap WalletConnect",
  url: "https://dex.rezor.pro/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
export const projectId = "f71492b62c17fee4f9bd300208c408ad";
export const providerWalletConnectV3 = async () => {
  try {
    const provider = await UniversalProvider.init({
      logger: "info",
      projectId: projectId,
      metadata: metadata,
      client: undefined,
    });
    return provider;
  } catch (error) {
    console.log(error, "error");
  }
};
declare var window: any;

const callWeb3 = async (walletProvider: any) => {
  try {
    if (walletProvider) {
      web3Object = new Web3(walletProvider);
      return web3Object;
    }
    return new Web3(walletProvider);
  } catch (error) {
    console.log("erroro", error);
  }
};
export const calculateGasPrice = async (walletProvider: any) => {
  const web3 = await callWeb3(walletProvider);
  if (!web3) return toast.error("No web3");
  const network = localStorage.getItem("CURRENT NETWORK");

  const safeGasPrice =
    network == "BSC"
      ? 1.2 * (await web3.eth.getGasPrice())
      :await web3.eth.getGasPrice();
  return safeGasPrice;
};

const approveToken = async (
  address: any,
  value: any,
  mainContractAddress: any,
  tokenAddress: any,
  walletProvider: any
) => {
  try {
    const gasPrice = await calculateGasPrice(walletProvider);
    const contract = await callTokenContract(tokenAddress, walletProvider);
    const gas = await contract.methods
      .approve(mainContractAddress, value)
      .estimateGas({ from: address });

    return await contract.methods
      .approve(mainContractAddress, value)
      .send({ from: address, gasPrice, gas });
  } catch (error: any) {
    toast?.error(error?.message);
    return error;
  }
};
const allowanceToken = async (
  tokenAddress: any,
  mainContractAddress: any,
  address: any,
  walletProvider: any
) => {
  try {
    const contract = await callTokenContract(tokenAddress, walletProvider);
    return await contract.methods
      .allowance(address, mainContractAddress)
      .call();
  } catch (error) {
    return error;
  }
};

const callTokenContract = async (tokenAddress: any, walletProvider: any) => {
  if (
    tokenContractObject &&
    currentContractAddress &&
    currentTokenAddress?.toLowerCase() === tokenAddress?.toLowerCase()
  ) {
    return tokenContractObject;
  }
  const web3Object = await callWeb3(walletProvider);
  currentTokenAddress = tokenAddress;
  tokenContractObject = new web3Object.eth.Contract(
    tokenAabi,
    currentTokenAddress
  );
  return tokenContractObject;
};

const getTokenBalance = async (
  tokenAddress: any,
  address: any,
  walletProvider: any
) => {
  try {
    const contract = await callTokenContract(tokenAddress, walletProvider);
    if (!contract) return toast.error("Please select wallet");

    const decimals = await contract.methods.decimals().call();

    let result = await contract.methods.balanceOf(address).call();
    result = Number(result / 10 ** decimals)
      .toFixed(6)
      ?.slice(0, -1);
    return result;
  } catch (error) {
    return "0";
  }
};
export const OkxContractServices = {
  callWeb3,
  allowanceToken,
  approveToken,
  callTokenContract,
  calculateGasPrice,
  providerWalletConnectV3,
  getTokenBalance,
};
