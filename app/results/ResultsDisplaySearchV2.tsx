"use client";
import React, { useRef } from "react";
import { Atom } from "lucide-react";
import AppleSummaryCard from "@/components/results/AppleSummaryCard";
import StackedButtonCard from "@/components/results/StackedButtonCard";
import StockChartCard from "@/components/charts/StockChartCard";
import DetailQuoteCard from "@/components/results/DetailQuoteCard";
import MarketNewsCard from "@/components/results/MarketNewsCard";
import { useSearchParams } from 'next/navigation';
import { DividendsCardShadcn } from "@/components/results/DividendsCardShadcn";
import { EarningsCardShadcn } from "@/components/results/EarningsCardShadcn";

export default function ResultsDisplaySearchV2() {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('query') || 'AAPL';
  const [history, setHistory] = React.useState<({ type: string; key?: string; query?: string })[]>([
    { type: "aapl", query: "AAPL" }
  ]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingSection, setLoadingSection] = React.useState<null | string>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const headerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Initial AAPL loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Listen for query changes and add to history if new
  React.useEffect(() => {
    if (
      currentQuery &&
      currentQuery !== 'AAPL' &&
      !history.some(h => h.query === currentQuery)
    ) {
      setLoadingSection(currentQuery);
      setHistory(prev => [
        ...prev,
        { type: 'loading', key: `loading-query-${Date.now()}`, query: currentQuery }
      ]);
      setTimeout(() => {
        setHistory(prev => {
          // Remove the last loading section and add the real section
          const withoutLoading = prev.filter(
            section => section.type !== 'loading' || section.query !== currentQuery
          );
          return [
            ...withoutLoading,
            { type: 'query', query: currentQuery }
          ];
        });
        setLoadingSection(null);
      }, 1200);
    }
  }, [currentQuery, history]);

  // Scroll to new result header
  React.useEffect(() => {
    if (history.length > 1 && bottomRef.current) {
      const lastIdx = history.length - 1;
      const headerEl = headerRefs.current[lastIdx];
      if (headerEl) {
        headerEl.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        bottomRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [history]);

  function handleAction(action: string) {
    if (action === "Dividends & Earnings") {
      setLoadingSection("dividends");
      setHistory((prev) => [
        ...prev,
        { type: "loading", key: `loading-dividends-${Date.now()}` }
      ]);
      setTimeout(() => {
        setHistory((prev) => {
          // Remove the last loading section and add the real section
          const withoutLoading = prev.filter(
            (section) => section.type !== "loading"
          );
          return [
            ...withoutLoading,
            { type: "dividends" }
          ];
        });
        setLoadingSection(null);
      }, 1200);
    }
  }

  if (isLoading) {
    return (
      <div className="w-full pt-[7.5rem] flex flex-col items-center justify-center gap-4">
        <Atom className="h-8 w-8 text-muted-foreground animate-spin" />
        <span className="text-lg text-muted-foreground">Loading results for &quot;AAPL&quot;</span>
      </div>
    );
  }

  return (
    <div id="results-content">
      {history.map((section, idx) => (
        <div key={section.key || section.query || idx} className="flex flex-col gap-6 p-6">
          {section.type === "aapl" && (
            <>
              <div className="flex items-center gap-2 mb-2" ref={el => { headerRefs.current[idx] = el; }}>
                <Atom className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="text-xl font-semibold">AAPL</span>
              </div>
              <div className="flex items-start gap-6 w-full items-stretch">
                <AppleSummaryCard className="flex-[2]" />
                <StackedButtonCard className="flex-[1]" title="Research topics" onAction={handleAction} />
              </div>
              <div className="w-full">
                <StockChartCard />
              </div>
              <div className="flex gap-6 w-full">
                <div className="flex-1"><DetailQuoteCard title="Detailed quote" /></div>
                <div className="flex-1"><MarketNewsCard /></div>
              </div>
            </>
          )}
          {section.type === "loading" && (
            <div className="w-full flex flex-col items-center justify-center gap-4 pt-8 pb-8">
              <Atom className="h-8 w-8 text-muted-foreground animate-spin" />
              <span className="text-lg text-muted-foreground">
                {section.query
                  ? `Loading results for: ${section.query}`
                  : loadingSection === 'dividends'
                    ? 'Loading results for: Dividends & Earnings'
                    : 'Loading...'}
              </span>
            </div>
          )}
          {section.type === "dividends" && (
            <>
              <div className="flex items-center gap-2 mb-2 mt-2" ref={el => { headerRefs.current[idx] = el; }} style={{ scrollMarginTop: 'calc(9rem + 12px)' }}>
                <Atom className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="text-xl font-semibold">Dividends & Earnings for AAPL</span>
              </div>
              <div className="w-full">
                <DividendsCardShadcn />
                <EarningsCardShadcn />
              </div>
            </>
          )}
          {section.type === "query" && section.query && (
            <>
              <div className="flex items-center gap-2 mb-2 mt-2" ref={el => { headerRefs.current[idx] = el; }} style={{ scrollMarginTop: 'calc(9rem + 12px)' }}>
                <Atom className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <span className="text-xl font-semibold">{section.query}</span>
              </div>
              <div className="rounded-xl border bg-muted p-8 text-center text-lg font-semibold text-muted-foreground">
                Placeholder for &quot;{section.query}&quot; results
              </div>
            </>
          )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
} 