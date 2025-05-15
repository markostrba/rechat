import { Spinner } from '@/components/ui/spinner'
import useFriendRequest from './useFriendRequest'
import useFriendActions from '../friends/useFriendActions'
import { toast } from 'sonner'
import UserList from '../friends/UserList'
import { Button } from '@/components/ui/button'
import { TUser, useAuthStore } from '@/store/useAuthStore'
import { FriendRequest } from '../friends/types'

const FriendRequests = () => {
    const { friendRequests, isLoading } = useFriendRequest()
    const { rejectRequest, acceptRequest, isActionButtonLoading, errorMsg } = useFriendActions()
    const currentUser = useAuthStore((state) => state.user) as TUser

    
    const handleRejectFriendRequest = async (
        friendId: string,
        currentUserId: string
      ) => {
        await rejectRequest(friendId, currentUserId);
        if (errorMsg) toast.error(errorMsg);      
    };
    
      const handleAcceptFriendRequest = async (
        friendId: string,
        currentUserId: string
      ) => {
        await acceptRequest(friendId, currentUserId);
        if (errorMsg) toast.error(errorMsg);
      };



  if (isLoading) return <Spinner />

  return (
    <div>
      {friendRequests.length ? (
        <UserList
          users={friendRequests}
          actionButtons={(user: FriendRequest) =>
            user.requestedBy === currentUser.userId ? (
              <Button
                className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
                disabled={isActionButtonLoading[user.userId]}
                onClick={() =>
                  handleRejectFriendRequest(user.userId, currentUser.userId)
                }
              >
                Cancel
              </Button>
            ) : (
              <>
                <Button
                  className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
                  disabled={isActionButtonLoading[user.userId]}
                  onClick={() =>
                    handleRejectFriendRequest(user.userId, currentUser.userId)
                  }
                >
                  Decline
                </Button>
                <Button
                  className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
                  disabled={isActionButtonLoading[user.userId]}
                  onClick={() =>
                    handleAcceptFriendRequest(user.userId, currentUser.userId)
                  }
                >
                  Accept
                </Button>
              </>
            )
          }
        />
      ) : (
        <div className="bg-zinc-200/40 h-40 w-full rounded-xl flex justify-center items-center font-medium text-xs text-zinc-500">
          <span>New friend requests will appear here</span>
        </div>
      )}
    </div>
  );
}

export default FriendRequests