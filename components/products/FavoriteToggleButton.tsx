import { SignedIn } from "@clerk/nextjs";

import { isProductFavourite } from "@/utils/actions";
import FavoriteToggleForm from "./FavoriteToggleForm";

async function FavoriteToggleButton({ productId }: { productId: string }) {
  const isFavourite = await isProductFavourite(productId);
  console.log(isFavourite);
  return (
    <SignedIn>
      {/* <Button size="icon" variant="outline" className="p-2 cursor-pointer">
        {isFavourite ? <FaHeart /> : <FaRegHeart />}
      </Button> */}
      <FavoriteToggleForm isFavourite={isFavourite} productId={productId} />
    </SignedIn>
  );
}
export default FavoriteToggleButton;
