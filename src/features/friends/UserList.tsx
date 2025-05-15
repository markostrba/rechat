import User from "@/components/User";

const UserList = ({ users, actionButtons }) => {
  return (
    <ul className="rounded-xl bg-white overflow-hidden">
      {users.map((user) => {
        return (
          <li
            className="p-2 border-b border-gray-300 flex justify-between items-center"
            key={user.userId}
          >
            <User
              name={user.username}
              photourl={user.photoUrl}
              avatarSize="size-12"
              showBadge={false}
            />
            {actionButtons && (
              <div className="flex gap-3">{actionButtons(user)}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
};

// {profile.requestedBy === user.userId ? (
//   <Button
//     className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
//     onClick={() =>
//       handleCancelFriendRequest(profile.userId, user.userId)
//     }
//   >
//     Cancel
//   </Button>
// ) : (
//   <>
//     <Button className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer">
//       Cancel
//     </Button>
//     <Button
//       className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
//       onClick={() =>
//         acceptFriendRequest(profile.userId, user?.userId)
//       }
//     >
//       Accept
//     </Button>
//   </>
// )}

export default UserList;
