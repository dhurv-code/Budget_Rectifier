"use client";

import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export default function AuthButton({
  loading,
  children,
  ...props
}: Props) {
  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={`
        w-full
        rounded-xl
        bg-blue-600
        py-3
        text-white
        font-semibold
        transition
        hover:bg-blue-700
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${props.className ?? ""}
      `}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}