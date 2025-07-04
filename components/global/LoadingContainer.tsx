import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "../ui/skeleton";

function LoadingContainer() {
  return (
    <section className="pt-24 ">
      {/* <SectionTitle text="featured products" /> */}
      <div className="pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <LoadingProduct />
        <LoadingProduct />

        <LoadingProduct />
      </div>
    </section>
  );
}
export default LoadingContainer;

function LoadingProduct() {
  return (
    <Card className="transform group-hover:shadow-xl transition-shadow duration-500">
      <CardContent className="p-4">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-4 w-3/4 mt-4" />
        <Skeleton className="h-4 w-1/4 mt-4" />
      </CardContent>
    </Card>
  );
}
