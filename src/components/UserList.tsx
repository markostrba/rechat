import User from "./User";
import { useAuthStore } from "@/store/useAuthStore";
import { Button } from "./ui/button";

const friendList = [
  {
    username: "alice",
    photoUrl: "https://example.com/alice.jpg",
    status: "online",
  },
  { username: "bob", photoUrl: null, status: "offline" },
  {
    username: "carla",
    photoUrl: "https://example.com/carla.png",
    status: "online",
  },
  { username: "dave", photoUrl: null, status: "offline" },
];

const allUsers = [
  {
    username: "alice",
    photoUrl: "https://example.com/alice.jpg",
    status: "online",
    isAdded: true,
  },
  { username: "bob", photoUrl: null, status: "offline", isAdded: true },
  {
    username: "carla",
    photoUrl: "https://example.com/carla.png",
    status: "online",
    isAdded: true,
  },
  { username: "dave", photoUrl: null, status: "offline", isAdded: true },
  {
    username: "eve",
    photoUrl: "https://example.com/eve.jpg",
    status: "online",
    isAdded: false,
  },
  { username: "frank", photoUrl: null, status: "offline", isAdded: false },
];

const UserList = () => {
  const isSearching = false;
  const filteredResult = isSearching ? allUsers : friendList;

  return (
    <ul>
      {filteredResult.map((user) => {
        return (
          <li className="hover:bg-gray-50 active:bg-gray-50 p-3 flex items-center justify-between">
            <User
              name={user?.username}
              photourl={user?.photoUrl}
              status="online"
              description="user online"
            />
            <div className="flex gap-2">
              <Button>Confirm</Button>
              <Button>Reject</Button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default UserList;
