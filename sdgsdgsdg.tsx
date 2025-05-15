{
  /* <>
<ul className="rounded-xl bg-white overflow-hidden">
  {result.map((profile) => {
    return (
      <li
        className="p-2 border-b border-gray-300 flex justify-between items-center"
        key={profile.userId}
      >
        <User
          name={profile.username}
          photoUrl={profile.photoUrl}
          avatarSize="size-12"
          showBadge={false}
        />
        <div className="flex gap-3">
          {!isFriend(profile.userId) &&
            (friendRequests.some(
              (reqProfile) => reqProfile.userId === profile.userId
            ) ? (
              <>
                <Button
                  className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
                  onClick={() =>
                    handleCancelFriendRequest(
                      profile.userId,
                      user.userId
                    )
                  }
                >
                  Cancel
                </Button>
                {friendRequests.find(
                  (req) => req.userId === profile.userId
                ).requestedBy !== user?.userId && (
                  <Button
                    className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
                    onClick={() =>
                      acceptFriendRequest(
                        profile.userId,
                        user?.userId
                      )
                    }
                  >
                    Accept
                  </Button>
                )}
              </>
            ) : (
              <Button
                className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
                onClick={() =>
                  handleSendFriendRequest(profile, user.userId)
                }
              >
                Add
              </Button>
            ))}
        </div>
      </li>
    );
  })}
</ul>
</>

<ul className="rounded-xl bg-white overflow-hidden">
{friendRequests.map((profile) => {
  return (
    <li
      className="p-2 border-b border-gray-300 flex justify-between items-center"
      key={profile.userId}
    >
      <User
        name={profile.username}
        photourl={profile.photoUrl}
        avatarSize="size-12"
        showBadge={false}
      />
      <div className="flex gap-3">
        {profile.requestedBy === user.userId ? (
          <Button
            className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
            onClick={() =>
              handleCancelFriendRequest(
                profile.userId,
                user.userId
              )
            }
          >
            Cancel
          </Button>
        ) : (
          <>
            <Button className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer">
              Cancel
            </Button>
            <Button
              className="h-6 w-15 rounded-xl font-bold border border-gray-300/80 bg-zinc-200/60 text-black hover:bg-zinc-200 cursor-pointer"
              onClick={() =>
                acceptFriendRequest(profile.userId, user?.userId)
              }
            >
              Accept
            </Button>
          </>
        )}
      </div>
    </li>
  );
})}
</ul> */
}
