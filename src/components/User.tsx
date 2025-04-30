import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import AvatarBadge, { TAvatarBadgeTypes } from "./AvatarBadge";

interface IUserProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  photourl: string | undefined;
  badge: TAvatarBadgeTypes;
  showBadge?: boolean;
  description?: string;
}

const User = React.forwardRef<HTMLDivElement, IUserProps>(
  (
    {
      name,
      photourl,
      badge,
      showBadge = true,
      description,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`flex items-center gap-2 ${className}`}
        role="button"
        tabIndex={0}
        {...props}
      >
        <div className="relative">
          <Avatar className="size-15">
            <AvatarImage src={photourl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          {showBadge && (
            <AvatarBadge
              badge="settings"
              className="absolute right-[0.125rem] bottom-1"
            />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-xl">{name}</span>
          {description && (
            <span className="text-lg leading-none">{description}</span>
          )}
        </div>
      </div>
    );
  }
);

export default User;
