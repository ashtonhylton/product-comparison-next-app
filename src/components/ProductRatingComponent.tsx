import { memo } from "react";
import { ProductRating } from "../models/product.models";
import StarIcon from "./svgs/StarIcon";
import LabelSpan from "./LabelSpan";

type ProductRatingComponentProps = {
  productRating: ProductRating;
  highestRated?: boolean;
  className?: string;
};

function ProductRatingComponent({
  productRating,
  highestRated,
  className,
}: ProductRatingComponentProps) {
  return (
    <div className={`flex text-xs ${className}`}>
      <div className="flex flex-row gap-x-1 justify-center">
        {[...Array(5).keys()].map((number, index) => {
          let iconColour = "text-gray-900";
          if (number + 1 < productRating.rate) {
            iconColour = "text-amber-500";
          }
          return <StarIcon key={index} className={iconColour} />;
        })}
      </div>
      <p className="px-2 py-[2px]">
        {productRating.rate} ({productRating.count} Reviews)
      </p>
      {highestRated ? (
        <LabelSpan className="bg-red-400 text-white">Most Loved</LabelSpan>
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(ProductRatingComponent);
