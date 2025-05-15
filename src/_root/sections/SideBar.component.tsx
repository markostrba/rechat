import UserList from "@/components/UserList";
import SideBarHeader from "./sidebar/SideBarHeader.component";
import { Separator } from "@/components/ui/separator";
const SideBar = () => {
  return (
    <aside className="w-screen">
      <SideBarHeader />
      <Separator />
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
