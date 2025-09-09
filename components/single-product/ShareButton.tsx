"use client";
import { Button } from "@/components/ui/button";
import { LuShare2 } from "react-icons/lu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  EmailShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailIcon,
  TwitterIcon,
  RedditIcon,
} from "react-share";

function ShareButton({ productId, name }: { productId: string; name: string }) {
  const domain = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const url = `${domain}/products/${productId}`;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="cursor-pointer">
          <LuShare2 />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        sideOffset={10}
        className="flex items-center gap-x-2 justify-center w-full"
      >
        <TwitterShareButton url={url} title={name}>
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>
        <RedditShareButton url={url} title={name}>
          <RedditIcon size={32} round={true} />
        </RedditShareButton>
        <EmailShareButton url={url} subject={name}>
          <EmailIcon size={32} round={true} />
        </EmailShareButton>
      </PopoverContent>
    </Popover>
  );
}
export default ShareButton;
