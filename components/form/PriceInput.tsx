import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const name = "price";

type FromInputNumberType = {
  defaultValue?: number;
};

function PriceInput({ defaultValue }: FromInputNumberType) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        price (£)
      </Label>
      <Input
        type="number"
        id={name}
        name={name}
        min={0}
        defaultValue={defaultValue || 100}
        required
      ></Input>
    </div>
  );
}
export default PriceInput;
