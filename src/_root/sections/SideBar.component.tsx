import { useAuthStore } from "@/store/useAuthStore";
import { EllipsisVertical, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import User from "@/components/User";
import UserList from "@/components/UserList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SideBarHeader from "./sidebar/SideBarHeader.component";

const SideBar = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="w-screen">
      <section className="w-full p-3 pt-5 border-b border-gray-300 bor">
        <SideBarHeader />
        <div className="relative mt-5 pb-2">
          <Input type="text" placeholder="Search friends..." className="py-5" />
          <Search className="opacity-40 absolute size-5 right-3 top-3" />
        </div>
      </section>
      <section className="">
        <div className="p-3 pb-0 flex justify-between text-lg font-medium">
          <span className="">Messages</span>
          <span className="cursor-pointer opacity-50 hover:opacity-60 active:opacity-60">
            Requests
          </span>
        </div>
        <UserList />
      </section>
    </aside>
  );
};

export default SideBar;
