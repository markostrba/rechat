import Status, { TStatusTypes } from "@/components/status"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { ReactNode } from "react"


interface IUserProps {
    name: string,
    photourl: string | undefined,
    status: TStatusTypes,
    showStatus?: boolean,
    description?: string,
    className?: string,
}

const User = ({name, photourl, status, showStatus = true, description, className}: IUserProps) => {
  console.log("sdsf", photourl)
  
    return (
    <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative">
        <Avatar className="size-15">
            <AvatarImage src={photourl} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {showStatus &&         <Status status={status} className="absolute right-[0.125rem] bottom-2" />   
        }

    </div>
    <div className="flex flex-col">

         <span className="text-xl">{name}</span>
         {description && <span className="text-lg leading-none">{description}</span>}
    </div>



    </div>
  )
}

export default User