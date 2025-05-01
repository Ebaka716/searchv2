import React from "react";
import { cn } from "@/lib/utils";

interface ResultSectionHeaderProps {
  icon: React.ReactNode;
  heading: string;
  preamble: string;
  className?: string;
  headingClassName?: string;
  preambleClassName?: string;
  // Optionally, allow ref forwarding for scroll/anchor
  headerRef?: React.Ref<HTMLDivElement>;
  id?: string;
  style?: React.CSSProperties;
}

export function ResultSectionHeader({
  icon,
  heading,
  preamble,
  className,
  headingClassName,
  preambleClassName,
  headerRef,
  id,
  style,
}: ResultSectionHeaderProps) {
  return (
    <div ref={headerRef} id={id} style={style} className={cn("flex flex-col gap-y-0.5 mb-1", className)}>
      <div className={cn("flex items-center gap-2", headingClassName)}>
        {icon}
        <span className="text-xl font-semibold">{heading}</span>
      </div>
      <div className={cn("text-muted-foreground text-sm", preambleClassName)}>
        {preamble}
      </div>
    </div>
  );
} 