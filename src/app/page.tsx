import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      <h1 className="text-2xl text-center mb-20 font-semibold">
        This is the Product Comparison Next.js App
      </h1>

      <p className="text-center pt-10">
        Visit the{" "}
        <Link className="font-bold hover:text-pear-500" href="/products">
          Product Page
        </Link>{" "}
        to view all the product avaiable for comparison and "purchase"
      </p>
    </>
  );
}
