import { memo } from "react";
import { PRODUCT_SORT_BY, PRODUCT_SORT_ORDER } from "../models/enums.models";
import { SortButtonMemoized } from "./SortButton";
import { useSortingOptions } from "../hooks/useSortingOptions.hook";

export default function SortSelectors() {
  const [productSortBy, productSortOrder, toggleSortAction] =
    useSortingOptions();

  return (
    <div className="flex flex-row md:w-lg gap-2 my-5">
      <p className="text-sm/[32px]">Sort By</p>
      <SortButtonMemoized
        label="Title"
        sortType={PRODUCT_SORT_BY.TITLE}
        selected={productSortBy === PRODUCT_SORT_BY.TITLE}
        sortOrder={productSortOrder}
        onClickCallback={toggleSortAction}
      ></SortButtonMemoized>
      <SortButtonMemoized
        label="Category"
        sortType={PRODUCT_SORT_BY.CATEGORY}
        selected={productSortBy === PRODUCT_SORT_BY.CATEGORY}
        sortOrder={productSortOrder}
        onClickCallback={toggleSortAction}
      ></SortButtonMemoized>
      <SortButtonMemoized
        label="Price"
        sortType={PRODUCT_SORT_BY.PRICE}
        selected={productSortBy === PRODUCT_SORT_BY.PRICE}
        sortOrder={productSortOrder}
        onClickCallback={toggleSortAction}
      ></SortButtonMemoized>
      <SortButtonMemoized
        label="Rating"
        sortType={PRODUCT_SORT_BY.RATING}
        selected={productSortBy === PRODUCT_SORT_BY.RATING}
        sortOrder={productSortOrder}
        onClickCallback={toggleSortAction}
      ></SortButtonMemoized>
    </div>
  );
}

export const SortSelectorsMemoized = memo(SortSelectors);
