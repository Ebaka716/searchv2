import React, { useEffect, useRef } from "react";
import { createChart, ColorType, CandlestickSeries, HistogramSeries } from "lightweight-charts";
import { generateMockCandles } from "@/lib/simulationUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FC } from "react";

type Candle = { time: string; open: number; high: number; low: number; close: number };
type Volume = { time: string; value: number; color: string };

/**
 * StockChartCard renders a candlestick and volume chart using lightweight-charts.
 *
 * - Uses Card UI for consistent styling.
 * - Accepts optional candleData and volumeData props for custom or real data.
 * - If no data is provided, generates 120 days of mock data.
 *
 * @example
 * <StockChartCard /> // Uses mock data
 *
 * @example
 * <StockChartCard candleData={myCandles} volumeData={myVolumes} />
 */

export interface StockChartCardProps {
  candleData?: Candle[];
  volumeData?: Volume[];
}

/**
 * Props for StockChartCard.
 * @property candleData - Array of candlestick data points. If not provided, mock data is generated.
 * @property volumeData - Array of volume data points. If not provided, mock data is generated.
 */

const defaultCandleData = generateMockCandles(120);
const defaultVolumeData = defaultCandleData.map((bar: Candle) => ({
  time: bar.time,
  value: Math.floor(40000 + Math.random() * 80000),
  color: bar.close > bar.open ? '#26a69a' : '#ef5350',
}));

const StockChartCard: FC<StockChartCardProps> = ({
  candleData = defaultCandleData,
  volumeData = defaultVolumeData,
}) => {
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Default Symbol (AAPL)</CardTitle>
      </CardHeader>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};

export default StockChartCard; 