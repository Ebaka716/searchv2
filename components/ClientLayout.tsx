'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from '@/components/Header';
import { FloatingInputBar } from '@/components/FloatingInputBar';
import { ConfidenceProvider } from '@/context/ConfidenceContext';
import ResultsDisplaySearchV2 from '@/app/results/ResultsDisplaySearchV2';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  // --- Desktop Sidebar State ---
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(true);
  // --- Mobile Menu State ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();

  // Results history state (for results pages)
  const [resultsHistory, setResultsHistory] = useState<import('@/app/results/ResultsDisplaySearchV2').ResultsHistorySection[]>([
    { type: "aapl", query: "AAPL", key: `aapl-AAPL-${Date.now()}` }
  ]);

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

  // Handler for the global input bar
  const handleGlobalQuery = (query: string) => {
    if (query.trim().toLowerCase() === "show me my dividends for the last month") {
      setResultsHistory(prev => [
        ...prev,
        { type: 'account-dividends', query, key: `account-dividends-${query}-${Date.now()}` }
      ]);
    } else {
      setResultsHistory(prev => [
        ...prev,
        { type: 'query', query, key: `query-${query}-${Date.now()}` }
      ]);
    }
  };

  return (
    <TooltipProvider>
      <ConfidenceProvider>
        <Header toggleMobileMenu={() => setIsMobileMenuOpen(true)} />
        
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
                    <ResultsDisplaySearchV2 history={resultsHistory} setHistory={setResultsHistory} />
                  </Suspense>
                ) : (
                  children
                )}
              </div>
            </main>
            
            {isContentPage && (
              <FloatingInputBar onSubmitQuery={handleGlobalQuery} /> 
            )}
          </div>
        </div>
      </ConfidenceProvider>
    </TooltipProvider>
  );
} 