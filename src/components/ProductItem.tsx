import Image from "next/image";
import { Product } from "../models/product.models";
import ButtonComponent from "./ButtonComponent";
import ProductDescriptionComponent from "./ProductDescriptionComponent";
import ProductRatingComponent from "./ProductRatingComponent";
import CartIcon from "./svgs/CartIcon";
import { memo } from "react";
import { productSlice } from "../store/slices/products-slice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import CompareButton from "./CompareButton";

export default function ProductItem({
  product,
  beingCompared = false,
}: {
  product: Product;
  beingCompared: boolean;
}) {
  const dispatch = useAppDispatch();
  const toggleComparisonAction = (product: Product) => {
    dispatch(productSlice.actions.toggleComparison(product));
  };
  const selectComparisonLimitReached = useAppSelector(
    productSlice.selectors.selectComparedProductsLimitReached
  );

  return (
    <>
      <div className="flex rounded-lg mx-2">
        <div className="place-self-center mr-4 rounded-lg">
          <Image
            className="max-w-25"
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col items-stretch ml-4 gap-y-2">
          <h4 className="text-sm md:text-xs flex items-end font-bold h-auto md:h-[46px] overflow-y-hidden">
            {product.title}
          </h4>
          <p className="text-base font-bold">
            &pound;{product.price.toFixed(2)}
          </p>
          <ProductRatingComponent productRating={product.rating} />
          <ProductDescriptionComponent product={product} />
          <div className="flex flex-col-2 place-content-center w-full mt-2 gap-4">
            <CompareButton
              beingCompared={beingCompared}
              comparisonLimitReached={selectComparisonLimitReached}
              className="p-2 w-25 h-[32px] text-nowrap text-xs flex flex-auto justify-center font-bold"
              onClickCallback={() => toggleComparisonAction(product)}
            ></CompareButton>
            <ButtonComponent
              label="Add To Cart"
              className="p-2 w-15 h-[32px] text-nowrap text-xs flex flex-auto justify-center bg-pear-500"
            >
              <CartIcon />
            </ButtonComponent>
          </div>
        </div>
      </div>
    </>
  );
}

export const ProductItemMemoized = memo(ProductItem);
