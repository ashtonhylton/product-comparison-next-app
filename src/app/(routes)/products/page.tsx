"use client";
import { Suspense, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/store/hooks";
import {
  productSlice,
  selectSortedProductsMemoized,
} from "@/src/store/slices/products-slice";
import Products from "@/src/components/Products";
import Link from "next/link";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Loading from "@/src/components/Loading";

// const Products = dynamic(() => {
//   return import("@/src/components/Products");
// });
const ProductComparison = dynamic(
  () => import("@/src/components/ProductComparison")
);

export default function ProductsPage() {
  const products = useSelector(selectSortedProductsMemoized);

  const comparedProductsCount = useAppSelector(
    productSlice.selectors.selectComparedProductsCount
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(productSlice.actions.getProducts());
    }
  }, []);

  const env = {
    productCompareLimit: process.env
      .NEXT_PUBLIC_PRODUCT_COMPARE_LIMIT as string,
  };

  return (
    <>
      <h1 className="text-2xl text-center font-bold m-4">Products Page</h1>

      <div className="text-center mb-20">
        <h2 className="font-semibold">
          Select Up To {env.productCompareLimit} Products To Compare
        </h2>
        <p>
          There are currently {comparedProductsCount} of{" "}
          {env.productCompareLimit} Products being compared currently
        </p>
        <p>
          You can view the selected products on the{" "}
          <Link
            href={"/product-comparison"}
            className="font-bold hover:text-pear-500"
          >
            Compared Products
          </Link>{" "}
          page or{" "}
          <a
            className="font-bold hover:text-pear-500"
            href="#comparison-section"
          >
            below
          </a>
        </p>
      </div>

      <Products />

      <div id="comparison-section" className="pt-16">
        {comparedProductsCount <= 0 ? (
          <p className="text-md text-center font-bold m-4 mb-10">
            Select some products to diplay the comparison table here ☺️
          </p>
        ) : (
          <Suspense fallback={<Loading />}>
            <h3 className="text-2xl text-center font-bold m-4 mb-10">
              Products Compared
            </h3>
            <ProductComparison />
          </Suspense>
        )}
      </div>
    </>
  );
}
