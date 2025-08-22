"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ActionsProps = React.ComponentProps<"div">;

export const Actions = ({ className, children, ...props }: ActionsProps) => (
  <div className={cn("flex items-center gap-1", className)} {...props}>
    {children}
  </div>
);

export type ActionProps = React.ComponentProps<typeof Button> & {
  tooltip?: string;
  label?: string;
};

export const Action = ({ tooltip, label, className, size = "sm", variant = "ghost", children, ...props }: ActionProps) => (
  <Button
    className={cn(
      "size-9 p-1.5 text-muted-foreground hover:text-foreground",
      className
    )}
    size={size}
    title={tooltip || label}
    type="button"
    variant={variant}
    {...props}
  >
    {children}
    <span className="sr-only">{label || tooltip}</span>
  </Button>
);
