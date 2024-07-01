function Profile({icon, username}) {
  return (
    <div className="flex flex-col items-center">
      <img
        className="size-32 aspect-square rounded-full object-cover"
        src={icon}
      />
      <p className="py-2 text-lg font-semibold text-stone-700">
        {username}
      </p>
    </div>
  );
}

export default Profile;
