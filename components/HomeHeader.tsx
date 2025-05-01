"use client";

import * as React from "react";
import Link from "next/link";
import { CircleUser, ChevronDown } from "lucide-react";
import { AiSearchInput } from "./ui/ai-search-input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { cn } from "@/lib/utils";

// Define custom props for Header extending standard HTML attributes
interface CustomHeaderProps extends React.HTMLAttributes<HTMLElement> {
  aiSearchPlaceholder?: string;
  onAiSearchSparkleClick?: () => void;
  aiSearchSparkleVariant?: 'inline' | 'button' | 'none';
  aiShowSearchIcon?: boolean;
  rightContentType?: 'search' | 'sparkleButton';
  onSparkleButtonClick?: () => void;
}

const HomeHeader = React.forwardRef<HTMLElement, CustomHeaderProps>(
  ({
    className,
    aiSearchPlaceholder,
    onAiSearchSparkleClick,
    aiSearchSparkleVariant = 'inline',
    aiShowSearchIcon = true,
    rightContentType = 'search',
    onSparkleButtonClick,
    ...props
  }, ref) => {
    // Placeholder nav items from image
    const utilityNav = [
      { name: "Customer Service", href: "#" },
      { name: "Profile", href: "#" },
      { name: "Open an account", href: "#" },
      { name: "AI Assistant", href: "#" }, // Assuming this name
      { name: "Log out", href: "#" },
    ];
    const mainNav = [
      { name: "Accounts", href: "#" },
      { name: "Planning", href: "#" },
      { name: "Research", href: "#", dropdown: true },
      { name: "Products & Services", href: "#", dropdown: true },
    ];

    return (
      <header
        ref={ref}
        className={cn(
          "w-full border-b bg-background fixed top-0 left-0 right-0 z-50",
          className
        )}
        {...props}
      >
        {/* Top Row */}
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          {/* Logo Placeholder */}
          <Link href="#" className="flex items-center gap-2 font-semibold">
            <CircleUser className="h-6 w-6 text-blue-500" /> {/* Placeholder Logo Icon */}
            <span className="text-blue-500">Product company</span>
          </Link>

          {/* Utility Navigation */}
          <nav className="flex items-center gap-4 text-sm text-muted-foreground">
            {utilityNav.map((item) => (
              <Link key={item.name} href={item.href} className="hover:text-foreground">
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Bottom Row */}
        <div className="container mx-auto flex h-12 items-center justify-between px-4"> {/* No border-t here */}
          {/* Main Navigation */}
          <nav className="flex items-center gap-6 text-sm font-medium">
            {mainNav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-1 text-foreground/80 transition-colors hover:text-foreground"
              >
                {item.name}
                {item.dropdown && <ChevronDown className="h-4 w-4" />}
              </Link>
            ))}
          </nav>

          {/* Right Content: Conditional Rendering */}
          <div className="w-full max-w-xs flex justify-end"> {/* Ensure container takes space */} 
            {rightContentType === 'search' && (
              <AiSearchInput
                placeholder={aiSearchPlaceholder || "How can we help?"}
                sparkleIcon={aiSearchSparkleVariant}
                showSearchIcon={aiShowSearchIcon}
                onSparkleClick={onAiSearchSparkleClick}
                className="w-full" // Ensure input takes full width of container
              />
            )}
            {rightContentType === 'sparkleButton' && (
              <Button 
                variant="outline" 
                size="icon" 
                className="rounded-full" // Make the button round
                onClick={onSparkleButtonClick} // Use the new handler
              >
                <Image src="/sparkle.png" alt="AI Sparkle" width={20} height={20} />
              </Button>
            )}
          </div>
        </div>
      </header>
    );
  }
);
HomeHeader.displayName = "HomeHeader";

export { HomeHeader }; 