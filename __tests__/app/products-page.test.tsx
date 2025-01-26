import { act, render, screen } from "@testing-library/react";
import ProductsPage from "@app/(routes)/products/page";
import { renderWithProviders } from "@/src/utils/store-test-utils";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import { mockProducts } from "@/src/utils/mock-data";

export const env = {
  productCompareLimit: process.env.NEXT_PUBLIC_PRODUCT_COMPARE_LIMIT,
  fakeStoreApiBaseUrl: process.env.NEXT_PUBLIC_FAKE_STORE_API_BASE_URL,
};

const handlers = [
  http.get(env.fakeStoreApiBaseUrl + "/products", async () => {
    await delay(200);
    return HttpResponse.json(mockProducts);
  }),
];

const server = setupServer(...handlers);

describe("Product Page with Products", () => {
  beforeAll(() => server?.listen());

  afterEach(() => server?.resetHandlers());

  afterAll(() => server?.close());

  test("Page Render Snapshot", async () => {
    const page = renderWithProviders(<ProductsPage />);

    expect(page).toMatchSnapshot();
  });

  it("It displays initial header and label text", () => {
    // given
    renderWithProviders(<ProductsPage />);

    // when
    const h1 = screen.getByRole("heading", { level: 1 });
    const h2 = screen.getByRole("heading", { level: 2 });
    const selectProductsPrompt = screen.getByText(
      /Select some products to diplay the comparison table here/,
      { selector: "p" }
    );
    const comparisonSectionTitle = screen.queryByText(/Products Compared/i, {
      selector: "h3",
    });

    //then
    expect(h1).toHaveTextContent("Products Page");
    expect(h2).toHaveTextContent(
      `Select Up To ${env.productCompareLimit} Products To Compare`
    );
    expect(selectProductsPrompt).toBeInTheDocument();
    expect(comparisonSectionTitle).not.toBeInTheDocument();
  });

  it("It displays mesage to user while awaiting Product API response", () => {
    // given
    renderWithProviders(<ProductsPage />);

    // when
    const loadingProductsText = screen.getByText(/Loading Products.../i);

    //then
    expect(loadingProductsText).toBeInTheDocument();
  });

  it("Renders Product Page with 5 Products", async () => {
    // given
    act(() => renderWithProviders(<ProductsPage />));

    // when
    await screen.findByText(/Products found \(5\)/i);

    //then
    expect(screen.getByText(/Product Title #1/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Title #2/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Title #3/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Title #4/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Title #5/i)).toBeInTheDocument();
  });

  it("It displays comparison section when products are selected", async () => {
    // given
    act(() => renderWithProviders(<ProductsPage />));

    // when
    await screen.findByText(/Products found \(5\)/i);

    const priceOrderButton = screen.getAllByRole("button", { name: /Select/i });
    await act(async () => await priceOrderButton[0].click());
    await act(async () => await priceOrderButton[1].click());

    //then
    const selectProductsPrompt = screen.queryByText(
      /Select some products to diplay the comparison table here/,
      { selector: "p" }
    );
    const comparisonSectionTitle = screen.queryByText(/Products Compared/i, {
      selector: "h3",
    });
    expect(comparisonSectionTitle).toBeInTheDocument();
    expect(selectProductsPrompt).not.toBeInTheDocument();
  });
});
