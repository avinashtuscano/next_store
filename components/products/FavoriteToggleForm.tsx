"use client";

import { addToFavorites } from "@/utils/actions";

import { FavouriteButton } from "../form/Buttons";
import { State } from "@/utils/types";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";

function FavoriteToggleForm({
  isFavourite,
  productId,
}: {
  isFavourite: string | null;
  productId: string;
}) {
  const initialState: State = { message: null };
  const [state, formAction] = useActionState(addToFavorites, initialState);
  useEffect(() => {
    if (state.message) {
      toast(`Message: ${state.message}`);
    }
  }, [state]);

  return (
    <form action={formAction}>
      <input
        type="text"
        name="productId"
        id="productId"
        value={productId}
        hidden
        readOnly
      ></input>
      <FavouriteButton isFavourite={isFavourite} />
    </form>
  );
}
export default FavoriteToggleForm;
