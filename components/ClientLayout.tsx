'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from '@/components/Header';
import { FloatingInputBar } from '@/components/FloatingInputBar';
import { ConfidenceProvider } from '@/context/ConfidenceContext';
import ResultsDisplaySearchV2 from '@/app/results/ResultsDisplaySearchV2';
import type { ResultsHistorySection } from '@/app/results/ResultsDisplaySearchV2';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  // --- Desktop Sidebar State ---
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(true);
  // --- Mobile Menu State ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();

  // Results history state (for results pages)
  const [resultsHistory, setResultsHistory] = useState<ResultsHistorySection[]>([
    { type: "aapl", query: "AAPL", key: `aapl-AAPL-${Date.now()}` }
  ]);

  // Add a new state to track loading
  const [isResultsLoading, setIsResultsLoading] = useState(false);

  const [headerResetSignal, setHeaderResetSignal] = useState(0);
  const handleHeaderReset = () => setHeaderResetSignal(s => s + 1);

  const toggleDesktopSidebar = () => {
    setIsDesktopCollapsed(!isDesktopCollapsed);
  };

  // Close mobile menu on path change (optional but good UX)
  useEffect(() => {
      setIsMobileMenuOpen(false);
  }, [pathname]);

  // Determine background based on route
  const isContentPage = pathname.startsWith('/results') 
                     || pathname.startsWith('/advisor')
                     || pathname.startsWith('/confidence-demo')
                     || pathname.startsWith('/word-count-demo');
  // Use explicit background colors for light/dark content pages
  const backgroundClass = isContentPage 
    ? "bg-[#F9F7F5] dark:bg-neutral-900" 
    : "bg-background"; // Default background

  // Helper to create the correct history entry type
  const makeHistoryEntry = (query: string): ResultsHistorySection => {
    if (query.trim().toUpperCase() === "AAPL") {
      return { type: "aapl", query: "AAPL", key: `aapl-AAPL-${Date.now()}` };
    }
    if (query.trim().toLowerCase() === "show me my dividends for the last month") {
      return { type: 'account-dividends', query, key: `account-dividends-${query}-${Date.now()}` };
    }
    return { type: 'query', query, key: `query-${query}-${Date.now()}` };
  };

  // Handler for header input (reset history)
  const handleResetQuery = (query: string) => {
    setIsResultsLoading(true);
    setResultsHistory([makeHistoryEntry(query)]);
    router.push(`/results?query=${encodeURIComponent(query)}`);
  };

  // Handler for floating input bar (append to history)
  const handleAppendQuery = (query: string) => {
    setIsResultsLoading(true);
    const loadingKey = `loading-${query}-${Date.now()}`;
    setResultsHistory(prev => [
      ...prev,
      { type: 'loading', key: loadingKey, query },
    ]);
    setTimeout(() => {
      setResultsHistory(prev => {
        // Remove the last loading section and add the real section
        const withoutLoading = prev.filter(
          section => section.type !== 'loading' || section.key !== loadingKey
        );
        return [
          ...withoutLoading,
          makeHistoryEntry(query)
        ];
      });
      setIsResultsLoading(false);
    }, 1200);
  };

  // Callback to update loading state from children
  const handleResultsLoading = (loading: boolean) => {
    setIsResultsLoading(loading);
  };

  return (
    <TooltipProvider>
      <ConfidenceProvider>
        <Header 
          toggleMobileMenu={() => setIsMobileMenuOpen(true)} 
          onSubmitQuery={handleResetQuery} 
          resetSignal={headerResetSignal}
          onLogoClick={handleHeaderReset}
        />
        
        <div className={cn("flex h-screen")}>
          <Sidebar 
            isDesktopCollapsed={isDesktopCollapsed} 
            toggleDesktopSidebar={toggleDesktopSidebar} 
            isMobileMenuOpen={isMobileMenuOpen}
            closeMobileMenu={() => setIsMobileMenuOpen(false)}
          />
          <div 
            id="content-scroll-wrapper" 
            className={cn(
              "flex-1",
              backgroundClass,
              "pt-[6.5rem]",
              pathname === '/' 
                ? "flex flex-col items-center justify-center overflow-hidden"
                : "overflow-y-auto p-6"
            )}
          >
            <main
              id="main-scroll-area"
              className={cn(pathname === '/' ? '' : "mb-6")}
            >
              <div className={cn(
                "w-full max-w-[950px] mx-auto",
                pathname === '/' ? 'p-6' : ''
              )}>
                {/* Render ResultsDisplaySearchV2 directly for /results route, else render children as-is */}
                {pathname.startsWith('/results') ? (
                  <Suspense>
                    <ResultsDisplaySearchV2 
                      history={resultsHistory} 
                      setHistory={setResultsHistory} 
                      onLoading={handleResultsLoading}
                    />
                  </Suspense>
                ) : (
                  children
                )}
              </div>
            </main>
            
            {isContentPage && (
              <FloatingInputBar onSubmitQuery={handleAppendQuery} hidden={isResultsLoading} /> 
            )}
          </div>
        </div>
      </ConfidenceProvider>
    </TooltipProvider>
  );
} 