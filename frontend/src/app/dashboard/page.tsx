import Navbar from "@/components/layout/Navbar";
import DashboardStats from "@/components/dashboard/DashboardStats";
import CategorySummary from "@/components/dashboard/CategorySummary";
import RectifierCard from "@/components/rectifier/RectifierCard";
import QuickAdd from "@/components/transaction/QuickAdd";
import TransactionList from "@/components/transaction/TransactionList";
import BudgetCard from "@/components/budget/BudgetCard";
import MonthSelector from "@/components/transaction/MonthSelector";


export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="mx-auto max-w-md space-y-5 p-4">

        <MonthSelector />
        <DashboardStats />
        <BudgetCard />

        <CategorySummary />

        <QuickAdd />

        <RectifierCard />

        <TransactionList />

      </div>

    </main>
  );
}