import LoadingContainer from "@/components/global/LoadingContainer";
import ProductsContainer from "@/components/products/ProductsContainer";
import { Suspense } from "react";

export default async function ProductsPage(props: {
  searchParams?: Promise<{
    layout?: string;
    search?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const layout = searchParams?.layout || "grid";
  const search = searchParams?.search || "";

  return (
    <>
      <Suspense fallback={<LoadingContainer />}>
        <ProductsContainer layout={layout} search={search} />
      </Suspense>
    </>
  );
}
