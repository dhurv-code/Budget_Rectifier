"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import {
  getTransactions,
  createTransaction,
  deleteTransaction,
} from "@/services/transaction.service";

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  payment_mode: string;
  transaction_date: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  refreshTransactions: () => Promise<void>;
  addTransaction: (data: {
    amount: number;
    category: string;
    payment_mode: string;
  }) => Promise<void>;
  removeTransaction: (id: string) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | null>(null);

export function TransactionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  async function refreshTransactions() {
    setLoading(true);

    const data = await getTransactions();

    setTransactions(data as Transaction[]);

    setLoading(false);
  }

  async function addTransaction(data: {
    amount: number;
    category: string;
    payment_mode: string;
  }) {
    await createTransaction(data);
    await refreshTransactions();
  }

  async function removeTransaction(id: string) {
    await deleteTransaction(id);
    await refreshTransactions();
  }

  useEffect(() => {
    refreshTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        loading,
        refreshTransactions,
        addTransaction,
        removeTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error(
      "useTransactions must be used inside TransactionProvider"
    );
  }

  return context;
}