import React from 'react'

export type TStatusTypes = "online" | "offline"

const statusClasses = {
    "online": "bg-green-400",
    "offline": "bg-stone-500"
}

interface IStatusProps {
    status: TStatusTypes
    className?: string,
}

const Status = ({status, className}: IStatusProps) => {
  return (
    <div className={`size-2.5 rounded-full ${statusClasses[status]} ${className}`}>

    </div>
  )
}

export default Status