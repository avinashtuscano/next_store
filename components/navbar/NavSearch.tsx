import { Input } from "@/components/ui/input";
function NavSearch() {
  return (
    <Input
      type="text"
      placeholder="search products..."
      className="max-w-xs dark:bg-muted"
    />
  );
}
export default NavSearch;
