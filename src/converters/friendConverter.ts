import { Friend } from "@/features/friends/types";
import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions  } from "firebase/firestore";

export const friendConverter: FirestoreDataConverter<Friend> = {
    toFirestore(friend: Friend) {
        return {
            status: friend.status,
            requestedBy: friend.requestedBy,
        }
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): Friend {
        const data = snapshot.data(options);
        return {
            status: data.status,
            requestedBy: data.requestedBy,
        }
    }
}