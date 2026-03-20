"use client";
import * as Icons from "lucide-react";

interface IconDisplayProps {
  iconName: string;
  size?: number;
  strokeWidth?: number;
  className?: string;
  fallbackIcon?: keyof typeof Icons;
}

const IconDisplay = ({
  iconName,
  size = 20,
  strokeWidth = 2,
  className = "",
  fallbackIcon = "Target",
}: IconDisplayProps) => {
  const LucideIcon = (Icons as any)[iconName] || Icons[fallbackIcon];

  if (!LucideIcon) {
    return <div style={{ width: size, height: size }} className={className} />;
  }

  return (
    <LucideIcon size={size} strokeWidth={strokeWidth} className={className} />
  );
};

export default IconDisplay;
