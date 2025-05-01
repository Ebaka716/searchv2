import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { createChart, ColorType, LineSeries } from 'lightweight-charts';

export function DividendsCard() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current || typeof window === "undefined") return;
    const chart = createChart(chartContainerRef.current, {
      width: 180,
      height: 80,
      layout: { background: { type: ColorType.Solid, color: 'transparent' } },
      grid: { vertLines: { visible: false }, horzLines: { visible: false } },
      rightPriceScale: { visible: false },
      leftPriceScale: { visible: false },
      timeScale: { visible: false },
      crosshair: { vertLine: { visible: false }, horzLine: { visible: false } },
    });
    const series = chart.addSeries(LineSeries, { color: '#2563eb', lineWidth: 2 });
    series.setData([
      { time: '2022-01-01', value: 8 },
      { time: '2023-01-01', value: 6 },
      { time: '2024-01-01', value: 4 },
      { time: '2025-01-01', value: 3 },
    ]);
    // Market median (gray)
    const medianSeries = chart.addSeries(LineSeries, { color: '#a3a3a3', lineWidth: 2 });
    medianSeries.setData([
      { time: '2022-01-01', value: 6 },
      { time: '2023-01-01', value: 5 },
      { time: '2024-01-01', value: 4 },
      { time: '2025-01-01', value: 4 },
    ]);
    return () => { chart.remove(); };
  }, []);

  return (
    <Card className="rounded-xl border bg-card">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Dividends</CardTitle>
        <Button variant="ghost" size="sm" className="text-muted-foreground">More &rarr;</Button>
      </CardHeader>
      <CardContent className="pt-0">
        {/* Stat Row */}
        <div className="flex flex-wrap gap-4 text-xs border-b pb-3 mb-3">
          <div><div className="font-semibold">Dividend Amount</div><div>$0.2500</div></div>
          <div><div className="font-semibold">Announcement Date</div><div>01/30/2025</div></div>
          <div><div className="font-semibold">Ex-Div Date</div><div>02/10/2025</div></div>
          <div><div className="font-semibold">Record Date</div><div>02/10/2025</div></div>
          <div><div className="font-semibold">Pay Date</div><div>02/13/2025</div></div>
          <div><div className="font-semibold">Dividend Frequency</div><div>Quarterly</div></div>
        </div>
        {/* Three Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Strength */}
          <div>
            <div className="text-xs text-muted-foreground mb-1">Strength</div>
            <div className="font-semibold">Dividend Yield</div>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-2xl font-bold text-blue-700">0.47%</span>
              <span className="text-xs text-muted-foreground">AAPL</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <span className="block w-8 h-2 bg-gray-200 rounded-full">
                <span className="block w-2/3 h-2 bg-gray-400 rounded-full"></span>
              </span>
              <span className="text-xs text-muted-foreground">3.09% Market Median</span>
            </div>
          </div>
          {/* Sustainability */}
          <div>
            <div className="text-xs text-muted-foreground mb-1">Sustainability</div>
            <div className="font-semibold">Dividend Payout Ratio</div>
            <div className="flex gap-4 mt-2">
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">15%</span>
                <span className="text-xs text-muted-foreground">Previous Trailing<br/>(12 MONTHS)</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-lg font-bold">16%</span>
                <span className="text-xs text-muted-foreground">Current Trailing<br/>(12 MONTHS)</span>
              </div>
            </div>
          </div>
          {/* Growth */}
          <div>
            <div className="text-xs text-muted-foreground mb-1">Growth</div>
            <div className="font-semibold">Annualized Dividend (YoY % chg.)</div>
            <div ref={chartContainerRef} className="w-full h-[80px] mt-2" />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>2022</span><span>2023</span><span>2024</span><span>2025</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">(Annualized as of last ex-date 02/10/2025)</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 