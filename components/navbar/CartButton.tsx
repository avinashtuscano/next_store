import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LuShoppingCart } from "react-icons/lu";

async function CartButton() {
  const numItemsInCart = 9;
  return (
    <Button
      variant="outline"
      size="icon"
      asChild
      className="relative flex justify-center items-center"
    >
      <Link href="/cart">
        <LuShoppingCart />
        <span className="absolute -top-3 -right-3 bg-primary h-6 w-6 flex items-center justify-center rounded-full text-white">
          {numItemsInCart}
        </span>
      </Link>
    </Button>
  );
}
export default CartButton;
