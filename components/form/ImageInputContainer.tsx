"use client";
import { Product, updateProductImageAction } from "@/utils/actions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ImageInput from "./ImageInput";
import { SubmitButton } from "./Buttons";

function ImageInputContainer({
  id,
  product,
}: {
  id: string;
  product: Product;
}) {
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  return (
    <div className="mb-8">
      <Image
        src={product.image}
        width={300}
        height={300}
        alt={product.name}
        className="w-[200] h-[200] rounded"
      ></Image>
      <Button
        className="mt-4"
        variant="outline"
        onClick={() => setIsUploadVisible(!isUploadVisible)}
      >
        Upload New Image
      </Button>
      {isUploadVisible && (
        <form action={updateProductImageAction}>
          <div className="mt-4 w-md">
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="url" value={product.image} />
            <ImageInput></ImageInput>
            <SubmitButton text="update image"></SubmitButton>
          </div>
        </form>
      )}
    </div>
  );
}
export default ImageInputContainer;
