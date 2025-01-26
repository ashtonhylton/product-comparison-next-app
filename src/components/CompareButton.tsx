import ButtonComponent from "./ButtonComponent";
import { getProductItemButtonLabel } from "../services/helper-functions";
import CompareIcon from "./svgs/CompareIcon";

type CompareButtonParams = {
  beingCompared: boolean;
  comparisonLimitReached: boolean;
  className?: string;
  onClickCallback?: () => void;
  disable?: boolean;
};

export default function CompareButton({
  beingCompared,
  comparisonLimitReached,
  className,
  onClickCallback,
}: CompareButtonParams) {
  return (
    <ButtonComponent
      label={getProductItemButtonLabel(beingCompared, comparisonLimitReached)}
      disable={!beingCompared && comparisonLimitReached}
      className={`${className} ${
        beingCompared ? "bg-green-400 text-black" : "bg-black text-white"
      }`}
      onClickCallback={() => onClickCallback && onClickCallback()}
    >
      <CompareIcon />
    </ButtonComponent>
  );
}
