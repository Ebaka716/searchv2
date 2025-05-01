import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ClassicSearchResultsListProps {
  maxItems?: number; // Optional prop to limit items shown
  context?: "aapl" | "dividends";
}

function getPlaceholderLinks(context: "aapl" | "dividends" = "aapl") {
  if (context === "dividends") {
    return [
      { url: "#", title: "Apple Dividend History & Growth", snippet: "Explore Apple Inc.'s dividend payments, yield, and growth trends over the past decade." },
      { url: "#", title: "AAPL Earnings: Recent Surprises", snippet: "A look at Apple's recent earnings reports and how they compare to analyst expectations." },
      { url: "#", title: "Dividend Sustainability for Apple", snippet: "Analysis of Apple's payout ratio and the sustainability of its dividend policy." },
      { url: "#", title: "How Does Apple's Dividend Compare?", snippet: "Comparing Apple's dividend yield and growth to other major tech companies." },
      { url: "#", title: "AAPL Quarterly Earnings Breakdown", snippet: "Detailed breakdown of Apple's quarterly earnings, revenue sources, and profit margins." },
      { url: "#", title: "Should You Buy Apple for the Dividend?", snippet: "Pros and cons of investing in AAPL for its dividend, including risk factors and growth potential." },
      { url: "#", title: "Apple's Dividend Announcements Timeline", snippet: "Timeline of Apple's dividend announcements and key dates for investors." },
    ];
  }
  // Default: 'aapl'
  return [
    { url: "#", title: "Apple Q2 2024 Earnings: Key Takeaways", snippet: "A summary of Apple Inc.'s latest quarterly earnings report, including revenue, profit, and product highlights." },
    { url: "#", title: "AAPL Stock Analysis & Forecast", snippet: "Expert analysis and future outlook for Apple (AAPL) shares based on recent market trends and company performance." },
    { url: "#", title: "Apple Announces New Product Lineup", snippet: "Coverage of Apple's most recent product announcements and their potential impact on the company's growth." },
    { url: "#", title: "Dividend History for Apple Inc.", snippet: "A look at Apple's dividend payments, yield, and sustainability over the past decade." },
    { url: "#", title: "How Does AAPL Compare to Tech Peers?", snippet: "Comparative analysis of Apple versus other major technology companies in terms of valuation, growth, and innovation." },
    { url: "#", title: "Apple's Services Revenue Hits Record High", snippet: "Insights into the growth of Apple's services segment and what it means for the company's business model." },
    { url: "#", title: "Should You Buy AAPL Now?", snippet: "Pros and cons of investing in Apple stock at current prices, including analyst recommendations and risk factors." },
  ];
}

export function ClassicSearchResultsList({ maxItems, context = "aapl" }: ClassicSearchResultsListProps) {
  const itemsToShow = maxItems ? getPlaceholderLinks(context).slice(0, maxItems) : getPlaceholderLinks(context);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Classic Search Results</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {itemsToShow.map((link, index) => (
            <li key={index}>
              <a href={link.url} className="text-blue-600 dark:text-blue-400 hover:underline">
                <h3 className="font-medium">{link.title}</h3>
              </a>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{link.snippet}</p>
            </li>
          ))}
        </ul>
        {maxItems && maxItems < getPlaceholderLinks(context).length && (
          <p className="text-sm text-muted-foreground mt-3">...</p>
        )}
      </CardContent>
    </Card>
  );
} 