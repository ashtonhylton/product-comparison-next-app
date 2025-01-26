import { SortButtonProps } from "../components/SortButton";
import { ComparedProductsMap } from "../models/product.models";

export function getProductItemButtonLabel(
  beingCompared: boolean,
  limitReached: boolean
): string {
  if (limitReached && !beingCompared) {
    return "Limit Reached";
  }

  if (beingCompared) {
    return "Unselect";
  }

  return "Select";
}

export function isProductInComparisonMap(
  productId: number,
  comparedProductMap: ComparedProductsMap
): boolean {
  return !!comparedProductMap[productId];
}

export function shouldMemoizeSortButton(
  prev: SortButtonProps,
  next: SortButtonProps
) {
  const isActiveSame = Object.is(prev.selected, next.selected);
  const isSortOrderSame = Object.is(prev.sortOrder, next.sortOrder);

  if (!prev.selected && !next.selected) {
    return true;
  }

  if (next.selected && !isSortOrderSame) {
    return false;
  }

  return isActiveSame;
}

export function truncateText(text: string, characterLimit: number) {
  return text.length > characterLimit
    ? text.substring(0, characterLimit) + "..."
    : text;
}