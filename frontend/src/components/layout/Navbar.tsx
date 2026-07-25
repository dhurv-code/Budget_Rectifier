"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 border-b bg-black">

      <div className="mx-auto flex h-16 max-w-md items-center justify-between px-4">

        <Link
          href="/dashboard"
          className="px-20 text-xl font-bold text-white"
        >
          Budget Rectifier
        </Link>

        <Link
          href="/settings"
          className="rounded-lg border px-4 py-2"
        >
          Settings
        </Link>

      </div>

    </header>
  );
}