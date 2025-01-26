import Image from "next/image";
import { ComparedProduct, Product } from "../models/product.models";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { productSlice } from "../store/slices/products-slice";
import ButtonComponent from "./ButtonComponent";
import ProductRatingComponent from "./ProductRatingComponent";
import CartIcon from "./svgs/CartIcon";
import CompareButton from "./CompareButton";
import LabelSpan from "./LabelSpan";

export default function ProductComparison() {
  const dispatch = useAppDispatch();
  const { comparedProducts } = useAppSelector((state) => state.product);

  const toggleComparisonAction = (product: Product) =>
    dispatch(productSlice.actions.toggleComparison(product));

  return (
    <div className="relative overflow-x-auto w-full mb-10">
      <table className="table-fixed w-full text-center">
        <thead>
          <tr className="h-15 px-4 text-sm md:text-base -border-b border-gray-500">
            <th className="text-md font-bold">Image</th>
            <th className="text-md font-bold">Title</th>
            <th className="text-md font-bold">Price</th>
            <th className="text-md font-bold">Rating</th>
            <th className="text-md font-bold">&nbsp;</th>
          </tr>
        </thead>

        {Object.values(comparedProducts).map(
          (comparedProduct: ComparedProduct) => (
            <tbody key={comparedProduct.product.id}>
              <tr className="h-30 text-[9px] min-h-40 sm:text-xs lg:text-xs -border-b -last:border-0 border-gray-500">
                <td className="px-1 py-2 md:py-4">
                  <Image
                    className="w-13 sm:w-17 md:w-20 min-w-10 mx-auto"
                    src={comparedProduct.product.image}
                    alt={comparedProduct.product.title}
                    width={100}
                    height={100}
                  />
                </td>
                <td className="px-1 py-2 md:py-4">
                  {comparedProduct.product.title}
                </td>
                <td className={`px-0 py-2 md:py-`}>
                  <p>&pound;{comparedProduct.product.price.toFixed(2)}</p>
                  {comparedProduct?.comparison &&
                  comparedProduct.comparison.cheapest ? (
                    <LabelSpan className="bg-blue-500 text-white">
                      Best Price
                    </LabelSpan>
                  ) : (
                    ""
                  )}
                </td>
                <td className="px-1 py-2 md:py-4">
                  <ProductRatingComponent
                    className="flex-col"
                    productRating={comparedProduct.product.rating}
                    highestRated={
                      comparedProduct?.comparison &&
                      comparedProduct.comparison.highestRated
                    }
                  />
                </td>
                <td className="px-0 py-2 md:py-4">
                  <div className="flex flex-col md:flex-row gap-1">
                    <CompareButton
                      beingCompared={true}
                      comparisonLimitReached={false}
                      className="p-2 text-[10px] flex flex-auto justify-center font-bold"
                      onClickCallback={() =>
                        toggleComparisonAction(comparedProduct.product)
                      }
                    ></CompareButton>
                    <ButtonComponent
                      label="Add To Cart"
                      className="p-2 text-[11px] bg-black text-white inline-flex"
                    >
                      <CartIcon />
                    </ButtonComponent>
                  </div>
                </td>
              </tr>
            </tbody>
          )
        )}
      </table>
    </div>
  );
}
