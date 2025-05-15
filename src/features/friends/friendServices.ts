import { db } from "@/lib/firebase/config";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  updateDoc,
  doc,
  getDoc,
  limit,
} from "firebase/firestore";
import { Friend, FriendRequest } from "./types";
import { friendConverter } from "@/converters/friendConverter";


export const searchUsers = async (input: string, currentUserId: string)  => {
  const q = query(
    collection(db, "users"),
    where("username", ">=", input),
    where("username", "<=", input + "\uf8ff"),
    limit(10)
  );

  const snapshot = await getDocs(q);

  const result = snapshot.docs
  .map((doc) => {
    const user = doc.data()
    return user
    // return {
    //   userId: user.userId,
    //   username: user.username,
    //   photoUrl: user.photoUrl,
    // }
  })
  .filter((user) => user.userId !== currentUserId); // exclude self

  return result
};

export const sendFriendRequest = async (friendId: string, currentUserId: string): Promise<void> => {
  const currentUserFriendRef = doc(db, "users", currentUserId, "friends", friendId).withConverter(friendConverter);
  const friendRef = doc(db, "users", friendId, "friends", currentUserId).withConverter(friendConverter);

  const currentUserFriendSnapshot = await getDoc(currentUserFriendRef);
  const friendSnapshot = await getDoc(friendRef);

  if (!friendSnapshot.exists()) {
    throw new Error("Friend not found");
  }
  

  const currentUserFriendDoc = doc(db, "users", currentUserId, "friends", friendId)
  const friendUserFriendDoc = doc(db, "users", friendId, "friends", currentUserId)

  const currentUserFriendDocData = (await getDoc(currentUserFriendDoc)).data();

  if (currentUserFriendDocData) {
    switch(currentUserFriendDocData.status) {
      case "accepted":
        throw new Error("Friend request was already accepted");
    }
  }
  await setDoc(friendUserFriendDoc, { status: "pending", requestedBy: currentUserId });
  await setDoc(currentUserFriendDoc, { status: "pending", requestedBy: currentUserId });
};

export const rejectFriendRequest = async (friendId: string, currentUserId: string) => {
  const currentUserFriendDoc = doc(db, "users", currentUserId, "friends", friendId)
  const friendUserFriendDoc = doc(db, "users", friendId, "friends", currentUserId)

  const currentUserFriendDocData = (await getDoc(currentUserFriendDoc)).data();

  if (currentUserFriendDocData) {
    switch(currentUserFriendDocData.status) {
      case "accepted":
        throw new Error("Friend request was already accepted");
      case "rejected":
        throw new Error("Friend request was already rejected");
    }
  }


  await updateDoc(friendUserFriendDoc, { status: "rejected" });
  await updateDoc(currentUserFriendDoc, { status: "rejected" });
};

export const acceptFriendRequest = async (friendId: string, currentUserId: string): Promise<Friend> => {
  const currentUserFriendDoc = doc(db, "users", currentUserId, "friends", friendId)
  const friendUserFriendDoc = doc(db, "users", friendId, "friends", currentUserId)

  const currentUserFriendDocData = (await getDoc(currentUserFriendDoc)).data();

  if (currentUserFriendDocData) {
    switch(currentUserFriendDocData.status) {
      case "accepted":
        throw new Error("Friend request was already accepted");
      case "rejected":
        throw new Error("Friend request was already rejected");
    }
  }
  
  const friendUserDoc = await getDoc(doc(db, "users", friendId));
  const friendUserDocData = friendUserDoc.data();

  if (!friendUserDocData) throw new Error("User not found")


  await updateDoc(friendUserFriendDoc, { status: "accepted" });
  await updateDoc(currentUserFriendDoc, { status: "accepted" });

  return {
    userId: friendUserDocData.userId,
    username: friendUserDocData.username,
    photoUrl: friendUserDocData.photoUrl,
    status: friendUserDocData.status
  }
};

export const fetchFriendRequests = async (currentUserId: string): Promise<FriendRequest[]> => {
  const q = query(collection(db, "users", currentUserId, "friends"), where("status", "==", "pending"));
  const snapshot = await getDocs(q);
  
  return Promise.all(
    snapshot.docs.map(async (docSnap): Promise<FriendRequest> => {
      const friendId = docSnap.id;
      const userDocSnap = await getDoc(doc(db, "users", friendId));
      const userData = userDocSnap.data();

      if (!userData) throw new Error("Friend request data not found");

      return {
        userId: userData.userId,
        username: userData.username,
        photoUrl: userData.photoUrl,
        requestedBy: docSnap.data().requestedBy,
        status: docSnap.data().status

      };
    })
  );
};

export const fetchFriends = async (currentUserId: string) => {
  const friendsSnapshot = await getDocs(collection(db, "users", currentUserId, "friends"));

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
    } 
  });

  const friends = (await Promise.all(friendDataPromises)).filter(Boolean);
  return friends  
}