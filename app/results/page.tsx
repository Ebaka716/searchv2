"use client";

// Removed unused imports: Link, Button, ArrowLeft, FloatingInputBar
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { ArrowLeft } from 'lucide-react';
// import { FloatingInputBar } from '@/components/FloatingInputBar';

// Keep dynamic import for ResultsDisplay
const ResultsDisplay = React.lazy(() => import('./ResultsDisplay'));
const ResultsDisplaySearchV2 = React.lazy(() => import('./ResultsDisplaySearchV2'));

function ResultsPageContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  return (
    <>
      {query === 'APPL' ? <ResultsDisplaySearchV2 /> : <ResultsDisplay />}
    </>
  );
}

export default function ResultsPage() {
  return (
    <div className="relative min-h-screen">
      {/* Ensure main content has max-width and is centered */}
      <main className="flex flex-col items-center pb-32 px-4">
        <div className="w-full max-w-[950px]"> {/* Increased max-width to 950px */} 
          <Suspense>
            <ResultsPageContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
