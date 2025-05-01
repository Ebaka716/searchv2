"use client";

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Search, CircleUser } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useConfidence } from '@/context/ConfidenceContext';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import { Input } from '@/components/ui/input';
import Image from 'next/image';

interface HeaderProps {
  className?: string;
  onSubmitQuery?: (query: string) => void;
  resetSignal?: number;
  onLogoClick?: () => void;
  [key: string]: unknown;
}

export function Header({ className, onSubmitQuery, resetSignal, onLogoClick, ...props }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [headerInput, setHeaderInput] = useState("");

  // Always call the hook unconditionally at the top level
  const confidenceContext = useConfidence();
  // Destructure only if the context is available (it should be, thanks to the Provider)
  const { confidence, setConfidence } = confidenceContext || { confidence: 0, setConfidence: () => {} };

  // Only allow valid DOM props to be spread
  const { toggleMobileMenu, ...restProps } = props; // eslint-disable-line @typescript-eslint/no-unused-vars

  useEffect(() => {
    setHeaderInput("");
  }, [resetSignal]);

  return (
    <header
      className={cn(
        "w-full border-b bg-background fixed top-0 left-0 right-0 z-50",
        className
      )}
      {...restProps}
    >
      {/* Top Row */}
      <div className="flex items-center justify-between px-4 h-18">
        {/* Logo */}
        <div className="flex items-center gap-2 font-semibold">
          <CircleUser className="h-6 w-6 text-blue-500" />
          <Link href="/" className="text-blue-500 font-bold text-xl hover:underline" onClick={onLogoClick}>Product company</Link>
        </div>
        {/* Utility Navigation */}
        <nav className="flex items-center gap-4 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground hover:underline underline-offset-4">Customer Service</a>
          <a href="#" className="hover:text-foreground hover:underline underline-offset-4">Profile</a>
          <a href="#" className="hover:text-foreground hover:underline underline-offset-4">Open an account</a>
          <a href="#" className="hover:text-foreground hover:underline underline-offset-4">AI Assistant</a>
          <a href="#" className="hover:text-foreground hover:underline underline-offset-4">Log out</a>
        </nav>
      </div>
      {/* Bottom Row */}
      <div className="relative flex items-center justify-between px-4 h-14">
        {/* Main Navigation using shadcn NavigationMenu */}
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Accounts</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Planning</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Research</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="#">Stocks</NavigationMenuLink>
                <NavigationMenuLink href="#">Funds</NavigationMenuLink>
                <NavigationMenuLink href="#">Markets</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Products & Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink href="#">Banking</NavigationMenuLink>
                <NavigationMenuLink href="#">Investing</NavigationMenuLink>
                <NavigationMenuLink href="#">Insurance</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex-1" />
        {/* Placeholder for right side */}
        <div className="w-full max-w-xs flex items-center justify-end">
          <div className="relative w-full">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground">
              <Search className="h-4 w-4" />
            </span>
            <Input
              placeholder="How can we help?"
              value={headerInput}
              onChange={e => setHeaderInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && headerInput.trim()) {
                  if (onSubmitQuery) {
                    onSubmitQuery(headerInput);
                  } else {
                    router.push(`/results?query=${encodeURIComponent(headerInput.trim())}`);
                  }
                }
              }}
              className="pl-8 pr-10 h-9 border border-gray-200 focus:border-gray-400"
            />
            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600">
              <Image src="/sparkle.png" alt="Sparkle" width={20} height={20} className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      {/* Confidence Slider (only on confidence demo page) */}
      {pathname === '/confidence-demo' && (
        <div className="container mx-auto flex items-center space-x-4 w-1/2 max-w-xs py-2">
          <Label htmlFor="confidence-slider" className="whitespace-nowrap text-sm font-medium">
            Confidence: {confidence}%
          </Label>
          <Slider
            id="confidence-slider"
            min={0}
            max={100}
            step={1}
            value={[confidence]}
            onValueChange={(value) => setConfidence(value[0])}
            className="w-full"
          />
        </div>
      )}
    </header>
  );
} 