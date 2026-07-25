"use client";

interface Props {
  title: string;
  selected: boolean;
  onClick: () => void;
}

export default function CategoryButton({
  title,
  selected,
  onClick,
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl border p-4 font-semibold transition ${
        selected
          ? "bg-blue-600 text-white"
          : "bg-white hover:bg-gray-100"
      }`}
    >
      {title}
    </button>
  );
}