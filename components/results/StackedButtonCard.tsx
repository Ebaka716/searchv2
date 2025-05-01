import React from "react";
import { Button } from "@/components/ui/button";

const actions = [
  "Chart+",
  "Dividends & Earnings",
  "Sentiment",
  "Analyst Ratings",
  "Statistics"
];

interface StackedButtonCardProps {
  className?: string;
  title?: string;
  onAction?: (action: string) => void;
}

export default function StackedButtonCard({
  className,
  title = "Quick Actions",
  onAction,
}: StackedButtonCardProps) {
  return (
    <div className={`rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col gap-4 ${className || ''}`}>
      <div className="text-lg font-semibold mb-2">{title}</div>
      <div className="flex flex-col gap-3 items-start">
        {actions.map((action) => (
          <Button
            key={action}
            variant="conversational"
            onClick={() => onAction && onAction(action)}
          >
            {action}
          </Button>
        ))}
      </div>
    </div>
  );
} 