import { useSelector } from "react-redux";
import { productSlice } from "../store/slices/products-slice";
import { useAppDispatch } from "../store/hooks";
import { PRODUCT_SORT_BY, PRODUCT_SORT_ORDER } from "../models/enums.models";
import { useCallback } from "react";

export type useSortingOptionsParams = [
  productSortBy: PRODUCT_SORT_BY,
  productSortOrder: PRODUCT_SORT_ORDER,
  toggleSortAction: (sortBy: PRODUCT_SORT_BY) => {
    payload: PRODUCT_SORT_BY;
    type: string;
  }
];

export const useSortingOptions = (): useSortingOptionsParams => {
  const productSortBy = useSelector(productSlice.selectors.selectProductSortBy);
  const productSortOrder = useSelector(
    productSlice.selectors.selectProductSortOrder
  );

  const dispatch = useAppDispatch();
  const toggleSortAction = useCallback(
    (sortBy: PRODUCT_SORT_BY) =>
      dispatch(productSlice.actions.toggleSort(sortBy)),
    [productSortBy]
  );

  return [productSortBy, productSortOrder, toggleSortAction];
};
