export type UserStatus = "online" | "offline";

export interface User {
  userId: string
  username: string,
  photoUrl: string,
  status: UserStatus,
  
}

export interface Friend extends User {
  status: UserStatus,
}

export type FriendRequest = Omit<User, "status"> & {
  requestedBy: string;
}