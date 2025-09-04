"use client";
// import { Button } from "@/components/ui/button";
import { addToFavorites } from "@/utils/actions";
// import { useFormStatus } from "react-dom";
// import { FaHeart } from "react-icons/fa";
// import { FaRegHeart } from "react-icons/fa";
// import { Loader2Icon } from "lucide-react";
import { FavouriteButton } from "../form/Buttons";

function FavoriteToggleForm({
  isFavourite,
  productId,
}: {
  isFavourite: string | null;
  productId: string;
}) {
  // const { pending } = useFormStatus();
  return (
    <form action={() => addToFavorites(productId)}>
      <FavouriteButton isFavourite={isFavourite} />
    </form>
  );
}
export default FavoriteToggleForm;
