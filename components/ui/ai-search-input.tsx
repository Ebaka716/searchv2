import React from "react";

export interface AiSearchInputProps {
  placeholder?: string;
  sparkleIcon?: "button" | "none" | "inline";
  showSearchIcon?: boolean;
  onSparkleClick?: () => void;
  className?: string;
}

export const AiSearchInput: React.FC<AiSearchInputProps> = ({
  placeholder = "AI Search (placeholder)",
  className = "",
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className={className}
      style={{ padding: "8px", border: "1px solid #ccc", borderRadius: "4px", width: "100%" }}
      disabled
    />
  );
}; 