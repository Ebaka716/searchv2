import React from "react";
import { Button } from "@/components/ui/button";

const actions = [
<<<<<<< HEAD
  "Chart +",
  "Dividends & Earnings",
  "Sentiment",
  "Analyst Ratings",
  "Comparisons"
=======
  "Chart+",
  "Dividends & Earnings",
  "Sentiment",
  "Analyst Ratings",
  "Statistics"
>>>>>>> turphSearchv2
];

interface StackedButtonCardProps {
  className?: string;
<<<<<<< HEAD
  onTopicSelect?: (topic: string) => void;
}

export default function StackedButtonCard({ className, onTopicSelect }: StackedButtonCardProps) {
  return (
    <div className={`rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col gap-4 ${className || ''}`}>
      <div className="text-lg font-semibold mb-2">Research Topics</div>
      <div className="flex flex-col gap-3">
=======
  title?: string;
}

export default function StackedButtonCard({
  className,
  title = "Quick Actions",
}: StackedButtonCardProps) {
  return (
    <div className={`rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col gap-4 ${className || ''}`}>
      <div className="text-lg font-semibold mb-2">{title}</div>
      <div className="flex flex-col gap-3 items-start">
>>>>>>> turphSearchv2
        {actions.map((action) => (
          <Button
            key={action}
<<<<<<< HEAD
            className="w-full bg-teal-600 text-white rounded-md rounded-bl-none py-2 px-4 text-sm font-medium hover:bg-teal-700 transition-colors"
            onClick={action === "Dividends & Earnings" && onTopicSelect ? () => onTopicSelect(action) : undefined}
=======
            variant="conversational"
>>>>>>> turphSearchv2
          >
            {action}
          </Button>
        ))}
      </div>
    </div>
  );
} 