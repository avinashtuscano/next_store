"use client";
import { Product, updateProductAction } from "@/utils/actions";

import FormInput from "@/components/form/FormInput";
import PriceInput from "@/components/form/PriceInput";
import TextAreaInput from "@/components/form/TextAreaInput";
import { SubmitButton } from "@/components/form/Buttons";
import CheckboxInput from "@/components/form/CheckboxInput";
import { useActionState } from "react";
import { State } from "@/utils/types";
import { useEffect } from "react";
import { toast } from "sonner";

function EditForm({ id, product }: { id: string; product: Product }) {
  const { name, company, description, featured, price } = product;
  const initialState: State = { message: null };
  const [state, formAction] = useActionState(updateProductAction, initialState);
  useEffect(() => {
    if (state.message) {
      toast(`Message: ${state.message}`);
    }
  }, [state]);
  return (
    <form action={formAction}>
      <div className="grid gap-4 md:grid-cols-2 my-4">
        <input type="hidden" name="id" value={id} />
        <FormInput
          type="text"
          name="name"
          label="product name"
          defaultValue={name}
        />
        <FormInput
          type="text"
          name="company"
          label="company"
          defaultValue={company}
        />

        <PriceInput defaultValue={price} />
      </div>
      <TextAreaInput
        name="description"
        labelText="product description"
        defaultValue={description}
      />
      <div className="mt-6">
        <CheckboxInput
          name="featured"
          label="featured"
          defaultChecked={featured}
        />
      </div>
      <SubmitButton text="update product" className="mt-8" />
    </form>
  );
}
export default EditForm;
