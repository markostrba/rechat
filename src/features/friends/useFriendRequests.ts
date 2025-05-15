import { useEffect, useState } from "react";
import { FriendRequest } from "./types";
import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useAuthStore } from "@/store/useAuthStore";

export default function useFriendRequests() {
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>([]);
  const currentUser = useAuthStore(state => state.user);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "users", currentUser.userId, "friends"), async (querySnapshot) => {
      for (const change of querySnapshot.docChanges()) {
        const friendId = change.doc.id;
        const friendDocData = change.doc.data();
        console.log("fff", friendDocData, change.type)

        if (change.type === "added") {
          switch(friendDocData.status) {
            case "pending":
              const userDoc = await getDoc(doc(db, "users", friendId));
              const userDocData = userDoc.data();
              setFriendRequests(prev => [...prev, {userId: userDocData.userId, photoUrl: userDocData.photoUrl, requestedBy: friendDocData.requestedBy, username: userDocData.username}])
              return;
            case "rejected":
            case "accepted":
              console.log("fff", friendDocData)
              setFriendRequests(prev => prev.filter(req => req.userId !== friendId))
              return
          }
        }

        if (change.type === "modified") {
          console.log("fff", friendDocData)

          switch(friendDocData.status) {
            case "pending":
              const userDoc = await getDoc(doc(db, "users", friendId));
              const userDocData = userDoc.data();
              setFriendRequests(prev => [...prev, {userId: userDocData.userId, photoUrl: userDocData.photoUrl, requestedBy: friendDocData.requestedBy, username: userDocData.username}])
              return;
            case "rejected":
            case "accepted":
              console.log("fff", friendDocData)
              setFriendRequests(prev => prev.filter(req => req.userId !== friendId))
              return
          }
        }
        
      }
    })
    return () => unsub();
  }, [])

  return {friendRequests}
}


/*
1. remove user obj from friendRequests state if obj.status === accepted | rejected,
2. useEffect  

*/