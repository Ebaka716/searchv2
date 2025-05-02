import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LabelList } from "recharts";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";

const earningsData = [
  { quarter: "Q3 2024", consensus: 1.35, actual: 1.40, beat: 0.05 },
  { quarter: "Q4 2024", consensus: 1.60, actual: 1.64, beat: 0.04 },
  { quarter: "Q1 2025", consensus: 2.35, actual: 2.40, beat: 0.05 },
  { quarter: "Q2 2025", consensus: 1.63, actual: null, beat: null },
  { quarter: "Q3 2025", consensus: 1.48, actual: null, beat: null },
];

const metrics = [
  { label: "EPS (TTM)", aapl: "$6.30", industry: "$6.08" },
  { label: "P/E (TTM)", aapl: "33.73", industry: "30.60" },
  { label: "P/E (5-year avg)", aapl: "28.92", industry: "28.12" },
  { label: "EPS growth (TTM vs prior TTM)", aapl: "-1.87%", industry: "-1.23%", aaplColor: "text-red-600", industryColor: "text-red-600" },
  { label: "EPS growth (last qtr vs same qtr prior year)", aapl: "+10.09%", industry: "+16.44%", aaplColor: "text-green-600", industryColor: "text-green-600" },
];

export function EarningsCardShadcn() {
  return (
    <Card className="rounded-xl border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Earnings</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground">More &rarr;</Button>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-sm font-bold mb-1">EPS <span className="font-normal text-muted-foreground">consensus estimates vs adjusted actuals</span></div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={earningsData} margin={{ left: 10, right: 10, top: 20, bottom: 0 }} barCategoryGap={20}>
            <XAxis dataKey="quarter" axisLine={false} tickLine={false} tick={{ fontSize: 13, fontWeight: 600 }} />
            <YAxis domain={[0, 2.5]} ticks={[0, 0.5, 1, 1.5, 2, 2.5]} tickFormatter={v => `$${v.toFixed(2)}`} axisLine={false} tickLine={false} tick={{ fontSize: 13, fontWeight: 600 }} />
            <Tooltip formatter={(v: number | string) => typeof v === 'number' ? `$${v.toFixed(2)}` : v} />
            <Legend verticalAlign="top" align="left" height={32} iconType="rect" wrapperStyle={{ fontSize: 13, fontWeight: 600 }} />
            <Bar dataKey="consensus" fill="#e5e7eb" name="Consensus">
              <LabelList dataKey="consensus" position="top" formatter={(v: number | string) => typeof v === 'number' ? `$${v.toFixed(2)}` : v} />
            </Bar>
            <Bar dataKey="actual" fill="#2563eb" name="Actual">
              <LabelList dataKey="actual" position="top" formatter={(v: number | string) => typeof v === 'number' ? `$${v.toFixed(2)}` : v} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2 mb-2">
          {earningsData.map((d, i) => d.beat !== null && (
            <div key={i} className="flex flex-col items-center w-24">
              <span className="bg-green-700 text-white text-xs font-bold rounded px-2 py-0.5 mb-0.5">Beat</span>
              <span className="text-xs text-muted-foreground">by ${d.beat.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="text-xs text-muted-foreground text-right mb-4">Expected report date <span className="font-semibold text-foreground">JUL-30-2025</span></div>
        <div className="pt-4 mt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold text-foreground">Earnings Metrics <span className="font-normal text-muted-foreground">GAAP</span></TableHead>
                <TableHead className="font-normal">AAPL</TableHead>
                <TableHead className="font-normal">Industry average</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {metrics.map((row, i) => (
                <TableRow key={i} className="border-b border-dotted last:border-none">
                  <TableCell className="font-bold text-foreground py-1 pr-4">{row.label}</TableCell>
                  <TableCell className={`${row.aaplColor || ''}`}>{row.aapl}</TableCell>
                  <TableCell className={`${row.industryColor || ''}`}>{row.industry}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <div className="flex flex-row gap-3 px-6 pb-4 pt-2">
        <Button variant="conversational">Earnings History</Button>
        <Button variant="conversational">EPS Trend</Button>
        <Button variant="conversational">Analyst Estimates</Button>
      </div>
    </Card>
  );
} 