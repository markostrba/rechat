import { useState } from "react"
import { acceptFriendRequest, rejectFriendRequest, sendFriendRequest } from "./friendServices";
import { mapFirebaseError } from "@/lib/mapFirebaseError";
import { FirebaseError } from "firebase/app";


interface ActionButtonLoading {
  [friendId: string]: boolean
}

const useFriendActions = () => {
  const [isActionButtonLoading, setIsActionButtonLoading] = useState<ActionButtonLoading>({});
  const [errorMsg, setErrorMsg] = useState("")

  const requestFriend = async (friendId: string, userId: string) => {
    setIsActionButtonLoading(prev => ({...prev, [friendId]: true}));

    setErrorMsg("")
    try {
      await sendFriendRequest(friendId, userId);      
    } catch (err) {
      console.error(err);
      if (err instanceof FirebaseError) {
        const msg = mapFirebaseError(err.code);
        setErrorMsg(msg)
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Something went wrong, please try again later");
      }
    } finally {
      setIsActionButtonLoading(prev => ({...prev, [friendId]: false}));
    }
  }

  const rejectRequest = async (friendId: string, userId: string) => {
    setIsActionButtonLoading(prev => ({...prev, [friendId]: true}));
    setErrorMsg("")
    try {
      await rejectFriendRequest(friendId, userId);
    } catch (err) {
      console.error(err);
      if (err instanceof FirebaseError) {
        const msg = mapFirebaseError(err.code);
        setErrorMsg(msg)
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Something went wrong, please try again later");
      }
    } finally {
      setIsActionButtonLoading(prev => ({...prev, [friendId]: false}));
    }
  }

  const acceptRequest = async (friendId: string, userId: string) => {
    setIsActionButtonLoading(prev => ({...prev, [friendId]: true}));
    setErrorMsg("")
    try {
      await acceptFriendRequest(friendId, userId);
    } catch (err) {
      console.error(err);
      if (err instanceof FirebaseError) {
        const msg = mapFirebaseError(err.code);
        setErrorMsg(msg)
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Something went wrong, please try again later");
      }
    } finally {
      setIsActionButtonLoading(prev => ({...prev, [friendId]: false}));
    }
  }
  
  return {isActionButtonLoading, errorMsg, requestFriend, rejectRequest, acceptRequest}
}

export default useFriendActions