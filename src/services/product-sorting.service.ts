import { PRODUCT_SORT_BY, PRODUCT_SORT_ORDER } from "../models/enums.models";
import {
  ComparedProductsMap,
  Product,
} from "../models/product.models";

export class ProductSortingService {
  static sortProductList(
    products: Product[],
    sortBy: PRODUCT_SORT_BY,
    sortOrder: PRODUCT_SORT_ORDER
  ): Product[] {
    switch (sortBy) {
      case PRODUCT_SORT_BY.TITLE:
      case PRODUCT_SORT_BY.CATEGORY:
        return ProductSortingService.sortByString(products, sortBy, sortOrder);
      case PRODUCT_SORT_BY.PRICE:
      case PRODUCT_SORT_BY.RATING:
        return ProductSortingService.sortByNumber(products, sortBy, sortOrder);

      default:
        return products;
    }
  }

  private static sortByString(
    products: Product[],
    sortBy: PRODUCT_SORT_BY.TITLE | PRODUCT_SORT_BY.CATEGORY,
    sortOrder: PRODUCT_SORT_ORDER
  ): Product[] {
    return [...products].sort((first, second) => {
      const firstValue = first[sortBy] as string;
      const secondValue = second[sortBy] as string;
      return sortOrder === PRODUCT_SORT_ORDER.ASC
        ? firstValue.localeCompare(secondValue)
        : secondValue.localeCompare(firstValue);
    });
  }

  private static sortByNumber(
    products: Product[],
    sortBy: PRODUCT_SORT_BY.PRICE | PRODUCT_SORT_BY.RATING | PRODUCT_SORT_BY.ID,
    sortOrder: PRODUCT_SORT_ORDER
  ): Product[] {
    return [...products].sort((first, second) => {
      let firstValue;
      let secondValue;

      if (sortBy === PRODUCT_SORT_BY.RATING) {
        firstValue = first[sortBy].rate as number;
        secondValue = second[sortBy].rate as number;
      } else {
        firstValue = first[sortBy] as number;
        secondValue = second[sortBy] as number;
      }

      return sortOrder === PRODUCT_SORT_ORDER.ASC
        ? firstValue - secondValue
        : secondValue - firstValue;
    });
  }
}

export function toggleProductComparisonAndProcess(
  product: Product,
  comparedProducts: ComparedProductsMap,
  processProductComparisonCallback: (
    comparedProductsMap: ComparedProductsMap
  ) => {}
): ComparedProductsMap {
  const comparedProductsMapKeys: string[] = Object.keys(comparedProducts);
  const productExistsInMap: boolean = comparedProductsMapKeys.includes(
    product.id.toString()
  );

  // Remove from comparison map
  if (productExistsInMap) {
    delete comparedProducts[product.id];
  }

  // Add to comparison map
  if (comparedProductsMapKeys.length === 0 || !productExistsInMap) {
    comparedProducts[product.id] = {
      product,
    };
  }

  return processProductComparisonCallback(comparedProducts);
}

export function processProductComparison(
  comparedProducts: ComparedProductsMap
): ComparedProductsMap {
  const comparedProductsMapKeys: string[] = Object.keys(comparedProducts);

  if (comparedProductsMapKeys.length === 0) {
    return comparedProducts;
  }

  // Remove comparison
  if (comparedProductsMapKeys.length === 1) {
    delete comparedProducts[comparedProductsMapKeys[0]].comparison;
    return comparedProducts;
  }

  // Compare Products
  for (let comparingProductId in comparedProducts) {
    let isCheapest: boolean = true;
    let isHighestRated: boolean = true;

    for (let withProductId in comparedProducts) {
      if (comparingProductId === withProductId) {
        continue;
      }

      const comparingProduct = comparedProducts[comparingProductId];
      const withProduct = comparedProducts[withProductId];

      if (
        !isCheapest ||
        comparingProduct.product.price > withProduct.product.price
      ) {
        isCheapest = false;
      }

      if (
        !isHighestRated ||
        comparingProduct.product.rating.rate < withProduct.product.rating.rate
      ) {
        isHighestRated = false;
      }

      if (!isCheapest && !isHighestRated) {
        break;
      }
    }

    comparedProducts[comparingProductId].comparison = {
      cheapest: isCheapest,
      highestRated: isHighestRated,
    };
  }

  return comparedProducts;
}
