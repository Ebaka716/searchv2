import React from "react";
import { Apple, RefreshCw, Sun, Plus, Bell, Filter, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppleSummaryCardProps {
  className?: string;
}

export default function AppleSummaryCard({ className }: AppleSummaryCardProps) {
  return (
    <div className={`rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col gap-4 ${className || ''}`}>
      {/* Top Row: Logo and Name */}
      <div className="flex items-center gap-2 mb-1">
        <Apple className="h-6 w-6 text-black" />
        <span className="text-lg font-semibold">Apple</span>
      </div>
      {/* Price Row */}
      <div className="flex items-center gap-3">
        <span className="text-3xl font-bold">$211.21</span>
        <span className="text-green-700 text-lg font-semibold">+1.07 (+0.51%)</span>
        <RefreshCw className="h-5 w-5 text-muted-foreground" />
      </div>
      {/* Pre-market Row */}
      <div className="flex items-center gap-2 text-sm">
        <Sun className="h-4 w-4 text-yellow-500" />
        <span className="underline decoration-dotted">Pre-market</span>
        <span className="font-semibold">209.4</span>
        <span className="text-xs text-muted-foreground">XNMS</span>
        <span className="text-red-600 font-semibold">-1.81 (-0.856967)</span>
      </div>
      {/* As of Line (moved below pre-market) */}
      <div className="text-xs text-muted-foreground">
        As of Apr-29-2025 4:00:00 PM ET | Quotes delayed at least 15 min. <span className="font-medium">Log in</span> for real-time quotes.
      </div>
      {/* Spacer to push buttons to bottom */}
      <div className="flex-1" />
      {/* Action Buttons Row */}
      <div className="flex items-center gap-2 mt-auto pt-2">
        <Button className="px-4 py-1 text-sm font-semibold bg-black text-white hover:bg-neutral-800">Buy</Button>
        <Button className="px-4 py-1 text-sm font-semibold bg-black text-white hover:bg-neutral-800">Sell</Button>
        <button className="border border-black text-black h-8 w-8 rounded flex items-center justify-center"><Plus className="h-4 w-4" /></button>
        <button className="border border-black text-black h-8 w-8 rounded flex items-center justify-center"><Bell className="h-4 w-4" /></button>
        <button className="border border-black text-black h-8 w-8 rounded flex items-center justify-center"><Filter className="h-4 w-4" /></button>
        <button className="border border-black text-black h-8 w-8 rounded flex items-center justify-center"><Link2 className="h-4 w-4" /></button>
      </div>
    </div>
  );
} 