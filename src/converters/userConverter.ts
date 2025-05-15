import { User } from "@/features/friends/types";
import { FirestoreDataConverter, QueryDocumentSnapshot, SnapshotOptions  } from "firebase/firestore";

export const userConverter: FirestoreDataConverter<User> = {
    toFirestore(user: User) {
        return {
            userId: user.userId,
            username: user.username,
            photoUrl: user.photoUrl,
            status: user.status,
        }
    },
    fromFirestore(snapshot: QueryDocumentSnapshot, options: SnapshotOptions): User {
        const data = snapshot.data(options);
        return {
            userId: data.userId,
            username: data.username,
            photoUrl: data.photoUrl,
            status: data.status,
        }
    }
}