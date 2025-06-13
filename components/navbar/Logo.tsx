import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TfiLinux } from "react-icons/tfi";

function Logo() {
  return (
    <Button variant="outline" size="lg" asChild className="w-10 h-10">
      <Link href="/">
        <TfiLinux />
      </Link>
    </Button>
  );
}
export default Logo;
