"use client";

import { InputHTMLAttributes } from "react";

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function AuthInput({
  label,
  error,
  ...props
}: AuthInputProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>

      <input
        {...props}
        className={`
          w-full
          rounded-xl
          border
          border-gray-300
          px-4
          py-3
          text-base
          outline-none
          transition
          focus:border-blue-500
          focus:ring-2
          focus:ring-blue-200
          ${props.className ?? ""}
        `}
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}