"use client";

import React from "react";
import { Atom } from "lucide-react";
import { FinancialSearchCommand } from "@/components/search/FinancialSearchCommand";

export default function AssistantPage() {
  // Helper function for navigation (similar to the one in FinancialSearchCommand)
  // You can add more logic here if needed for new search state
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-background">
      <h1 className="mb-8 text-4xl font-semibold text-center flex items-center gap-3">
        <Atom className="h-8 w-8" />
        Theta Assistant
      </h1>
      <div className="w-full max-w-3xl mx-auto">
        <FinancialSearchCommand />
      </div>
    </main>
  );
} 