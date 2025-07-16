import { currentUser } from "@clerk/nextjs/server";

import { LuUser } from "react-icons/lu";

async function UserIcon() {
  // Get the userId from auth() -- if null, the user is not signed in
  // const { userId } = await auth(); - Import auth from "@clerk/nextjs/server"

  const user = await currentUser();
  const profileImg = user?.imageUrl;
  if (profileImg) {
    return (
      <img src={profileImg} className="w-6 h-6 rounded-full object-cover" />
    );
  }
  return <LuUser className="w-6 h-6 bg-primary rounded-full text-white" />;
}
export default UserIcon;
