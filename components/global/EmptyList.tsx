import { cn } from "@/lib/utils";

function EmptyList({
  text = "No items to display",
  className,
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div>
      <h2 className={cn("text-xl", className)}>{text}</h2>
    </div>
  );
}
export default EmptyList;
