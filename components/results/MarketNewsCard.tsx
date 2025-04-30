import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const newsItems = [
  {
    title: "Trump trade war spreads more gloom across businesses worldwide",
    source: "Reuters",
    time: "3:15 PM ET",
    date: "Apr-24-2025",
  },
  {
    title: "Wall Street ends higher on tech boost, easing tariff tensions",
    source: "Reuters",
    time: "4:23 PM ET",
    date: "Apr-24-2025",
  },
  {
    title: "US labor market holds steady for now; tariffs keep businesses on edge",
    source: "Reuters",
    time: "12:53 PM ET",
    date: "Apr-24-2025",
  },
  {
    title: "US durable goods orders soar on aircraft bookings in March",
    source: "Reuters",
    time: "9:11 AM ET",
    date: "Apr-24-2025",
  },
  {
    title: "Intel forecasts weak revenue amid trade tensions, shares fall",
    source: "Reuters",
    time: "33 mins ago",
    date: "",
  },
];

export default function MarketNewsCard() {
  return (
    <Card className="w-full flex flex-col">
      <CardHeader className="pb-0 flex flex-col gap-4 items-start">
        <CardTitle className="text-lg font-semibold">Market news</CardTitle>
        <Select defaultValue="top">
          <SelectTrigger className="w-36 h-8 border-gray-200">
            <SelectValue placeholder="Top news" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="top">Top news</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="flex flex-col flex-1">
        <div className="flex flex-col gap-4 mt-0">
          <div>
            <ul className="flex-1">
              {newsItems.map((item, idx) => (
                <li key={idx} className="mb-4 last:mb-0 group cursor-pointer">
                  <div className="font-medium text-[15px] leading-snug mb-0.5 group-hover:underline transition-colors duration-100">{item.title}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.source} {item.time && <>· {item.time}</>} {item.date && <>· {item.date}</>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" className="px-2 py-0.5 rounded">1</Button>
          <Button variant="ghost" size="sm" className="px-2 py-0.5 rounded">2</Button>
          <Button variant="ghost" size="sm" className="px-2 py-0.5 rounded">Next</Button>
        </div>
      </CardContent>
    </Card>
  );
} 