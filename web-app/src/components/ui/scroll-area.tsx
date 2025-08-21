"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ScrollArea({ className, ...props }: ScrollAreaProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        "[&>.scrollarea-viewport]:h-full [&>.scrollarea-viewport]:w-full [&>.scrollarea-viewport]:overflow-y-auto",
        className
      )}
      {...props}
    />
  );
}

export function ScrollBar() {
  return null;
}
