import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const SideBar = () => {
  return (
    <aside className="p-3">
      <section>
        <div className="flex items-center gap-2">
          <Avatar className="size-15">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col font-medium leading-none">
            <span className="">username</span>
            <span className="">online</span>
          </div>
        </div>
      </section>
    </aside>
  );
};

export default SideBar;
