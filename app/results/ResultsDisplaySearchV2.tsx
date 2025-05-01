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
import { ClassicSearchResultsList } from "@/components/confidence-demo/ClassicSearchResultsList";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export type ResultsHistorySection =
  | { type: "aapl"; query: string; key?: string }
  | { type: "loading"; key: string; query?: string }
  | { type: "dividends"; key?: string }
  | { type: "query"; query: string; key?: string }
  | { type: "account-dividends"; query: string; key?: string };

interface ResultsDisplaySearchV2Props {
  history: ResultsHistorySection[];
  setHistory: React.Dispatch<React.SetStateAction<ResultsHistorySection[]>>;
  onLoading?: (loading: boolean) => void;
}

// Module-level counter for unique keys
let historyKeyCounter = 0;
function getUniqueHistoryKey(prefix: string) {
  historyKeyCounter += 1;
  return `${prefix}-${Date.now()}-${historyKeyCounter}`;
}

export default function ResultsDisplaySearchV2({ history, setHistory, onLoading }: ResultsDisplaySearchV2Props) {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('query') || 'AAPL';
  const [isLoading, setIsLoading] = React.useState(true);
  const [loadingSection, setLoadingSection] = React.useState<null | string>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const headerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  // Initial AAPL loading
  React.useEffect(() => {
    if (onLoading) onLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoading) onLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Listen for query changes and add to history if new
  React.useEffect(() => {
    if (
      currentQuery &&
      !history.some(
        h =>
          (h.type === 'aapl' && currentQuery.trim().toUpperCase() === 'AAPL') ||
          (h.type === 'query' && h.query === currentQuery)
      )
    ) {
      setLoadingSection(currentQuery);
      setHistory(prev => [
        ...prev,
        { type: 'loading', key: getUniqueHistoryKey('loading-query'), query: currentQuery }
      ]);
      if (onLoading) onLoading(true);
      setTimeout(() => {
        setHistory(prev => {
          // Remove the last loading section and add the real section
          const withoutLoading = prev.filter(
            section => section.type !== 'loading' || !('query' in section) || section.query !== currentQuery
          );
          // Special case for account-dividends
          if (currentQuery.trim().toLowerCase() === "show me my dividends for the last month") {
            return [
              ...withoutLoading,
              { type: 'account-dividends', query: currentQuery, key: getUniqueHistoryKey('account-dividends') }
            ];
          }
          // Default: normal query
          return [
            ...withoutLoading,
            { type: 'query', query: currentQuery, key: getUniqueHistoryKey('query') }
          ];
        });
        setLoadingSection(null);
        if (onLoading) onLoading(false);
      }, 1200);
    }
  }, [currentQuery, history, setHistory, onLoading]);

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

  // Ensure loading state is always cleared in the parent
  React.useEffect(() => {
    if (onLoading && !isLoading && !loadingSection) {
      onLoading(false);
    }
  }, [isLoading, loadingSection, onLoading]);

  function handleAction(action: string) {
    if (action === "Dividends & Earnings") {
      setLoadingSection("dividends");
      setHistory((prev) => [
        ...prev,
        { type: "loading", key: getUniqueHistoryKey('loading-dividends') }
      ]);
      if (onLoading) onLoading(true);
      setTimeout(() => {
        setHistory((prev) => {
          // Remove the last loading section and add the real section
          const withoutLoading = prev.filter(
            (section) => section.type !== "loading"
          );
          return [
            ...withoutLoading,
            { type: "dividends", key: getUniqueHistoryKey('dividends') }
          ];
        });
        setLoadingSection(null);
        if (onLoading) onLoading(false);
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
    <div id="results-content" className="mt-24 pb-32">
      {history.map((section, idx) => (
        <div key={section.key} className="flex flex-col gap-6 p-6">
          {section.type === "aapl" && (
            <>
              <div className="flex flex-col mb-2" ref={el => { headerRefs.current[idx] = el; }} style={{ scrollMarginTop: '144px' }}>
                <div className="flex items-center gap-2">
                  <Atom className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <span className="text-xl font-semibold">AAPL</span>
                </div>
                <span className="text-sm text-muted-foreground mt-1">A quick overview and key insights for Apple Inc. (AAPL) based on your selection.</span>
              </div>
              <div className="flex flex-col gap-6 w-full">
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
                <ClassicSearchResultsList maxItems={7} context="aapl" />
              </div>
            </>
          )}
          {section.type === "loading" && (
            <div className="w-full flex flex-col items-center justify-center gap-4 pt-8 pb-8">
              <Atom className="h-8 w-8 text-muted-foreground animate-spin" />
              <span className="text-lg text-muted-foreground">
                {'query' in section && section.query
                  ? `Loading results for: ${section.query}`
                  : loadingSection === 'dividends'
                    ? 'Loading results for: Dividends & Earnings'
                    : 'Loading...'}
              </span>
            </div>
          )}
          {section.type === "dividends" && (
            <>
              <div className="flex flex-col mb-2 mt-2" ref={el => { headerRefs.current[idx] = el; }} style={{ scrollMarginTop: '144px' }}>
                <div className="flex items-center gap-2">
                  <Atom className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <span className="text-xl font-semibold">Dividends & Earnings for AAPL</span>
                </div>
                <span className="text-sm text-muted-foreground mt-1">Detailed analysis of Apple&apos;s dividend history and recent earnings performance.</span>
              </div>
              <div className="flex flex-col gap-6 w-full">
                <DividendsCardShadcn />
                <EarningsCardShadcn />
                <ClassicSearchResultsList maxItems={7} context="dividends" />
              </div>
            </>
          )}
          {section.type === "query" &&
            section.query &&
            ![
              "dividends from the last month",
              "what are my dividends from last month"
            ].includes(section.query.trim().toLowerCase()) && (
              <>
                <div className="flex flex-col mb-2 mt-2" ref={el => { headerRefs.current[idx] = el; }} style={{ scrollMarginTop: '144px' }}>
                  <div className="flex items-center gap-2">
                    <Atom className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-xl font-semibold">{section.query}</span>
                  </div>
                  <span className="text-sm text-muted-foreground mt-1">Results tailored to your search for &quot;{section.query}&quot;.</span>
                </div>
                <div className="rounded-xl border bg-muted p-8 text-center text-lg font-semibold text-muted-foreground">
                  Placeholder for &quot;{section.query}&quot; results
                </div>
              </>
            )}
          {section.type === "account-dividends" && 'query' in section && (
            <>
              <div className="flex flex-col mb-2 mt-2" ref={el => { headerRefs.current[idx] = el; }} style={{ scrollMarginTop: '144px' }}>
                <div className="flex items-center gap-2">
                  <Atom className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  <span className="text-xl font-semibold">show me my dividends for the last month</span>
                </div>
                <span className="text-sm text-muted-foreground mt-1">Here are your dividend payouts for the last month, based on your account data.</span>
              </div>
              <div className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Ticker</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Account</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>2024-06-01</TableCell>
                      <TableCell>AAPL</TableCell>
                      <TableCell>$12.50</TableCell>
                      <TableCell>Brokerage</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2024-06-10</TableCell>
                      <TableCell>MSFT</TableCell>
                      <TableCell>$8.20</TableCell>
                      <TableCell>IRA</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2024-06-15</TableCell>
                      <TableCell>VTI</TableCell>
                      <TableCell>$5.00</TableCell>
                      <TableCell>Brokerage</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </>
          )}
          {/* Special test string section */}
          {section.type === "query" &&
            section.query &&
            [
              "dividends from the last month",
              "what are my dividends from last month"
            ].includes(section.query.trim().toLowerCase()) && (
              <>
                <div className="flex flex-col mb-2 mt-2" ref={el => { headerRefs.current[idx] = el; }} style={{ scrollMarginTop: '144px' }}>
                  <div className="flex items-center gap-2">
                    <Atom className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-xl font-semibold">{section.query}</span>
                  </div>
                  <span className="text-sm text-muted-foreground mt-1">Results tailored to your search for &quot;{section.query}&quot;.</span>
                </div>
                <Card className="shadow-none">
                  <CardHeader>
                    <CardTitle>Dividends from AAPL over the last month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Ticker</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Account</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>2024-06-03</TableCell>
                          <TableCell>AAPL</TableCell>
                          <TableCell>$15.00</TableCell>
                          <TableCell>
                            Brokerage
                            <div className="text-xs text-muted-foreground">***1234</div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2024-06-12</TableCell>
                          <TableCell>AAPL</TableCell>
                          <TableCell>$7.25</TableCell>
                          <TableCell>
                            Retirement
                            <div className="text-xs text-muted-foreground">***5678</div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2024-06-20</TableCell>
                          <TableCell>AAPL</TableCell>
                          <TableCell>$3.50</TableCell>
                          <TableCell>
                            Education
                            <div className="text-xs text-muted-foreground">***9012</div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2024-06-25</TableCell>
                          <TableCell>AAPL</TableCell>
                          <TableCell>$12.10</TableCell>
                          <TableCell>
                            Brokerage
                            <div className="text-xs text-muted-foreground">***1234</div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>2024-06-28</TableCell>
                          <TableCell>AAPL</TableCell>
                          <TableCell>$9.75</TableCell>
                          <TableCell>
                            Retirement
                            <div className="text-xs text-muted-foreground">***5678</div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </>
            )}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
} 