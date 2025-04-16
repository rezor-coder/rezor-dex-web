import { toast } from "../../components/common/Toasts/Toast";
import {
  fromWeiConvert,
  getError,
  localeStringFunction,
  toFunctionBigNumber,
  toFunctionBigNumberWei,
} from "../../utils/OkxHelpers";
import {
  apiCallPost,
  apiCallPostHeader,
} from "../../services/ApiServices/axios.service";
import { OkxContractServices } from "../contractServices/OkxContractServices";
import Web3 from "web3";
export const getQuotes = async (
  url: string,
  payload: any,
  params: any
): Promise<any> => {
  try {
    const result: any = await apiCallPostHeader(url, payload, params);
    if (result?.data?.status === 200) {
      return result;
    } else {
      const val = result?.data?.message?.split("is ")[1];
      if (Number(val) === Number(val)) {
        let errorAmt = await fromWeiConvert(val);
        toast?.error(`Maximum amount is ${errorAmt}`);
      } else {
        toast?.error(result?.data?.message);
      }
    }
  } catch (error) {
    console.log("APIERROR::", error);
  }
};

export const getTransactionStatus = async (
  url: string,
  payload: any,
  params: any
): Promise<any> => {
  try {
    const result: any = await apiCallPostHeader(url, payload, params);
    if (result?.data?.status === 200) {
      return result;
    } else {
    }
  } catch (error) {
    console.log("APIERROR::", error);
  }
};

export const okxSwapApi = async (
  url: string,
  payload: any,
  params: any
): Promise<any> => {
  try {
    const data: any = await apiCallPost(url, payload, params);
    if (data?.data?.status === 200) {
      return data?.data?.data;
    } else {
      const val = data?.data?.message?.split("is ")[1];
      let errorAmt = await fromWeiConvert(val);
      toast?.error(`Maximum amount is ${errorAmt}`);
    }
  } catch (error) {
    console.log("APIERROR::", error);
  }
};

export const ApprovalSendTransactionFunction = async (
  walletAddress: string,
  ApprovalAddressTokens: string,
  amount: string,
  fromTokenAddress: string,
  walletProvider: any
): Promise<any> => {
  try {
    const result = await OkxContractServices.approveToken(
      walletAddress,
      amount,
      ApprovalAddressTokens,
      fromTokenAddress,
      walletProvider
    );
    return result;
  } catch (error) {
    console.log("errorsas11asasas", error);
    return error;
  }
};

export const getAllowanceFunction = async (
  tokenAddress: string,
  mainContractAddress: string,
  address: string,
  walletProvider: any
): Promise<any> => {
  try {
    const result = await OkxContractServices.allowanceToken(
      tokenAddress,
      mainContractAddress,
      address,
      walletProvider
    );
    return result;
  } catch (error) {
    return error;
  }
};

export const swapSendTransactionFunction = async (
  walletAddress: string,
  dataTx: any[],
  walletProvider: any
): Promise<any> => {
  try {
    const web3: any = await OkxContractServices.callWeb3(walletProvider);
    let value = dataTx[0]?.tx?.gas
      ? dataTx[0]?.tx?.value
      : localeStringFunction(dataTx[0]?.tx?.value);
    let gasLimit = await web3.eth.estimateGas({
      to: dataTx[0]?.tx?.to,
      from: walletAddress,
      data: dataTx[0]?.tx?.data,
      value: value,
    });
    const txData = await web3.eth.sendTransaction({
      gas: Web3.utils.toHex(gasLimit),
      to: dataTx[0]?.tx?.to,
      from: walletAddress,
      data: dataTx[0]?.tx?.data,
      value: value,
    });
    return txData;
  } catch (error: any) {
    const err = getError(error);
    toast?.error(err);
    return error;
  }
};
