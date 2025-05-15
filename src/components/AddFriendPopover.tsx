import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search, UserRoundPlus, X } from "lucide-react";
import ButtonIcon from "@/components/ButtonIcon";
import SearchBox from "./SearchBox";

import { db } from "@/lib/firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  serverTimestamp,
  setDoc,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import UserList from "./UserList";
import { useAuthStore } from "@/store/useAuthStore";
import { Spinner } from "./ui/spinner";
import User from "./User";
import { Button } from "./ui/button";
import { useFriendStore } from "@/store/useFriendStore";

const searchUsers = async (input: string, currentUserId: string) => {
  const q = query(
    collection(db, "users"),
    where("username", ">=", input),
    where("username", "<=", input + "\uf8ff"),
    limit(10)
  );

  const snapshot = await getDocs(q);

  const results = snapshot.docs
    .map((doc) => doc.data())
    .filter((user) => user.userId !== currentUserId); // exclude self

  return results;
};

const sendFriendRequest = async (friendId: string, currentUserId: string) => {
  try {
    const fromRef = doc(db, "users", currentUserId, "friends", friendId);
    const toRef = doc(db, "users", friendId, "friends", currentUserId);
    const fromSnap = await getDoc(fromRef);
    const snapData = fromSnap.data();
    if (snapData) {
      switch (snapData.status) {
        case "accepted":
          throw new Error("Friend request was already accepted");
      }
    }
    await setDoc(fromRef, {
      status: "pending",
      requestedBy: currentUserId,
    });

    await setDoc(toRef, {
      status: "pending",
      requestedBy: currentUserId,
    });
  } catch (err) {
    console.error(err);
  }
};

const rejectFriendRequest = async (friendId: string, currentUserId: string) => {
  try {
    const fromRef = doc(db, "users", currentUserId, "friends", friendId);
    const toRef = doc(db, "users", friendId, "friends", currentUserId);

    const fromSnap = await getDoc(fromRef);

    if (fromSnap.data().status !== "pending") {
      throw new Error("Friend request is not pending.");
    }

    await updateDoc(fromRef, {
      status: "rejected",
    });
    await updateDoc(toRef, {
      status: "rejected",
    });
  } catch (err) {
    console.error(err);
  }
};

const acceptFriendRequest = async (friendId: string, currentUserId: string) => {
  const fromRef = doc(db, "users", currentUserId, "friends", friendId);
  const toRef = doc(db, "users", friendId, "friends", currentUserId);

  const fromSnap = await getDoc(fromRef);
  console.log(fromSnap.data());
  if (fromSnap.data().status !== "pending") {
    throw new Error("Friend request is not pending.");
  }

  await Promise.all([
    updateDoc(fromRef, { status: "accepted" }),
    updateDoc(toRef, { status: "accepted" }),
  ]);
};
const fetchFriendRequests = async (currentUserId: string) => {
  const q = query(
    collection(db, "users", currentUserId, "friends"),
    where("status", "==", "pending")
  );

  const snapshot = await getDocs(q);
  const friendRefs = snapshot.docs;

  // Fetch user profile for each friend
  const usersData = await Promise.all(
    friendRefs.map(async (docSnap) => {
      const friendId = docSnap.id;
      const friendStatus = docSnap.data().status;
      const requestedBy = docSnap.data().requestedBy;
      const userDocRef = doc(db, "users", friendId);
      const userDocSnap = await getDoc(userDocRef);

      return {
        friendStatus,
        requestedBy,
        ...userDocSnap.data(),
      };
    })
  );

  return usersData;
};

