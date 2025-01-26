import { act, render, screen } from "@testing-library/react";
import Products from "@/src/components/Products";
import { renderWithProviders } from "@/src/utils/store-test-utils";
import { mockProducts } from "@/src/utils/mock-data";
import { productSlice } from "@/src/store/slices/products-slice";
import { Product } from "@/src/models/product.models";
import { LOADING_STATUS } from "@/src/models/enums.models";

export const env = {
  productCompareLimit: process.env.NEXT_PUBLIC_PRODUCT_COMPARE_LIMIT,
};

describe("Product Component with Products Loaded", () => {
  beforeEach(() =>
    renderWithProviders(<Products />, {
      preloadedState: {
        product: {
          ...productSlice.getInitialState(),
          productsLoadingStatus: LOADING_STATUS.IDLE,
          products: mockProducts as Product[],
        },
      },
    })
  );

  test("Component Render Snapshot", async () => {
    const page = renderWithProviders(<Products />);

    expect(page).toMatchSnapshot();
  });

  it("Displays 5 loaded Products by default in ascending title order", () => {
    // given
    // page rendered with products loaded

    // when
    const productTitlesAsc = screen.getAllByRole("heading", {
      level: 4,
    });

    //then
    expect(productTitlesAsc[0]).toHaveTextContent(/Product Title #1/);
    expect(productTitlesAsc[1]).toHaveTextContent(/Product Title #2/);
    expect(productTitlesAsc[2]).toHaveTextContent(/Product Title #3/);
    expect(productTitlesAsc[3]).toHaveTextContent(/Product Title #4/);
    expect(productTitlesAsc[4]).toHaveTextContent(/Product Title #5/);
  });

  it("Reorder the Products by title to descending order", () => {
    // given
    // page rendered with products loaded
    const productTitlesAsc = screen.getAllByRole("heading", {
      level: 4,
    });
    expect(productTitlesAsc[0]).toHaveTextContent(/Product Title #1/);
    expect(productTitlesAsc[1]).toHaveTextContent(/Product Title #2/);

    // when
    const titleOrderButton = screen.getByRole("button", { name: /Title/i });
    act(() => titleOrderButton.click());
    const productTitlesDesc = screen.getAllByRole("heading", {
      level: 4,
    });

    //then
    expect(productTitlesDesc[0]).toHaveTextContent(/Product Title #5/i);
    expect(productTitlesDesc[1]).toHaveTextContent(/Product Title #4/i);
  });

  it("Reorder the Products by price in ascending order", () => {
    // given
    // page rendered with products loaded and default order

    // when
    const priceOrderButton = screen.getByRole("button", { name: /Price/i });
    act(() => priceOrderButton.click());
    const productPriceAsc = screen.getAllByText(/£/i, { selector: "p" });

    //then
    expect(productPriceAsc[0]).toHaveTextContent("£15.99");
    expect(productPriceAsc[1]).toHaveTextContent("£22.30");
    expect(productPriceAsc[2]).toHaveTextContent("£55.99");
    expect(productPriceAsc[3]).toHaveTextContent("£109.95");
    expect(productPriceAsc[4]).toHaveTextContent("£695.00");
  });

  it("Selects two products for comparison", () => {
    // given
    // page rendered with products loaded

    // when
    const priceOrderButton = screen.getAllByRole("button", { name: /Select/i });
    act(() => priceOrderButton[0].click());
    act(() => priceOrderButton[2].click());

    //then
    expect(priceOrderButton[0]).toHaveTextContent(/Unselect/i);
    expect(priceOrderButton[1]).not.toHaveTextContent(/Unselect/i);
    expect(priceOrderButton[2]).toHaveTextContent(/Unselect/i);
    expect(priceOrderButton[3]).not.toHaveTextContent(/Unselect/i);
    expect(priceOrderButton[4]).not.toHaveTextContent(/Unselect/i);
  });
});

describe("Product Component whilst Loading Products", () => {
  beforeEach(() =>
    renderWithProviders(<Products />, {
      preloadedState: {
        product: {
          ...productSlice.getInitialState(),
          productsLoadingStatus: LOADING_STATUS.LOADING,
          products: [],
        },
      },
    })
  );

  it("It displays mesage to user while awaiting Product API response", () => {
    // given
    // page rendered whilst loading products

    // when
    const loadingText = screen.getByText("Loading Products...");

    //then
    expect(loadingText).toBeVisible();
  });

  describe("Product Component when Loading Products Failed", () => {
    beforeEach(() =>
      renderWithProviders(<Products />, {
        preloadedState: {
          product: {
            ...productSlice.getInitialState(),
            productsLoadingStatus: LOADING_STATUS.FAILED,
            products: [],
          },
        },
      })
    );

    it("It displays mesage to user while awaiting Product API response", () => {
      // given
      // page rendered when loading products failed

      // when
      const somethingWrongText = screen.getByText("Something went wrong...");

      //then
      expect(somethingWrongText).toBeVisible();
    });
  });
});
