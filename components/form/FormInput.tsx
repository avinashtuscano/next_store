import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputType = {
  type: string;
  id?: string;
  name: string;
  defaultValue: string;
  label?: string;
  placeholder?: string;
};

function FormInput({
  type,
  id,
  name,
  defaultValue,
  label,
  placeholder,
}: FormInputType) {
  return (
    <div className="mb-2">
      <Label htmlFor={name} className="capitalize">
        {label || name}
      </Label>
      <Input
        type={type}
        name={name}
        id={id}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required
      ></Input>
    </div>
  );
}
export default FormInput;
