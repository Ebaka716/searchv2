"use client";
import React from "react";
import { Atom } from "lucide-react";
import AppleSummaryCard from "@/components/results/AppleSummaryCard";
import StackedButtonCard from "@/components/results/StackedButtonCard";
import StockChartCard from "@/components/results/StockChartCard";
import DetailQuoteCard from "@/components/results/DetailQuoteCard";
import MarketNewsCard from "@/components/results/MarketNewsCard";

export default function ResultsDisplaySearchV2() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full pt-12 mt-6 flex flex-col items-center justify-center">
        <Atom className="h-12 w-12 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <span className="rounded-full bg-muted p-2">
          <Atom className="h-8 w-8 text-primary" />
        </span>
        <span className="text-2xl font-bold tracking-tight">APPL</span>
      </div>
      {/* Cards Row */}
      <div className="flex items-start gap-6 w-full items-stretch">
        <AppleSummaryCard className="flex-[2]" />
        <StackedButtonCard className="flex-[1]" />
      </div>
      {/* Chart Row */}
      <div className="w-full">
        <StockChartCard />
      </div>
      {/* Detail Quote Row */}
      <div className="flex gap-6 w-full">
        <div className="flex-1"><DetailQuoteCard /></div>
        <div className="flex-1"><MarketNewsCard /></div>
      </div>
    </div>
  );
} 