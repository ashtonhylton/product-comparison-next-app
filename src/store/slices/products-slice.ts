import { fakestoreApiService } from "@/src/services/fakestore-api.service";
import { createAppSlice } from "@/src/store/create-app-slice";
import { createSelector, type PayloadAction } from "@reduxjs/toolkit";
import {
  ComparedProduct,
  ComparedProductsMap,
  Product,
} from "@/src/models/product.models";
import { AxiosError } from "axios";
import {
  LOADING_STATUS,
  PRODUCT_SORT_BY,
  PRODUCT_SORT_ORDER,
} from "@/src/models/enums.models";
import { RootState } from "../store";
import {
  processProductComparison,
  ProductSortingService,
  toggleProductComparisonAndProcess,
} from "@/src/services/product-sorting.service";

export interface ProductState {
  productsLoadingStatus: LOADING_STATUS;
  products: Product[];
  productsSortBy: PRODUCT_SORT_BY;
  productsSortOrder: PRODUCT_SORT_ORDER;
  comparedProducts: ComparedProductsMap;
}

const initialState: ProductState = {
  productsLoadingStatus: LOADING_STATUS.IDLE,
  products: [],
  productsSortBy: PRODUCT_SORT_BY.TITLE,
  productsSortOrder: PRODUCT_SORT_ORDER.ASC,
  comparedProducts: {},
};

const env = {
  productCompareLimit: parseInt(
    process.env.NEXT_PUBLIC_PRODUCT_COMPARE_LIMIT as string
  ),
};

export const productSlice = createAppSlice({
  name: "product",
  initialState,
  reducers: (create) => ({
    toggleSort: create.reducer(
      (state: ProductState, action: PayloadAction<PRODUCT_SORT_BY>) => {
        const sortByField: PRODUCT_SORT_BY = action.payload;
        if (!state.productsSortBy || state.productsSortBy !== sortByField) {
          state.productsSortBy = sortByField;
          state.productsSortOrder = PRODUCT_SORT_ORDER.ASC;
          return;
        }

        state.productsSortOrder =
          state.productsSortOrder === PRODUCT_SORT_ORDER.ASC
            ? PRODUCT_SORT_ORDER.DESC
            : PRODUCT_SORT_ORDER.ASC;
      }
    ),
    toggleComparison: create.reducer(
      (state: ProductState, action: PayloadAction<Product>) => {
        const product: Product = action.payload;
        const productId: number = product.id;
        const foundProduct: ComparedProduct = state.comparedProducts[productId];

        const isComparedLimitReached =
          Object.keys(state.comparedProducts).length ===
          env.productCompareLimit;

        if (!foundProduct && isComparedLimitReached) {
          return;
        }

        toggleProductComparisonAndProcess(
          product,
          state.comparedProducts,
          processProductComparison
        );
      }
    ),
    clearAllComparedProducts: create.reducer((state) => {
      state.comparedProducts = {};
    }),
    getProducts: create.asyncThunk(
      async (params: void, { rejectWithValue }): Promise<Product[]> => {
        try {
          const response = await fakestoreApiService.getProducts();
          return response.data;
        } catch (error) {
          const errorResponse = error as AxiosError;
          throw rejectWithValue(errorResponse?.request?.response);
        }
      },
      {
        pending: (state) => {
          state.productsLoadingStatus = LOADING_STATUS.LOADING;
        },
        fulfilled: (state, action: { payload: Product[] }) => {
          state.productsLoadingStatus = LOADING_STATUS.IDLE;
          state.products = action.payload;
        },
        rejected: (state, action) => {
          console.debug("Product Error Response", action.payload);
          state.productsLoadingStatus = LOADING_STATUS.FAILED;
        },
      }
    ),
  }),
  selectors: {
    selectProducts: (state: ProductState): Product[] => {
      return state.products;
    },
    selectComparedProducts: (state: ProductState): ComparedProductsMap =>
      state.comparedProducts,
    selectComparedProductsCount: (state: ProductState): number =>
      Object.keys(state.comparedProducts).length,
    selectComparedProductsLimitReached: (state: ProductState): boolean => {
      const isComparedLimitReached =
        Object.keys(state.comparedProducts).length === env.productCompareLimit;

      return isComparedLimitReached;
    },
    selectProductSortBy: (state: ProductState) => state.productsSortBy,
    selectProductSortOrder: (state: ProductState) => state.productsSortOrder,
  },
});

export const selectSortedProductsMemoized = createSelector(
  [
    (state: RootState) => state.product.products,
    (state: RootState) => state.product.productsSortBy,
    (state: RootState) => state.product.productsSortOrder,
  ],
  (products, productsSortBy, productsSortOrder) => {
    if (!productsSortBy) {
      return products;
    }

    return ProductSortingService.sortProductList(
      products,
      productsSortBy,
      productsSortOrder
    );
  }
);

// export const selectComparedProductsMemoized = createSelector(
//   (state: RootState) => state.product.comparedProducts,
//   (comparedProducts: ComparedProductsMap) => {
//     return comparedProducts;
//   }
// );

export const { toggleSort } = productSlice.actions;
