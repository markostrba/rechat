import { Button } from "@/components/ui/button";
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
import { useAuthStore } from "@/store/useAuthStore";
import { CircleFadingPlus, UserRoundPlus } from "lucide-react";

const SideBarHeader = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="flex  items-center justify-between">
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

      <div className="flex gap-2">
        <Button>
          <UserRoundPlus />
        </Button>
        <Button>
          <CircleFadingPlus />
        </Button>
      </div>
    </header>
  );
};

export default SideBarHeader;
