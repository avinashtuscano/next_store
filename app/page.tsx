import LoadingContainer from "@/components/global/LoadingContainer";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import { Suspense } from "react";

function Homepage() {
  return (
    <>
      <Hero></Hero>
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProducts></FeaturedProducts>
      </Suspense>
    </>
  );
}
export default Homepage;
