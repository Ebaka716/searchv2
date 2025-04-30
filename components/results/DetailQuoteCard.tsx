import React from "react";
import { Button } from "@/components/ui/button";

// Add props interface
interface DetailQuoteCardProps {
  title?: string;
}

export default function DetailQuoteCard({ title = "Detailed Quote" }: DetailQuoteCardProps) {
  // Table rows as an array for easier mapping and separator logic
  const rows = [
    ["Open", "176"],
    ["Previous close", "176.75"],
    ["P/E ratio", "28.5"],
    ["Options", "Available"],
    ["Current dividend/ex-date", "0.96 / Aug 10, 2024"],
    ["Estimated dividend rate/yield", "0.96 / 0.55%"],
    ["Sector", "Technology"],
    ["Market cap", "2.7T"],
  ];

  const questions = [
    "What is P/E ratio?",
    "How is market cap calculated?",
    "What are options?",
    "How are dividends paid?",
  ];

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6 w-full flex flex-col h-full">
      <div className="text-lg font-semibold mb-4">{title}</div>
      <table className="w-full text-sm">
        <tbody>
          {rows.map(([label, value], idx) => (
            <tr
              key={label}
              className={
                idx < rows.length - 1 ? "border-b border-gray-200" : undefined
              }
            >
              <td className="py-2 px-4 text-muted-foreground">{label}</td>
              <td className="py-2 px-4 text-right">{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex-1" />
      <div className="flex flex-col gap-3 mt-6 items-start">
        {questions.slice(0, 3).map((q) => (
          <Button
            key={q}
            variant="conversational"
          >
            {q}
          </Button>
        ))}
      </div>
    </div>
  );
} 