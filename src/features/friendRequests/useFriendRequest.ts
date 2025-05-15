import { useEffect, useState } from "react";
import { User } from "../friends/types";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuthStore } from "@/store/useAuthStore";
import { FriendRequest } from "../friends/types";

export default function useFriendRequest() {
    const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const currentUser = useAuthStore(state => state.user) as User;


    useEffect(() => {
        setIsLoading(true)
        const unsub = onSnapshot(
            collection(db, "users", currentUser.userId, "friends"), async (querySnapshot) => {
                for (const change of querySnapshot.docChanges()) {
                    const friendId = change.doc.id;
                    const friendDocData = change.doc.data();

                    if (change.type === "added") {
                        switch (friendDocData.status) {
                            case "pending": {
                                const userDoc = await getDoc(doc(db, "users", friendId));
                                if (!userDoc.exists()) return setErrorMsg("User not found");
                                const userDocData = userDoc.data() as User;
   

                                setFriendRequests(prev => [...prev, {
                                    userId: userDocData.userId,
                                    photoUrl: userDocData.photoUrl,
                                    requestedBy: friendDocData.requestedBy,
                                    username: userDocData.username}])
                                break;
                            }
                            case "rejected":
                            case "accepted":
                                setFriendRequests(prev => prev.filter(req => req.userId !== friendId))
                                break;
                        }
                    } else if (change.type === "modified") {
                        switch (friendDocData.status) {
                            case "pending": {
                                const userDoc = await getDoc(doc(db, "users", friendId));
                                if (!userDoc.exists()) return setErrorMsg("User not found");
                                const userDocData = userDoc.data() as User;
   

                                setFriendRequests(prev => [...prev, {
                                    userId: userDocData.userId,
                                    photoUrl: userDocData.photoUrl,
                                    requestedBy: friendDocData.requestedBy,
                                    username: userDocData.username}])
                                break;
                            }
                            case "rejected":
                            case "accepted":
                                setFriendRequests(prev => prev.filter(req => req.userId !== friendId))
                                break;
                        }                        
                    }
                }
                setIsLoading(false)
            }
        )
        return () => unsub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        friendRequests,
        isLoading,
        errorMsg,
    }
}