const AddFriendPopover = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const user = useAuthStore((state) => state.user);
  const friends = useFriendStore((state) => state.friends);

  const isFriend = (userId) => {
    return friends.some((friend) => friend.userId === userId);
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
    setSearch("");
    setResult([]);
    setIsLoading(false);
  };

  const handleCancelFriendRequest = async (
    friendId: string,
    currentUserId: string
  ) => {
    await rejectFriendRequest(friendId, currentUserId);
    setFriendRequests((prev) =>
      prev.filter((profile) => profile.userId !== friendId)
    );
  };

  const handleSendFriendRequest = async (
    profile: {},
    currentUserId: string
  ) => {
    console.log("send", profile);
    await sendFriendRequest(profile.userId, currentUserId);
    setFriendRequests((prev) => [
      ...prev,
      { ...profile, status: "pending", requestedBy: currentUserId },
    ]);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (e.target.value.trim() === "") {
      setResult([]);
    }
  };

  const isInFriendRequest = (profileId: string) =>
    friendRequests.find((req) => req.userId === profileId);

  useEffect(() => {
    const fetch = async () => {
      const r = await fetchFriendRequests(user?.userId);
      console.log(r);
      setFriendRequests(r);
    };
    fetch();
  }, [open]);

  useEffect(() => {
    const handler = setTimeout(async () => {
      setIsLoading(true);
      if (search.trim() !== "") {
        const result = await searchUsers(search, user?.userId);
        console.log("searcing", result);
        setResult(result);
      }
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  return (
    <Popover open={open} onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <ButtonIcon
          className="bg-stone-100 hover:bg-stone-100 hover:brightness-90"
          icon={
            <>
              {open ? (
                <X
                  className="size-6.5 opacity-70"
                  color="black"
                  strokeWidth={4}
                />
              ) : (
                <UserRoundPlus
                  className="size-6.5 ml-1 opacity-70"
                  color="black"
                />
              )}
            </>
          }
          title="Add friends"
        />
      </PopoverTrigger>
      <PopoverContent
        className="w-85 shadow-xl rounded-xl min-h-50 bg-zinc-50"
        align="start"
      >
        <div className="flex flex-col gap-3">
          <span className="text-center font-bold text-xl">Add friends</span>
          <SearchBox
            startElement={<Search className="size-5.5" />}
            value={search}
            onChange={handleSearch}
          />
          {isLoading ? (
            <Spinner />
          ) : result.length ? (
            <>
              <ul className="rounded-xl bg-white overflow-hidden">
                {result.map((profile) => {
                  return (
                    <li
                      className="p-2 border-b border-gray-300 flex justify-between items-center"
                      key={profile.userId}
                    >
                      <User
                        name={profile.username}
                        photoUrl={profile.photoUrl}
                        avatarSize="size-12"
                        showBadge={false}
                      />
                      <div className="flex gap-3">
                        {!isFriend(profile.userId) &&
                          (friendRequests.some(
                            (reqProfile) => reqProfile.userId === profile.userId
                          ) ? (
                            <>
                              <Button
                                className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
                                onClick={() =>
                                  handleCancelFriendRequest(
                                    profile.userId,
                                    user.userId
                                  )
                                }
                              >
                                Cancel
                              </Button>
                              {friendRequests.find(
                                (req) => req.userId === profile.userId
                              ).requestedBy !== user?.userId && (
                                <Button
                                  className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
                                  onClick={() =>
                                    acceptFriendRequest(
                                      profile.userId,
                                      user?.userId
                                    )
                                  }
                                >
                                  Accept
                                </Button>
                              )}
                            </>
                          ) : (
                            <Button
                              className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
                              onClick={() =>
                                handleSendFriendRequest(profile, user.userId)
                              }
                            >
                              Add
                            </Button>
                          ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : friendRequests.length ? (
            <ul className="rounded-xl bg-white overflow-hidden">
              {friendRequests.map((profile) => {
                return (
                  <li
                    className="p-2 border-b border-gray-300 flex justify-between items-center"
                    key={profile.userId}
                  >
                    <User
                      name={profile.username}
                      photourl={profile.photoUrl}
                      avatarSize="size-12"
                      showBadge={false}
                    />
                    <div className="flex gap-3">
                      {profile.requestedBy === user.userId ? (
                        <Button
                          className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
                          onClick={() =>
                            handleCancelFriendRequest(
                              profile.userId,
                              user.userId
                            )
                          }
                        >
                          Cancel
                        </Button>
                      ) : (
                        <>
                          <Button className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer">
                            Cancel
                          </Button>
                          <Button
                            className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
                            onClick={() =>
                              acceptFriendRequest(profile.userId, user?.userId)
                            }
                          >
                            Accept
                          </Button>
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="bg-zinc-200/40 h-40 w-full rounded-xl flex justify-center items-center font-medium text-xs text-zinc-500">
              <span>New friend requests will appear here</span>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

/*

                              <Button className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer">
                                Cancel
                              </Button>
                              <Button className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer">
                                Accept
                              </Button>
*/

export default AddFriendPopover;
