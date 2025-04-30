import React from "react";

const actions = [
  "Chart +",
  "Dividends & Earnings",
  "Sentiment",
  "Analyst Ratings",
  "Comparisons"
];

interface StackedButtonCardProps {
  className?: string;
  onTopicSelect?: (topic: string) => void;
}

export default function StackedButtonCard({ className, onTopicSelect }: StackedButtonCardProps) {
  return (
    <div className={`rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col gap-4 ${className || ''}`}>
      <div className="text-lg font-semibold mb-2">Research Topics</div>
      <div className="flex flex-col gap-3">
        {actions.map((action) => (
          <button
            key={action}
            className="w-full bg-teal-600 text-white rounded-md rounded-bl-none py-2 px-4 text-sm font-medium hover:bg-teal-700 transition-colors"
            onClick={action === "Dividends & Earnings" && onTopicSelect ? () => onTopicSelect(action) : undefined}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
} 