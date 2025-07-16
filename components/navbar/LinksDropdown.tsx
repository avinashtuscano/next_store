import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TfiAlignLeft } from "react-icons/tfi";
import { links } from "@/utils/links";
import Link from "next/link";
import UserIcon from "./UserIcon";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import SignOutLink from "./SignOutLink";

function LinksDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-4">
          <TfiAlignLeft />
          {/* <FiUser /> */}
          <UserIcon />
        </Button>
      </DropdownMenuTrigger>
      <SignedOut>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuItem>
            <SignInButton mode="modal">
              <button className="w-full text-left cursor-pointer">Login</button>
            </SignInButton>
          </DropdownMenuItem>
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem>
            <SignUpButton mode="modal">
              <button className="w-full text-left cursor-pointer">
                Register
              </button>
            </SignUpButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </SignedOut>
      <SignedIn>
        <DropdownMenuContent className="w-56" align="start">
          {links.map((link) => {
            return (
              <DropdownMenuItem key={link.href}>
                <Link href={link.href} className="capitalize w-full">
                  {link.label}
                </Link>
              </DropdownMenuItem>
            );
          })}
          <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem>
            <SignOutLink />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </SignedIn>
    </DropdownMenu>
  );
}
export default LinksDropdown;
