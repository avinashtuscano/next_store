import { Separator } from "@/components/ui/separator";

function SectionTitle({ text }: { text: string }) {
  return (
    <div>
      <h2 className="text-3xl tracking-wider mb-8 font-medium">{text}</h2>
      <Separator></Separator>
    </div>
  );
}
export default SectionTitle;
