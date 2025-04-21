import Button from "../Button/Button";
import Input from "../Input/Input";
import TokenselectModal from "../TokenselectModal/TokenselectModal";
import { cryptoDecimals, symbolsArr } from "../../../utils/helpers";
import { useAppSelector } from "../../../app/hooks";
import { BALANCE_HOOK, INPUTS } from "../../../interfaces/common";
import Shimmer from "../Shimmer/Shimmer";
import useIsWrongNetwork from "../../../CustomHook/useisWrongNetwork";
import TokensModal from "../Modals/TokensModal/TokensModal";
import { storeReduxInstance } from "../../../App";

const ActiveTokenCard = ({
  field,
  balance,
  input,
  value,
  maxFunction,
  dollarVal,
  balancevalue,
  shimmer,
  setTokenOneChainId,
  showTokensSelectModal,
  keyokx,
  setTokenOneValue,
  setTokenTwoValue,
}: {
  field: string;
  balance: BALANCE_HOOK["tokenBalance"];
  input: any;
  value: INPUTS | any;
  maxFunction: any;
  balancevalue?: string | number;
  dollarVal: string | number;
  shimmer: string;
  setTokenOneChainId?: any;
  showTokensSelectModal?: boolean;
  keyokx?: any;
  setTokenOneValue?: any;
  setTokenTwoValue?: any;
}) => {
  const isWrongNetwork = useIsWrongNetwork();
  const { walletAddress }: { walletAddress: string } = useAppSelector(
    (state: any) => state?.user
  );

  const modifyTokenBalance = () => {
    return (
      <>
        {typeof balance?.token1Balance === "string" && keyokx != "okx" && (
          <h6>
            <span>Balance :</span>{" "}
            {balance?.token1Balance == 0 ? (
              0
            ) : balance?.token1Balance ? (
              `${balance?.token1Balance}`
            ) : (
              <Shimmer height={10} width={50} />
            )}
          </h6>
        )}
      </>
    );
  };
  return (
    <>
      <div className="activeCardtoken">
        <ul className="listToken">
          <li>
            {shimmer == "Tk1" ? (
              <Shimmer height={30} width={200} />
            ) : (
              <Input
                placeholder="0"
                className="without_bg inputActive"
                type="number"
                onChange={(e: any) => input(e.target.value, false, "TK1")}
                value={keyokx != "okx" ? value?.inputValue : value}
              />
            )}
            <div className="listRight">
              <Button
                text="MAX"
                className="maxBtn without_bg_border"
                onClick={() => maxFunction("TK1")}
              />
              {showTokensSelectModal ? (
                <TokenselectModal
                  field={field}
                  setTokenOneChainId={setTokenOneChainId}
                  setTokenOneValue={setTokenOneValue}
                  setTokenTwoValue={setTokenTwoValue}
                />
              ) : (
                <TokensModal field={field} />
              )}
            </div>
          </li>
          <li>
            <h6>
              ~$
              {cryptoDecimals(
                Number(dollarVal) * Number(value?.inputValue) || 0
              )}
            </h6>
            {keyokx == "okx" ? (
              <h6 className="balancevalue">
                Balance: <span>{balancevalue ? balancevalue : "0"}</span>
              </h6>
            ) : (
              ""
            )}
            {isWrongNetwork || !walletAddress ? "" : modifyTokenBalance()}
          </li>
        </ul>
      </div>
    </>
  );
};

export default ActiveTokenCard;
