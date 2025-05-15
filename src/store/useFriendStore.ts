import { create } from "zustand";
import { db } from "@/lib/firebase/config";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

interface Friend {
  userId: string;
  username: string;
  photoUrl: string;
  status: "online" | "offline";
  requestStatus: "pending" | "accepted";
}

interface FriendRequests {
  
}

interface FriendStore {
  friends: Friend[];
  fetchFriends: (userId: string) => Promise<void>;
  sendFriendRequest: (fromId: string, toId: string) => Promise<void>
}

export const useFriendStore = create<FriendStore>(set => ({
  friends: [],

  fetchFriends: async (userId) => {
    const friendsSnapshot = await getDocs(collection(db, "users", userId, "friends"));

    const friendDataPromises = friendsSnapshot.docs.map(async (friendDoc) => {
      const friendId = friendDoc.id;
      const friendStatusData = friendDoc.data();

      const userDoc = await getDoc(doc(db, "users", friendId));
      const userData = userDoc.data();

      if (!userData) return null;

      return {
        userId: friendId,
        username: userData.username,
        photoUrl: userData.photoUrl,
        status: userData.status,
        requestStatus: friendStatusData.requestStatus,
      } as Friend;
    });

    const friends = (await Promise.all(friendDataPromises)).filter(Boolean);
    set({ friends: friends as Friend[] });

  },

  sendFriendRequest: async (fromId, toId) => {
    const fromRef = doc(db, "users", fromId, "friends", toId);
    const toRef = doc(db, "users", toId, "friends", fromId);

    await setDoc(fromRef, {
      status: "pending",
      requestedBy: fromId,
      addedAt: serverTimestamp(),
    });

    await setDoc(toRef, {
      status: "pending",
      requestedBy: fromId,
      addedAt: serverTimestamp(),
    });

  }

}))