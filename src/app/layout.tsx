import type { ReactNode } from "react";
import { StoreProvider } from "./StoreProvider";
import { Nav } from "../components/Nav";

import "@/src/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Montserrat } from "next/font/google";

interface Props {
  readonly children: ReactNode;
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["300", "600"],
});

export const metadata: Metadata = {
  title: "Product Comparison Next.js App",
};

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang="en" className={montserrat.className}>
        <body>
          <section>
            <Nav />

            <main className="max-w-5xl mx-auto px-4 xl:px-0 pt-16 lg:pt-10 pb-24">
              {children}
            </main>

            <footer>
              <p className="text-center text-sm m-10">&copy; Ashton H. 2025</p>
            </footer>
          </section>
        </body>
      </html>
    </StoreProvider>
  );
}
