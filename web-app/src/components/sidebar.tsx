"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Menu, MessageSquare, CalendarRange, Route, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { id: "chat", label: "Chat", icon: MessageSquare },
  { id: "events-planner", label: "Events Planner", icon: CalendarRange },
  { id: "trip-planner", label: "Trip Planner", icon: Route },
  { id: "voice", label: "Voice Conversation", icon: Mic },
] as const;

export function Sidebar({ open, onToggle, active, onPick }: {
  open: boolean;
  active?: string;
  onToggle: () => void;
  onPick: (id: string) => void;
}) {
  return (
    <aside
      className={cn(
        "relative h-full border-r bg-sidebar text-sidebar-foreground transition-all",
        open ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-14 items-center gap-2 px-2">
        <Button variant="ghost" size="icon" onClick={onToggle} aria-label="Toggle sidebar">
          <Menu className="size-4" />
        </Button>
        {open && <div className="font-semibold">Döni</div>}
      </div>
      <div className="space-y-1 p-2">
        {items.map((item) => {
          const Icon = item.icon;
          const selected = active === item.id;
          return (
            <Button
              key={item.id}
              variant={selected ? "default" : "ghost"}
              className={cn("w-full justify-start gap-2", !open && "justify-center px-0")}
              onClick={() => onPick(item.id)}
            >
              <Icon className="size-4" />
              {open && item.label}
            </Button>
          );
        })}
      </div>
    </aside>
  );
}
