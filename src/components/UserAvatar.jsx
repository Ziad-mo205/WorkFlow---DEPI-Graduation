import { people } from "../data/tasks";

const sizes = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-[11px]",
};

const initialsOf = (name) =>
  name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

function UserAvatar({ name, size = "md" }) {
  const person = people[name] ?? {
    initials: initialsOf(name),
    color: "bg-gray-400",
  };

  return (
    <span
      role="img"
      aria-label={name}
      title={name}
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${sizes[size]} ${person.color}`}
    >
      {person.initials}
    </span>
  );
}

export default UserAvatar;
