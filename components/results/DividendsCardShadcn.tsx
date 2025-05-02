import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar } from "recharts";

const growthData = [
  { year: "2022", AAPL: 8, Market: 6 },
  { year: "2023", AAPL: 6, Market: 5 },
  { year: "2024", AAPL: 4, Market: 4 },
  { year: "2025", AAPL: 3, Market: 4 },
];

const payoutDataPrev = [
  { name: "Payout", value: 15 },
  { name: "Remainder", value: 85 },
];
const payoutDataCurr = [
  { name: "Payout", value: 16 },
  { name: "Remainder", value: 84 },
];
const pieColors = ["#2563eb", "#e5e7eb"];

export function DividendsCardShadcn() {
  return (
    <Card className="rounded-xl border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Dividends</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground">More &rarr;</Button>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Stat Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-4 gap-y-2 text-xs border-b pb-3 mb-3 w-full">
          <div><div className="font-semibold">Dividend Amount<br/><span className="font-normal text-muted-foreground">(MOST RECENT)</span></div><div>$0.2500</div></div>
          <div><div className="font-semibold">Announcement Date</div><div>01/30/2025</div></div>
          <div><div className="font-semibold">Ex-Div Date</div><div>02/10/2025</div></div>
          <div><div className="font-semibold">Record Date</div><div>02/10/2025</div></div>
          <div><div className="font-semibold">Pay Date</div><div>02/13/2025</div></div>
          <div><div className="font-semibold">Dividend Frequency</div><div>Quarterly</div></div>
        </div>
        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Strength */}
          <div className="flex flex-col items-start border-r md:pr-4">
            <div className="text-sm font-bold text-muted-foreground mb-1 text-left">Strength</div>
            <div className="text-xs font-normal mb-2 text-left">Dividend Yield</div>
            <div className="w-full flex flex-col gap-2">
              <ResponsiveContainer width="100%" height={24}>
                <BarChart data={[{ name: 'AAPL', value: 0.47 }]}
                  layout="vertical"
                  margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                  barCategoryGap={0}
                >
                  <XAxis type="number" domain={[0, 3.5]} hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 4, 4]} barSize={12} />
                  <Tooltip formatter={(v) => `${v}%`} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-between w-full text-xs">
                <span className="font-semibold text-blue-700">0.47% AAPL</span>
              </div>
              <ResponsiveContainer width="100%" height={24}>
                <BarChart data={[{ name: 'Market Median', value: 3.09 }]}
                  layout="vertical"
                  margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                  barCategoryGap={0}
                >
                  <XAxis type="number" domain={[0, 3.5]} hide />
                  <YAxis type="category" dataKey="name" hide />
                  <Bar dataKey="value" fill="#a3a3a3" radius={[4, 4, 4, 4]} barSize={12} />
                  <Tooltip formatter={(v) => `${v}%`} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex justify-between w-full text-xs">
                <span className="font-semibold text-gray-500">3.09% Market Median</span>
              </div>
            </div>
          </div>
          {/* Sustainability */}
          <div className="flex flex-col items-center border-r md:px-4">
            <div className="text-sm font-bold text-muted-foreground mb-1 text-left w-full">Sustainability</div>
            <div className="text-xs font-normal text-left w-full">Dividend Payout Ratio</div>
            <div className="flex gap-4 mt-6">
              <div className="flex flex-col items-center">
                <ResponsiveContainer width={48} height={48}>
                  <PieChart>
                    <Pie data={payoutDataPrev} dataKey="value" innerRadius={16} outerRadius={24} startAngle={90} endAngle={-270} stroke="none">
                      {payoutDataPrev.map((entry, idx) => (
                        <Cell key={`cell-prev-${idx}`} fill={pieColors[idx]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <span className="text-lg font-bold mt-2 mb-2">15%</span>
                <span className="text-xs text-muted-foreground mt-2">Previous Trailing<br/>(12 MONTHS)</span>
              </div>
              <div className="flex flex-col items-center">
                <ResponsiveContainer width={48} height={48}>
                  <PieChart>
                    <Pie data={payoutDataCurr} dataKey="value" innerRadius={16} outerRadius={24} startAngle={90} endAngle={-270} stroke="none">
                      {payoutDataCurr.map((entry, idx) => (
                        <Cell key={`cell-curr-${idx}`} fill={pieColors[idx]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <span className="text-lg font-bold mt-2 mb-2">16%</span>
                <span className="text-xs text-muted-foreground mt-2">Current Trailing<br/>(12 MONTHS)</span>
              </div>
            </div>
          </div>
          {/* Growth */}
          <div className="flex flex-col items-center md:pl-4">
            <div className="text-sm font-bold text-muted-foreground mb-1 text-left w-full">Growth</div>
            <div className="text-xs font-normal text-left w-full">Annualized Dividend (YoY % chg.)</div>
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={growthData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 14, fontWeight: 700, fill: '#222' }} />
                <YAxis domain={[0, 8]} ticks={[8, 6, 4, 2, 0]} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} tick={{ fontSize: 14, fontWeight: 700, fill: '#222' }} />
                <Tooltip formatter={(v) => `${v}%`} />
                <Legend verticalAlign="top" align="left" height={32} iconType="circle" wrapperStyle={{ fontSize: 12, fontWeight: 500 }} />
                <Line type="monotone" dataKey="AAPL" stroke="#2563eb" strokeWidth={3} dot={{ r: 4, fill: '#2563eb', stroke: '#fff', strokeWidth: 2 }} name="AAPL" />
                <Line type="monotone" dataKey="Market" stroke="#d1d5db" strokeWidth={3} dot={{ r: 4, fill: '#d1d5db', stroke: '#fff', strokeWidth: 2 }} name="Market Median" />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-xs text-muted-foreground mt-1">(Annualized as of last ex-date 02/10/2025)</div>
          </div>
        </div>
      </CardContent>
      <div className="flex flex-row gap-3 px-6 pb-4 pt-2">
        <Button variant="conversational">Dividend History</Button>
        <Button variant="conversational">Payout Ratio</Button>
        <Button variant="conversational">Compare Peers</Button>
      </div>
    </Card>
  );
} 