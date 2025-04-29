import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/useAuthStore";
import Status from "@/components/status";
import { EllipsisVertical, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import User from "@/components/User";
import UserList from "@/components/UserList";

const SideBar = () => {
  const user = useAuthStore(state => state.user)
  console.log(user)
  return (
    <aside className="w-screen">
      <section className="w-full p-3 pt-5 border-b border-gray-300 bor">
        <div className="flex  items-center justify-between">
        <User name={user?.username} photourl={user?.photoUrl} status="online" description="user online"/>

        <EllipsisVertical className="cursor-pointer opacity-60 hover:opacity-90"/>
        </div>
        <div className="relative mt-5 pb-2">
          <Input type="text" placeholder="Search friends..." className="py-5" />
          <Search className="opacity-40 absolute size-5 right-3 top-3"  />
        </div>
      </section>
      <section className="">
      <div className="p-3 pb-0 flex justify-between text-lg font-medium">
        <span className="">Messages</span>
        <span className="cursor-pointer opacity-50 hover:opacity-60 active:opacity-60">Requests</span>
      </div>
      <UserList/>
      </section>
    </aside>
  );
};

export default SideBar;
