"use client";
import ProductComparison from "@/src/components/ProductComparison";
import { useAppSelector } from "@/src/store/hooks";
import { productSlice } from "@/src/store/slices/products-slice";
import Link from "next/link";

export default function ProductComparisonPage() {
  const comparedProductsCount = useAppSelector(
    productSlice.selectors.selectComparedProductsCount
  );
  const env = {
    productCompareLimit: process.env
      .NEXT_PUBLIC_PRODUCT_COMPARE_LIMIT as string,
  };

  return (
    <>
      <h1 className="text-2xl text-center font-bold m-4">
        Product Comparison Page
      </h1>

      <div className="text-center mb-20">
        <h2 className="font-semibold">
          Select Up To {env.productCompareLimit} Products To Compare
        </h2>
        <p>
          There are currently {comparedProductsCount} of{" "}
          {env.productCompareLimit} Products being compared currently
        </p>
      </div>

      <ProductComparison></ProductComparison>

      <p className="text-center pt-10">
        Go to the{" "}
        <Link className="font-bold hover:text-pear-500" href="/products">
          Product Page
        </Link>{" "}
        to view more Products to compare
      </p>
    </>
  );
}
