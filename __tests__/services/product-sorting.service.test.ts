import {
  ComparedProduct,
  ComparedProductsMap,
  Product,
} from "@/src/models/product.models";
import {
  processProductComparison,
  toggleProductComparisonAndProcess,
} from "@/src/services/product-sorting.service";
import { mockProducts } from "@/src/utils/mock-data";

export const env = {
  productCompareLimit: process.env.NEXT_PUBLIC_PRODUCT_COMPARE_LIMIT,
};

fdescribe("Product Sorting Service Functions", () => {

  it("Should add 1 product for comparison and update the Compared Products Map", () => {
    // given
    const product1: Product = mockProducts[0] as Product;
    const comparedProductsMap: ComparedProductsMap = {};

    // when
    const comaredProductsMapResult = toggleProductComparisonAndProcess(
      product1,
      comparedProductsMap,
      processProductComparison
    );

    //then
    expect(comaredProductsMapResult[1].product).toEqual(product1);
    expect(comaredProductsMapResult[1].comparison).toBeUndefined();
  });

  it("Should process 2 products for comparison and update the Compared Products Map", () => {
    // given
    const product1: Product = mockProducts[0] as Product;
    const product2: Product = mockProducts[1] as Product;
    const comparedProductsMap: ComparedProductsMap = {
      1: {
        product: product1,
      },
    };

    // when
    const comaredProductsMapResult = toggleProductComparisonAndProcess(
      product2,
      comparedProductsMap,
      processProductComparison
    );

    //then
    expect(comparedProductsMap[1].product).toEqual(product1);
    expect(comparedProductsMap[1].comparison?.cheapest).toEqual(false);
    expect(comparedProductsMap[1].comparison?.highestRated).toEqual(false);
    expect(comparedProductsMap[2].product).toEqual(product2);
    expect(comparedProductsMap[2].comparison?.cheapest).toEqual(true);
    expect(comparedProductsMap[2].comparison?.highestRated).toEqual(true);
  });

  it("Should process 4 products for comparison and update the Compared Products Map", () => {
    // given
    const product1: Product = mockProducts[0] as Product;
    const product2: Product = mockProducts[1] as Product;
    const product3: Product = mockProducts[2] as Product;
    const product4: Product = mockProducts[3] as Product;
    const comparedProductsMap: ComparedProductsMap = {
      1: {
        product: product1,
      },
    };

    // when
    toggleProductComparisonAndProcess(
      product2,
      comparedProductsMap,
      processProductComparison
    );
    toggleProductComparisonAndProcess(
      product3,
      comparedProductsMap,
      processProductComparison
    );
    toggleProductComparisonAndProcess(
      product4,
      comparedProductsMap,
      processProductComparison
    );

    //then
    expect(comparedProductsMap[1].product).toEqual(product1);
    expect(comparedProductsMap[1].comparison?.cheapest).toEqual(false);
    expect(comparedProductsMap[1].comparison?.highestRated).toEqual(false);
    expect(comparedProductsMap[2].product).toEqual(product2);
    expect(comparedProductsMap[2].comparison?.cheapest).toEqual(false);
    expect(comparedProductsMap[2].comparison?.highestRated).toEqual(false);
    expect(comparedProductsMap[3].product).toEqual(product3);
    expect(comparedProductsMap[3].comparison?.cheapest).toEqual(false);
    expect(comparedProductsMap[3].comparison?.highestRated).toEqual(true);
    expect(comparedProductsMap[4].product).toEqual(product4);
    expect(comparedProductsMap[4].comparison?.cheapest).toEqual(true);
    expect(comparedProductsMap[4].comparison?.highestRated).toEqual(false);
  });

  it("Should remove 3 existing and add 2 then reprocess the Compared Products Map", () => {
    // given
    const product1: Product = mockProducts[0] as Product;
    const product2: Product = mockProducts[1] as Product;
    const product3: Product = mockProducts[2] as Product;
    const product4: Product = mockProducts[3] as Product;
    const product5: Product = mockProducts[4] as Product;
    const comparedProductsMap: ComparedProductsMap = {
      2: {
        product: product2,
        comparison: { cheapest: false, highestRated: false },
      },
      3: {
        product: product3,
        comparison: { cheapest: false, highestRated: true },
      },
      4: {
        product: product4,
        comparison: { cheapest: true, highestRated: false },
      },
    };

    // when
    toggleProductComparisonAndProcess(
      product2,
      comparedProductsMap,
      processProductComparison
    );
    toggleProductComparisonAndProcess(
      product3,
      comparedProductsMap,
      processProductComparison
    );
    toggleProductComparisonAndProcess(
      product4,
      comparedProductsMap,
      processProductComparison
    );
    toggleProductComparisonAndProcess(
      product5,
      comparedProductsMap,
      processProductComparison
    );
    toggleProductComparisonAndProcess(
      product1,
      comparedProductsMap,
      processProductComparison
    );

    //then
    expect(comparedProductsMap[2]).toBeUndefined();
    expect(comparedProductsMap[3]).toBeUndefined();
    expect(comparedProductsMap[4]).toBeUndefined();
    expect(comparedProductsMap[1].product).toEqual(product1);
    expect(comparedProductsMap[1].comparison?.cheapest).toEqual(true);
    expect(comparedProductsMap[1].comparison?.highestRated).toEqual(false);
    expect(comparedProductsMap[5].product).toEqual(product5);
    expect(comparedProductsMap[5].comparison?.cheapest).toEqual(false);
    expect(comparedProductsMap[5].comparison?.highestRated).toEqual(true);
  });

  it("Should return when no products are in map", () => {
    // given
    const comparedProductsMap: ComparedProductsMap = {};

    // when
    processProductComparison(comparedProductsMap);

    //then
    expect(Object.keys(comparedProductsMap).length).toEqual(0);
  });

  it("Should return and remove existing comparison when only 1 product in map", () => {
    // given
    const product1: Product = mockProducts[0] as Product;
    const comparedProductsMap: ComparedProductsMap = {
      1: {
        product: product1,
        comparison: { cheapest: true, highestRated: false },
      },
    };

    // when
    processProductComparison(comparedProductsMap);

    //then
    expect(comparedProductsMap[1].product).toEqual(product1);
    expect(comparedProductsMap[1].comparison).toBeUndefined();
  });
});
