import { ButtonHTMLAttributes, ReactNode } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  icon: ReactNode;
}

const ButtonIcon = ({ icon, className, ...props }: ButtonIconProps) => {
  return (
    <Button
      className={cn(
        "size-12 rounded-full  flex justify-center items-center border-[.5px] border-[rgb(0,0,0,0.1)] cursor-pointer",
        className
      )}
      {...props}
    >
      {icon}
    </Button>
  );
};

export default ButtonIcon;
