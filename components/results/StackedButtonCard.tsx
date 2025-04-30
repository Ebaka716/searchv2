import React from "react";

const actions = [
  "View Account Details",
  "Make a Payment",
  "Request Statement",
  "Update Profile",
  "Contact Support"
];

interface StackedButtonCardProps {
  className?: string;
}

export default function StackedButtonCard({ className }: StackedButtonCardProps) {
  return (
    <div className={`rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col gap-4 ${className || ''}`}>
      <div className="text-lg font-semibold mb-2">Quick Actions</div>
      <div className="flex flex-col gap-3">
        {actions.map((action) => (
          <button
            key={action}
            className="w-full bg-teal-600 text-white rounded-md rounded-bl-none py-2 px-4 text-sm font-medium hover:bg-teal-700 transition-colors"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
} 