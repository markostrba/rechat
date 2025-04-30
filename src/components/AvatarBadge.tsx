import { Settings } from "lucide-react";

export type TAvatarBadgeTypes = "online" | "offline" | "settings";

const badgeClasses = {
  online: "bg-green-400",
  offline: "bg-stone-500",
  settings: "bg-stone-300",
};

interface IAvatarBadgeTypes {
  badge: TAvatarBadgeTypes;
  className?: string;
}

const AvatarBadge = ({ badge, className }: IAvatarBadgeTypes) => {
  return (
    <div
      className={`size-4 rounded-full ${badgeClasses[badge]} ${className} outline outline-white outline-4.5 flex justify-center items-center`}
    >
      {badge === "settings" && <Settings className="size-3.5" />}
    </div>
  );
};

export default AvatarBadge;
