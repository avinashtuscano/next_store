"use client";
import { Loader2Icon } from "lucide-react";
import { LiaEditSolid } from "react-icons/lia";
import { LiaTrashSolid } from "react-icons/lia";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { deleteProduct } from "@/utils/actions";

type btnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: btnSize;
};

export function SubmitButton({
  className = "",
  text = "submit",
  size = "lg",
}: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      size={size}
      className={cn("capitalize", className)}
      disabled={pending}
    >
      {pending ? (
        <>
          {" "}
          <Loader2Icon className="animate-spin" />
          Please wait
        </>
      ) : (
        text
      )}
    </Button>
  );
}

export function EditButtonIcon() {
  return <EditButton></EditButton>;
}

export function DeleteButtonIcon({ id }: { id: string }) {
  const deleteProductWithId = deleteProduct.bind(null, id);
  return (
    <form action={deleteProductWithId}>
      <DeleteButton></DeleteButton>
    </form>
  );
}

export function DeleteButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="secondary"
      size="icon"
      className="size-8 p-2 cursor-pointer"
    >
      {pending ? <Loader2Icon className="animate-spin" /> : <LiaTrashSolid />}
    </Button>
  );
}

export function EditButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="secondary"
      size="icon"
      className="size-8 p-2 cursor-pointer"
    >
      {pending ? <Loader2Icon className="animate-spin" /> : <LiaEditSolid />}
    </Button>
  );
}
