import LoadingContainer from "@/components/global/LoadingContainer";
import SectionTitle from "@/components/global/SectionTitle";
import ProductsGrid from "@/components/products/ProductsGrid";
import { fetchUserFavourites } from "@/utils/actions";
import { Suspense } from "react";

async function Favorites() {
  const userFavs = await fetchUserFavourites();

  if (userFavs.length === 0) {
    return <SectionTitle text="You have no favorites yet."></SectionTitle>;
  }
  return (
    <>
      <SectionTitle text="Favourites" />
      <Suspense fallback={<LoadingContainer></LoadingContainer>}>
        <ProductsGrid products={userFavs} />
      </Suspense>
    </>
  );
}
export default Favorites;
