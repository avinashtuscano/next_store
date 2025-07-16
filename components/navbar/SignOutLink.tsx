"use client";
import { SignOutButton } from "@clerk/nextjs";

import { toast } from "sonner";

function SignOutLink() {
  const handleLogout = () => {
    toast("Logging out...");
  };

  return (
    <SignOutButton>
      {/* <Link
        href="/"
        className="capitalize w-full text-left"
        onClick={handleLogout}
      >
        logout
      </Link> */}
      <button
        className="capitalize w-full text-left cursor-pointer"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </SignOutButton>
  );
}
export default SignOutLink;
