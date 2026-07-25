export interface Suggestion {
  title: string;
  message: string;
  savings: number;
}

export function generateSuggestions(transactions: any[]): Suggestion[] {
  const suggestions: Suggestion[] = [];

  if (!transactions.length) return suggestions;

  /* --------------------------
     Rule 1
     Frequent Small Purchases
  ---------------------------*/

  const categoryMap: Record<string, number[]> = {};

  transactions.forEach((t) => {
    if (!categoryMap[t.category]) {
      categoryMap[t.category] = [];
    }

    categoryMap[t.category].push(Number(t.amount));
  });

  Object.entries(categoryMap).forEach(([category, amounts]) => {
    const small = amounts.filter((a) => a <= 100);

    if (small.length >= 10) {
      const total = small.reduce((a, b) => a + b, 0);

      suggestions.push({
        title: "Frequent Small Purchases",
        message: `You made ${small.length} small ${category} purchases worth ₹${total}. Reducing them by half could save around ₹${Math.round(total / 2)}.`,
        savings: total / 2,
      });
    }
  });

  /* --------------------------
     Rule 2
     High Spending Category
  ---------------------------*/

  Object.entries(categoryMap).forEach(([category, amounts]) => {
    const total = amounts.reduce((a, b) => a + b, 0);

    if (total >= 3000) {
      suggestions.push({
        title: `${category} Spending`,
        message: `${category} is currently your highest spending category. Review whether some expenses can be reduced.`,
        savings: total * 0.15,
      });
    }
  });

  return suggestions
    .sort((a, b) => b.savings - a.savings)
    .slice(0, 3);
}