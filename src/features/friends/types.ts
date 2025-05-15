export type UserStatus = "online" | "offline";

export interface User {
  userId: string
  username: string,
  photoUrl: string,
}

export interface Friend extends User {
  status: UserStatus,
}

export interface FriendRequest extends User{
  requestedBy: string,
  status: "pending" | "declined" | "accepted",
}
