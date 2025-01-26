import { render, screen } from "@testing-library/react";
import IndexPage from "../../src/app/page";
import { StoreProvider } from "../../src/app/StoreProvider";

describe("IndexPage", () => {
  it("renders a heading", () => {
    // given
    render(
      <StoreProvider>
        <IndexPage />
      </StoreProvider>
    );
    
    // when
    const incrementText = screen.getByText(/Product Comparison Next.js App/i);

    //then
    expect(incrementText).toBeInTheDocument();
    // const heading = screen.getByRole("heading", { level: 1 });
    // expect(heading).toBeInTheDocument();
  });
});
