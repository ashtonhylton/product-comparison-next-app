"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "../store/hooks";
import { productSlice } from "../store/slices/products-slice";
import dynamic from "next/dynamic";

const Products = dynamic(() => {
  return import("@/src/components/Products");
});

export const Nav = () => {
  const pathname = usePathname();
  const comparedProductsCount = useAppSelector(
    productSlice.selectors.selectComparedProductsCount
  );

  return (
    // <nav className="m-auto w-md text-center p-2 bg-white sticky top-0 z-50">
    <nav className="mx-3 flex flex-row justify-center gap-5 sm:gap-0 p-2  bg-white/90 sticky top-0 z-50">
      <Link
        className={`flex items-center text-center align-middle font-[400] hover:text-pear-500 ${
          pathname === "/" ? "text-pear-500" : ""
        }`}
        href="/"
      >
        <span className="sm:w-[190px]">Home</span>
      </Link>
      <Link
        className={`flex items-center px-1 text-center align-middle font-[400] hover:text-pear-500 ${
          pathname === "/product-comparison" ? "text-pear-500" : ""
        }`}
        href="/product-comparison"
      >
        <span className="sm:w-[190px]">
          Compared Products ({comparedProductsCount})
        </span>
      </Link>
      <Link
        className={`flex items-center text-center align-middle font-[400] hover:text-pear-500 ${
          pathname === "/products" ? "text-pear-500" : ""
        }`}
        href="/products"
      >
        <span className="sm:w-[190px]">Products</span>
      </Link>
    </nav>
  );
};
