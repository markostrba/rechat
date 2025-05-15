import { useEffect, useState } from "react";
import { Search, UserRoundPlus, X } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ButtonIcon from "@/components/ButtonIcon";
import SearchBox from "../../components/SearchBox";
import FriendRequests from "./FriendRequests";
import { TUser, useAuthStore } from "@/store/useAuthStore";
import { searchUsers } from "./friendServices";
import UserList from "./UserList";
import useFriend from "./useFriend";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { User } from "./types";
import { db } from "@/lib/firebase/config";
import { collection, doc, onSnapshot } from "firebase/firestore";
const AddFriendPopover = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const currentUser = useAuthStore((state) => state.user) as TUser;
  const { isActionButtonLoading, requestFriend } = useFriend();

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.trim() === "") {
      setSearchResult([]);
    }
  };

  useEffect(() => {
    if (search.trim() === "") return;

    const handler = setTimeout(async () => {
      setIsLoading(true);
      const result = await searchUsers(search, currentUser.userId);
      console.log("search", result);
      setSearchResult(result);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(handler);
  }, [search]);

  return (
    <Popover open={isOpen} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <ButtonIcon
          className="bg-stone-100 hover:bg-stone-100 hover:brightness-90"
          icon={
            <>
              {isOpen ? (
                <X
                  className="size-6.5 opacity-70"
                  color="black"
                  strokeWidth={4}
                />
              ) : (
                <UserRoundPlus
                  className="size-6.5 ml-1 opacity-70"
                  color="black"
                />
              )}
            </>
          }
          title="Add friends"
        />
      </PopoverTrigger>
      <PopoverContent
        className="w-85 shadow-xl rounded-xl min-h-50 bg-zinc-50"
        align="start"
      >
        <div className="flex flex-col gap-3">
          <span className="text-center font-bold text-xl">Add friends</span>
          <SearchBox
            startElement={<Search className="size-5.5" />}
            value={search}
            onChange={handleSearch}
          />
          {search ? (
            <div>
              {isLoading && <Spinner />}
              <UserList
                users={searchResult}
                actionButtons={(user) => (
                  <Button
                    className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
                    disabled={isActionButtonLoading}
                    onClick={() =>
                      requestFriend(user.userId, currentUser.userId)
                    }
                  >
                    Add
                  </Button>
                )}
              />
            </div>
          ) : (
            <FriendRequests open={isOpen} />
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddFriendPopover;
