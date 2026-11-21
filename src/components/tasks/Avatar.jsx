const avatarColors = [
  "bg-indigo-500",
  "bg-sky-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-pink-500",
  "bg-violet-500",
];

// "Sara Mostafa" -> "SM"
const getInitials = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

const Avatar = ({ name }) => {
  const hash = [...name].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const color = avatarColors[hash % avatarColors.length];

  return (
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${color}`}
    >
      {getInitials(name)}
    </div>
  );
};

export default Avatar;
