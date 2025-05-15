//import AddFriendPopover from "@/components/AddFriendPopover";
import ButtonIcon from "@/components/ButtonIcon";
import SearchBox from "@/components/SearchBox";
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

import User from "@/components/User";
import AddFriendPopover from "@/features/friends/AddFriendPopover";
import { useAuthStore } from "@/store/useAuthStore";
import { CircleFadingPlus, Search, UserRoundPlus } from "lucide-react";

const SideBarHeader = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="w-full p-3 pt-5">
      <div className="flex items-center justify-between mb-3">
        <AddFriendPopover />

        <ButtonIcon icon={<CircleFadingPlus className="size-6.5" />} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <User
              name={user!.username}
              photourl={user!.photoUrl}
              badge="settings"
              className="cursor-pointer"
              description="user online"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56"
            align="start" // or "end", "center"
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <span>Account settings</span>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <span>Theme</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <span>Default Theme</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Always Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Always Dark</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuGroup>

            <DropdownMenuItem>
              <span className="text-red-500">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <SearchBox startElement={<Search className="size-5.5" />} />
    </header>
  );
};

export default SideBarHeader;
