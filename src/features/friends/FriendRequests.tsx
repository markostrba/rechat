import { useEffect, useState } from "react";
import { TUser, useAuthStore } from "@/store/useAuthStore";
import { Spinner } from "@/components/ui/spinner";
import UserList from "./UserList";
import { Button } from "@/components/ui/button";
import { FriendRequest } from "./types";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { toast } from "sonner";
import useFriendActions from "./useFriendActions";

const FriendRequests = ({ open }: { open: boolean }) => {
  const [isLoading, setIsloading] = useState(false);
  const [friendRequests, setFriendRequests] = useState([]);
  const { rejectRequest, acceptRequest, isActionButtonLoading, errorMsg } =
    useFriendActions();

  const currentUser = useAuthStore((state) => state.user) as TUser;

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "users", currentUser.userId, "friends"),
      async (querySnapshot) => {
        for (const change of querySnapshot.docChanges()) {
          const friendId = change.doc.id;
          const friendDocData = change.doc.data();

          if (change.type === "added") {
            switch (friendDocData.status) {
              case "pending":
                console.log("pending added");
                const userDoc = await getDoc(doc(db, "users", friendId));
                const userDocData = userDoc.data();
                setFriendRequests((prev) => [
                  ...prev,
                  {
                    userId: userDocData.userId,
                    photoUrl: userDocData.photoUrl,
                    requestedBy: friendDocData.requestedBy,
                    username: userDocData.username,
                  },
                ]);
                return;
              case "rejected":
              case "accepted":
                console.log("accepted-rejected added", friendDocData);
                setFriendRequests((prev) =>
                  prev.filter((req) => req.userId !== friendId)
                );
                return;
            }
          }

          if (change.type === "modified") {
            switch (friendDocData.status) {
              case "pending":
                console.log("pending modified");
                const userDoc = await getDoc(doc(db, "users", friendId));
                const userDocData = userDoc.data();
                setFriendRequests((prev) => [
                  ...prev,
                  {
                    userId: userDocData.userId,
                    photoUrl: userDocData.photoUrl,
                    requestedBy: friendDocData.requestedBy,
                    username: userDocData.username,
                  },
                ]);
                return;
              case "rejected":
              case "accepted":
                console.log("accepted-rejected modified", friendDocData);
                setFriendRequests((prev) =>
                  prev.filter((req) => req.userId !== friendId)
                );
                return;
            }
          }
        }
      }
    );
    return () => unsub();
  }, []);

  const handleRejectFriendRequest = async (
    friendId: string,
    currentUserId: string
  ) => {
    await rejectRequest(friendId, currentUserId);

    if (errorMsg) toast.error(errorMsg);
    setFriendRequests((prev) => prev.filter((req) => req.userId !== friendId));
  };

  const handleAcceptFriendRequest = async (
    friendId: string,
    currentUserId: string
  ) => {
    await acceptRequest(friendId, currentUserId);
    if (errorMsg) toast.error(errorMsg);
    setFriendRequests((prev) => prev.filter((req) => req.userId !== friendId));
  };

  // useEffect(() => {
  //   if (!open) return;
  //   const fetch = async () => {
  //     setIsloading(true);
  //     const result = await getFriendRequests(currentUser.userId);
  //     console.log("friendRequests", result);
  //     setUsers(result);
  //     setIsloading(false);
  //   };
  //   fetch();
  // }, [open]);

  if (isLoading) return <Spinner />;

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
};

export default FriendRequests;
