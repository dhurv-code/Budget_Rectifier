export interface Suggestion {
  title: string;
  description: string;
  savings: number;
}

export function generateSuggestions(transactions: any[]): Suggestion[] {
  const suggestions: Suggestion[] = [];

  const categoryMap: Record<string, number[]> = {};

  transactions.forEach((t) => {
    if (!categoryMap[t.category]) {
      categoryMap[t.category] = [];
    }

    categoryMap[t.category].push(Number(t.amount));
  });

  Object.entries(categoryMap).forEach(([category, amounts]) => {
    const smallTransactions = amounts.filter((a) => a <= 100);

    if (smallTransactions.length >= 10) {
      const total = smallTransactions.reduce((a, b) => a + b, 0);

      suggestions.push({
        title: `${category} Spending`,
        description: `You made ${smallTransactions.length} small ${category} purchases. Reducing them by 50% could help.`,
        savings: total / 2,
      });
    }
  });

  return suggestions
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 3);
}