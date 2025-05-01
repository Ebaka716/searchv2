'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from '@/components/Header';
import { FloatingInputBar } from '@/components/FloatingInputBar';
import { ConfidenceProvider } from '@/context/ConfidenceContext';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  // --- Desktop Sidebar State ---
  const [isDesktopCollapsed, setIsDesktopCollapsed] = useState(true);
  // --- Mobile Menu State ---
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const pathname = usePathname();

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
                {children}
              </div>
            </main>
            
            {isContentPage && (
              <FloatingInputBar /> 
            )}
          </div>
        </div>
      </ConfidenceProvider>
    </TooltipProvider>
  );
} 