import React, { createContext, useContext, useRef } from 'react';

// The context value is a ref to a function (or null)
type ResultsQueryHandler = ((query: string) => void) | null;
const ResultsQueryContext = createContext<React.MutableRefObject<ResultsQueryHandler>>(null as any);

export function ResultsQueryProvider({ children }: { children: React.ReactNode }) {
  const handlerRef = useRef<ResultsQueryHandler>(null);
  return (
    <ResultsQueryContext.Provider value={handlerRef}>
      {children}
    </ResultsQueryContext.Provider>
  );
}

export function useResultsQueryHandler() {
  return useContext(ResultsQueryContext);
} 