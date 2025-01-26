import { memo } from "react";
import ButtonComponent from "./ButtonComponent";
import SortOrderIcon from "./svgs/SortOrderIcon";
import UnsortedIcon from "./svgs/UnsortedIcon";
import { shouldMemoizeSortButton } from "../services/helper-functions";
import { PRODUCT_SORT_BY, PRODUCT_SORT_ORDER } from "../models/enums.models";

export type SortButtonProps = {
  label: string;
  sortType: PRODUCT_SORT_BY;
  selected: boolean;
  sortOrder: PRODUCT_SORT_ORDER;
  onClickCallback: (sortType: PRODUCT_SORT_BY) => void;
  className?: string;
};

export default function SortButton({
  label,
  sortType,
  selected,
  sortOrder,
  onClickCallback,
  className,
}: SortButtonProps) {
  return (
    <ButtonComponent
      label={label}
      className={`p-2 w-10 text-xs flex flex-auto justify-center border-[1px] border-black hover:cursor-pointer hover:opacity-80
      ${className}
      ${selected ? "bg-black text-white" : ""}`}
      onClickCallback={() => onClickCallback(sortType)}
    >
      <span className="ml-2 -mr-2 -mb-[1px]">
        {selected ? <SortOrderIcon order={sortOrder} /> : <UnsortedIcon />}
      </span>
    </ButtonComponent>
  );
}

export const SortButtonMemoized = memo(SortButton, shouldMemoizeSortButton);
