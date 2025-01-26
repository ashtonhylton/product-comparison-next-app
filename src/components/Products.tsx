"use client";
import { useMemo } from "react";
import { useAppSelector } from "@/src/store/hooks";
import { LOADING_STATUS } from "@/src/models/enums.models";
import { ProductItemMemoized } from "./ProductItem";
import { SortSelectorsMemoized } from "./SortSelectors";
import { isProductInComparisonMap } from "../services/helper-functions";
import { useSelector } from "react-redux";
import {
  // selectComparedProductsMemoized,
  productSlice,
  selectSortedProductsMemoized,
} from "../store/slices/products-slice";
import { ComparedProductsMap, Product } from "../models/product.models";

export default function Products() {
  const productsLoadingStatus = useAppSelector(
    (state) => state.product.productsLoadingStatus
  );

  // In place of useMemo
  const sortedProducts: Product[] = useSelector(selectSortedProductsMemoized);

  const comparedProducts: ComparedProductsMap = useSelector(
    productSlice.selectors.selectComparedProducts
  );
  // const comparedProducts: ComparedProductsMap = useSelector(
  //   selectComparedProductsMemoized
  // );

  if (productsLoadingStatus === LOADING_STATUS.FAILED) {
    return (
      <p className="text-center my-40">
        <strong>Something went wrong...</strong>
        <br></br>
        An error loading Products has occured, please refresh and try again
      </p>
    );
  }

  if (
    sortedProducts.length === 0 ||
    productsLoadingStatus === LOADING_STATUS.LOADING
  ) {
    return (
      <>
        <p className="text-center my-40">
          <strong>Loading Products...</strong>
          <br></br>
          Sit tight, Products are on the way
        </p>
      </>
    );
  }

  return (
    <>
      <div className="products-container">
        <p className="text-right md:float-right text-sm/[34px] md:mx-4">
          Products found ({sortedProducts.length})
        </p>

        <SortSelectorsMemoized />

        <div className="grid xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-y-15 md:gap-y-10 gap-x-10 xl:max-w-7xl max-w-5xl">
          {sortedProducts.map((product) => (
            <ProductItemMemoized
              key={product.id}
              product={product}
              beingCompared={isProductInComparisonMap(
                product.id,
                comparedProducts
              )}
            />
          ))}
        </div>
      </div>
    </>
  );
}
