import React, { useEffect, useRef } from "react";
import { createChart, ColorType, CandlestickSeries, HistogramSeries } from "lightweight-charts";

// Generate 120 days of mock candlestick data with realistic up/down swings
function generateMockCandles(numDays: number) {
  const candles = [];
  let lastClose = 100;
  let lastDate = new Date('2024-01-01');
  for (let i = 0; i < numDays; i++) {
    // Simulate weekends (skip Sat/Sun)
    while (lastDate.getDay() === 0 || lastDate.getDay() === 6) {
      lastDate.setDate(lastDate.getDate() + 1);
    }
    const open = lastClose;
    // Random walk for close
    const change = (Math.random() - 0.5) * 4; // up to ±2
    const close = Math.max(90, Math.min(110, open + change));
    const high = Math.max(open, close) + Math.random() * 2;
    const low = Math.min(open, close) - Math.random() * 2;
    const time = lastDate.toISOString().slice(0, 10);
    candles.push({ time, open: +open.toFixed(2), high: +high.toFixed(2), low: +low.toFixed(2), close: +close.toFixed(2) });
    lastClose = close;
    lastDate.setDate(lastDate.getDate() + 1);
  }
  return candles;
}

const candleData = generateMockCandles(120);

const volumeData = candleData.map((bar) => ({
  time: bar.time,
  value: Math.floor(40000 + Math.random() * 80000),
  color: bar.close > bar.open ? '#26a69a' : '#ef5350',
}));

export default function StockChartCard() {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 320,
      layout: {
        background: { type: ColorType.Solid, color: '#fff' },
        textColor: '#222',
      },
      grid: {
        vertLines: { color: '#eee' },
        horzLines: { color: '#eee' },
      },
      rightPriceScale: {
        borderColor: '#ccc',
      },
      timeScale: {
        borderColor: '#ccc',
      },
    });
    // Add volume histogram first so it's behind
    const volumeSeries = chart.addSeries(HistogramSeries, {
      priceFormat: { type: 'volume' },
      color: '#26a69a',
      priceScaleId: '',
    });
    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });
    volumeSeries.setData(volumeData);
    // Add candlestick series
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
      wickUpColor: '#26a69a', wickDownColor: '#ef5350',
    });
    candlestickSeries.setData(candleData);
    chart.timeScale().fitContent();
    return () => chart.remove();
  }, []);

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow p-6 w-full">
      <div className="text-lg font-semibold mb-4">Default Symbol (AAPL)</div>
      <div ref={chartContainerRef} className="w-full" style={{ minHeight: 320 }} />
      {/* Mock time range buttons */}
      <div className="flex gap-2 justify-center mt-4">
        {['1D', '5D', '1M', '6M', 'YTD', '1Y', 'MAX'].map((label) => (
          <button
            key={label}
            className={
              label === '6M'
                ? 'px-3 py-1 rounded bg-muted text-foreground font-semibold border border-primary'
                : 'px-3 py-1 rounded bg-background text-muted-foreground border border-muted'
            }
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
} 