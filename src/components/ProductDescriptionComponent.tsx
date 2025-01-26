import { Product } from "../models/product.models";
import { truncateText } from "../services/helper-functions";

export default function ProductDescriptionComponent({
  product,
}: {
  product: Product;
}) {
  const DESCRIPTION_CHAR_LIMIT = 150;
  return (
    <div className="text-xs sm:text-xs md:text-xs min-h-[50px] md:min-h-[65px]">
      <p>{truncateText(product.description, DESCRIPTION_CHAR_LIMIT)}</p>
    </div>
  );
}
