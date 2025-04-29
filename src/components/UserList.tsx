import React from 'react'
import User from './User'
import { useAuthStore } from '@/store/useAuthStore'
import { Button } from './ui/button'

const UserList = () => {
  const user = useAuthStore(state => state.user)

  return (
    <ul>
        <li className="hover:bg-gray-50 active:bg-gray-50 p-3 flex items-center justify-between">
            <User name={user?.username} photourl={user?.photoUrl} status="online" description="user online" />
            <div className='flex gap-2'>

            <Button>Confirm</Button>
            <Button>Reject</Button>      
            </div>
        </li>
    </ul>
  )
}

export default UserList