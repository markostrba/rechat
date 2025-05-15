import { useState } from "react"
import { acceptFriendRequest, fetchFriendRequests, rejectFriendRequest, searchUsers, sendFriendRequest } from "./friendServices";
import { FirebaseError } from "firebase/app";

export default function useFriend()  {
  const [isLoading, setIsLoading] = useState(false)
  const [isSearchLoading, setIsSearchLoading] = useState(false)
  const [isActionButtonLoading, setIsActionButtonLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [errorMsg, setErrorMsg] = useState("")

  const handleSearch = async (input: string, userId: string) => {
    setIsSearchLoading(true);
    const result = await searchUsers(input, userId)
    setSearchResult(result);
    setIsSearchLoading(false);
  }

  const requestFriend = async (friendId: string, userId: string) => {
    setIsActionButtonLoading(true);
    setErrorMsg("")
    try {
      await sendFriendRequest(friendId, userId);      
    } catch (err) {
      console.error(err);
      if (err instanceof FirebaseError) {
        if (err.code === "not-found") {
          setErrorMsg("User does not exists")
          return;
        }
        setErrorMsg("Something went wrong, please try again later")
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Something went wrong, please try again later");
      }
    } finally {
      setIsActionButtonLoading(false);
    }
  }

  const rejectRequest = async (friendId: string, userId: string) => {
    setIsActionButtonLoading(true);
    setErrorMsg("")
    try {
      await rejectFriendRequest(friendId, userId);
    } catch (err) {
      console.error(err);
      if (err instanceof FirebaseError) {
        if (err.code === "not-found") {
          setErrorMsg("User does not exists")
          return;
        }
        setErrorMsg("Something went wrong, please try again later")
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Something went wrong, please try again later");
      }
    } finally {
      setIsActionButtonLoading(false);
    }
  }

  const acceptRequest = async (friendId: string, userId: string) => {
    setIsActionButtonLoading(true);
    setErrorMsg("")
    try {
      await acceptFriendRequest(friendId, userId);
    } catch (err) {
      console.error(err);
      if (err instanceof FirebaseError) {
        if (err.code === "not-found") {
          setErrorMsg("User does not exists")
          return;
        }
        setErrorMsg("Something went wrong, please try again later")
      } else if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("Something went wrong, please try again later");
      }
    } finally {
      setIsActionButtonLoading(false);
    }
  }  

  const getFriendRequests = async (userId: string) => {
    setIsLoading(true);
    const result = await fetchFriendRequests(userId);
    setIsLoading(false);
    return result
  }

  const getFriends = async (userId: string) => {
    setIsLoading(true);
    const result = await fetchFriendRequests(userId);
    setIsLoading(false);
    return result
  }

  return {isLoading, isSearchLoading, searchResult, isActionButtonLoading,handleSearch, requestFriend, rejectRequest, acceptRequest, getFriendRequests, getFriends, errorMsg }

}
