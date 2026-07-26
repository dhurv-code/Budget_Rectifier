"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function AmountInput({
  value,
  onChange,
}: Props) {
  return (
    <input
      type="text"
      placeholder="₹ Amount"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-xl border p-4 text-2xl font-bold outline-none"
    />
  );
}