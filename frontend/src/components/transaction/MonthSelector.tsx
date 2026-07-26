"use client";

import { useMonth } from "@/context/MonthContext";

export default function MonthSelector() {
  const { selectedMonth, setSelectedMonth } = useMonth();

  function previousMonth() {
    setSelectedMonth(
      new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() - 1,
        1
      )
    );
  }

  function nextMonth() {
    const today = new Date();

    // Prevent navigating into future months
    if (
      selectedMonth.getFullYear() === today.getFullYear() &&
      selectedMonth.getMonth() === today.getMonth()
    ) {
      return;
    }

    setSelectedMonth(
      new Date(
        selectedMonth.getFullYear(),
        selectedMonth.getMonth() + 1,
        1
      )
    );
  }

  return (
    <div className="flex items-center justify-between rounded-xl bg-white p-4 shadow">

      <button
        onClick={previousMonth}
        className="rounded-lg border px-4 py-2"
      >
        ←
      </button>

      <h2 className="text-lg font-bold">
        {selectedMonth.toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h2>

      <button
        onClick={nextMonth}
        className="rounded-lg border px-4 py-2"
      >
        →
      </button>

    </div>
  );
}